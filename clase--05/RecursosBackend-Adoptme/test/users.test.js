import mongoose from "mongoose"; 
import User from "../src/dao/Users.dao.js"; 
import assert from "assert"; 
//Módulo nativo de Node JS que nos permite hacer las validaciones. 

//Me conecto a mi base de datos. 
const connection = mongoose.connect(`mongodb+srv://coderhouse70230:coderhouse@cluster0.8hzd7.mongodb.net/Documentacion`)

//Describe: es una función que me permite agrupar un conjunto de pruebas relacionadas bajo el mismo bloque descriptivo. 

describe("Testeamos el DAO de Usuarios", function () {
    //Le asignamos un nombre o titulo. 
    //Pasamos una función callback que contiene las pruebas individuales. 

    //before: Función que nos permite inicializar elementos antes de comenzar con todo el contexto de testeo.
    before(function() {
        this.usersDao = new User(); 
    })

    //Limpiamos la base de datos cada vez que testeamos: 
    beforeEach(async function () {
        await mongoose.connection.collections.users.drop(); 
    })

    //Test 1: 
    it("El get de usuarios me debe retornar un array", async function()  {
        //Tengo que hacer get al DAO de usuarios. 
        const resultado = await this.usersDao.get(); 
        assert.strictEqual(Array.isArray(resultado), true);
    })

    //Test 2: 
    it("El Dao debe agregar correctamente un elemento a la base de datos", async function () {

        let usuario = {
            first_name: "Bruno", 
            last_name: "Diaz", 
            email: "soybatmanfotolog@hotmail.com", 
            password: "gotica1234"
        }

        const resultado = await this.usersDao.save(usuario); 
        assert.ok(resultado._id); //Aca verificamos que el valor que recibimos es verdadero. 

    })

    //Test 3: 
    it("Al agregar un nuevo usuario, éste debe crearse con un arreglo de mascotas vacío por defecto.", async function() {
        let usuario = {
            first_name: "Tony", 
            last_name: "Stark", 
            email: "tonydeloeste@hotmail.com", 
            password: "nomeHackees2013"
        }

        const resultado = await this.usersDao.save(usuario); 
        assert.deepStrictEqual(resultado.pets, []); 
    })

    //Test 4: 

    it("El Dao puede obtener un usuario por el email", async function() {
        let usuario = {
            first_name: "Fatiga", 
            last_name: "Argento", 
            email: "fatiga@hotmail.com", 
            password: "losargento"
        }

        await this.usersDao.save(usuario); 

        const user = await this.usersDao.getBy({email: usuario.email});

        assert.strictEqual(typeof user, "object"); 

    })

    //after: Función que nos permite realizar alguna acción una vez finalizado el contexto de testeo
    after(async function () {
        await mongoose.disconnect(); 
    })
})