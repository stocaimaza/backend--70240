//Chai es una libreria de assertions, la cual nos permitirá realizar comparaciones de test más claras. 

//La instalamos como dependencia de desarrollo: npm install chai -D

import mongoose from "mongoose";
import User from "../src/dao/Users.dao.js";
import { expect } from "chai";
//Con la ultima version. 

//Me conecto a mi base de datos. 
const connection = mongoose.connect(`mongodb+srv://coderhouse70230:coderhouse@cluster0.8hzd7.mongodb.net/Documentacion`)


describe("Testeamos el DAO de Usuarios", function () {
    //Le asignamos un nombre o titulo. 
    //Pasamos una función callback que contiene las pruebas individuales. 

    //before: Función que nos permite inicializar elementos antes de comenzar con todo el contexto de testeo.
    before(function () {
        this.usersDao = new User();
    })

    //Limpiamos la base de datos cada vez que testeamos: 
    beforeEach(async function () {
        await mongoose.connection.collections.users.drop();
    })

    //Test 1: 
    it("El get de usuarios me debe retornar un array", async function () {
        //Tengo que hacer get al DAO de usuarios. 
        const resultado = await this.usersDao.get();
        //assert.strictEqual(Array.isArray(resultado), true);
        expect(Array.isArray(resultado)).to.be.true;
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
        //assert.ok(resultado._id); //Aca verificamos que el valor que recibimos es verdadero. 

        expect(resultado).to.have.property("_id");

    })

    // Test 3: 
    it("Al agregar un nuevo usuario, éste debe crearse con un arreglo de mascotas vacío por defecto.", async function () {
        let usuario = {
            first_name: "Tony",
            last_name: "Stark",
            email: "tonydeloeste@hotmail.com",
            password: "nomeHackees2013"
        }

        const resultado = await this.usersDao.save(usuario);
        //assert.deepStrictEqual(resultado.pets, []); 

        expect(resultado.pets).to.deep.equal([]);
    })

    // Test 4: 

    it("El Dao puede obtener un usuario por el email", async function () {
        let usuario = {
            first_name: "Fatiga",
            last_name: "Argento",
            email: "fatiga@hotmail.com",
            password: "losargento"
        }

        await this.usersDao.save(usuario);

        const user = await this.usersDao.getBy({ email: usuario.email });

        //assert.strictEqual(typeof user, "object"); 
        expect(user).to.be.an("object");

    })

    // Test 5: Actualizar un usuario existente
    it("El Dao debe actualizar correctamente un usuario existente", async function () {
        // Crear un usuario
        const usuario = {
            first_name: "Pepe",
            last_name: "Argento",
            email: "pepe@argento.com",
            password: "1234"
        };
        const savedUser = await this.usersDao.save(usuario);

        // Nuevos datos para actualizar
        const updatedData = {
            first_name: "Paola",
            last_name: "Argento"
        };

        // Actualizar el usuario
        await this.usersDao.update(savedUser._id, updatedData);

        // Obtener el usuario actualizado
        const updatedUser = await this.usersDao.getBy({ _id: savedUser._id });

        // Verificar cambios
        expect(updatedUser.first_name).to.equal(updatedData.first_name);
        expect(updatedUser.last_name).to.equal(updatedData.last_name);
    });

    // Test 6: Eliminar un usuario existente
    it("El Dao debe eliminar correctamente un usuario existente", async function () {
        // Crear y guardar un usuario
        const usuario = {
            first_name: "Moni",
            last_name: "Argento",
            email: "moni@argento.com",
            password: "pepeteamo"
        };
        const savedUser = await this.usersDao.save(usuario);

        // Eliminar el usuario
        await this.usersDao.delete(savedUser._id);

        // Intentar obtener el usuario eliminado
        const deletedUser = await this.usersDao.getBy({ _id: savedUser._id });

        // Verificar que no existe
        expect(deletedUser).to.be.null;
    });

    //after: Función que nos permite realizar alguna acción una vez finalizado el contexto de testeo
    after(async function () {
        await mongoose.disconnect();
    })
})