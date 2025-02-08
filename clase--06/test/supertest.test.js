//Instalamos: npm install -D supertest

//Ahora como yo voy a hacer una prueba integral de la app no necesito traer un DAO en particular. 

//Importamos supertest: 
import supertest from "supertest";

//Importamos chai: 
import { expect } from "chai";

//Ahora vamos a crear uan constante que se llamara "requester". Quien se encargará de hacer las peticiones al servidor. 

const requester = supertest("http://localhost:8080"); 

describe("Testing de la App Web Adoptame", () => {
    describe("Testing de Mascotas", () => {
        it("Endpoint POST /api/pets debe crear una mascota correctamente", async () => {
            //Voy a crear un mock de una mascota: 

            const pichichoMock = {
                name: "Firulais", 
                specie: "Pichicho", 
                birthDate: "2021-03-10"
            };

            const { statusCode, ok, _body } = await requester.post("/api/pets").send(pichichoMock);

            //Mostramos por consola: 
            console.log(statusCode); 
            console.log(ok);
            console.log(_body); 

            //Ahora evaluamos: 
            expect(_body.payload).to.have.property("_id"); 
        })

        //NUEVOS TEST: 

        it("Al crear una mascota sólo con los datos elementales. Se debe corroborar que la mascota creada cuente con una propiedad adopted : false", async () => {
            const nuevaMascota = {
                name: "Rex", 
                specie: "Perro", 
                birthDate: "2020-01-01"
            }; 

            const {statusCode, _body} =  await requester.post("/api/pets").send(nuevaMascota); 

            expect(statusCode).to.equal(200); 
            expect(_body.payload).to.have.property("adopted").that.equals(false); 
        })

        it("Si se desea crear una mascota sin el campo  nombre, el módulo debe responder con un status 400.", async () => {
            const mascotaSinNombre = {
                specie: "Gato", 
                birthDate: "2024-12-24"
            }; 

            const { statusCode } = await requester.post("/api/pets").send(mascotaSinNombre); 

            expect(statusCode).to.equal(400);

        })

        it("Al obtener a las mascotas con el método GET, la respuesta debe tener los campos status y payload. Además, payload debe ser de tipo arreglo.", async () => {
            const { statusCode, _body }  = await requester.get("/api/pets"); 

            expect(statusCode).to.equal(200); 
            expect(_body).to.have.property("status").that.equals("success"); 
            expect(_body).to.have.property("payload").that.is.an("array"); 
        })

        it("El método PUT debe poder actualizar correctamente a una mascota determinada ", async () => {
            //Supongamos que tenemos el id de alguna mascota existente en la base de datos. 
            const idMascotaExistente = "67a7752bb1d742062e1cf6db"; 

            const datosActualizados = {
                name: "Fatiga", 
                specie: "Perrito"
                //Agregas cualquier campo que quieras actualizar. 
            }

            const { statusCode} = await requester.put(`/api/pets/${idMascotaExistente}`).send(datosActualizados); 

            expect(statusCode).to.equal(200); 
        })

        it("El método DELETE debe poder borrar la última mascota agregada, ésto se puede alcanzar agregando a la mascota con un POST, tomando el id, borrando la mascota  con el DELETE, y luego corroborar si la mascota existe con un GET", async () => {
            //1 Paso: agregar una mascota nueva
            const nuevaMascota = {
                name: "Mascota a borrar",
                specie: "Perro", 
                birthDate: "2023-02-20"
            }

            const {_body: {payload: {  _id } } } = await requester.post("/api/pets").send(nuevaMascota);

            //2 Paso: borrar la mascota agregada
            const {statusCode} =  await requester.delete(`/api/pets/${_id}`);

            expect(statusCode).to.equal(200); 
        })
    })

    //Test 2: Registro de Usuarios: 
    describe("Test Avanzado", () => {
        let cookie; 
        //Declaramos de forma global para el test uan variable cookie que vamos a usar en las siguientes pruebas. 

        it("Debe registrar correctamente a un usuario", async () => {
            const mockUsuario = {
                first_name: "Pepe", 
                last_name: "Argento", 
                email: "pepe@zapateriagarmendia.com",
                password: "1234"
            }

            const {_body} = await requester.post("/api/sessions/register").send(mockUsuario); 

            expect(_body.payload).to.be.ok; 
        })

        it("Debe loguear correctamente al usuario y recuperar la cookie", async () => {
            //Enviamos al login los mismos datos que registramos en el paso anterior: 
            const mockUsuario = {
                email: "pepe@zapateriagarmendia.com",
                password: "1234"
            }

            //Ahora me guardo los header de la peticion: 
            const resultado = await requester.post("/api/sessions/login").send(mockUsuario); 

            //Se obtiene la cookie de sesion de la respuesta y se guarda en una variable. 
            const cookieResultado = resultado.headers["set-cookie"]["0"]; 

            //Verificamos que la cookie recuperada exista: 
            expect(cookieResultado).to.be.ok; 

            //Se separa el nombre y el valor de la cookie recuperada y se guardan en el objeto: 

            cookie = {
                name: cookieResultado.split("=") ["0"],
                value: cookieResultado.split("=") ["1"]
            }

            //Verificamos que el nombre de la Cookie sea igual a "CoderCookie": 
            expect(cookie.name).to.be.ok.and.eql("coderCookie"); 
            expect(cookie.value).to.be.ok; 
        })

        //Probamos la ruta current: 
        it("Debe enviar la cookie que contiene el usuario", async () => {

            //Enviamos la cookie que nos guardamos: 
            const {_body} = await requester.get("/api/sessions/current").set("Cookie",[`${cookie.name}=${cookie.value}`]); 

            //Verificamos que nos retorne el email: 
            expect(_body.payload.email).to.be.eql("pepe@zapateriagarmendia.com");
        })
    })

    //TESTING DE CARGA CON IMAGENES: 

    describe("Testeamos la carga de imagenes", () => {
        it("Creamos una mascota con imagen", async () => {
            const coderGato = {
                name: "MichiCoder", 
                specie: "Gatito", 
                birthDate: "2024-10-01"
            }

            //Ahora ya no usamos el método send, sino queusamos field, para los distintos campos: 

            const resultado = await requester.post("/api/pets/withimage")
                .field("name", coderGato.name)
                .field("specie", coderGato.specie)
                .field("birthDate", coderGato.birthDate)
                .attach("image", "./test/codergato.jpg");
            
            //Verificamos: 

            expect(resultado.status).to.be.eql(200); 
            expect(resultado._body.payload).to.have.property("_id"); 
            expect(resultado._body.payload.image).to.be.ok; 
        })
    })
})