import {faker} from "@faker-js/faker";

const generarProductos = () => {
    return {
        id: faker.database.mongodbObjectId(), 
        title: faker.commerce.productName(), 
        price: faker.commerce.price(),
        stock: parseInt(faker.string.numeric()), 
    }
}

const generarUsuarios = () => {
    let carrito = []; 

    let numeroDeProductos = parseInt(faker.string.numeric()); 

    for(let i = 0; i < numeroDeProductos; i++) {
        carrito.push(generarProductos());
    }

    return {
        id: faker.database.mongodbObjectId(), 
        first_name: faker.person.firstName(), 
        last_name: faker.person.lastName(),
        birthDate: faker.date.birthdate(), 
        phone: faker.phone.number(),
        image: faker.image.avatar(), 
        email: faker.internet.email(), 
        carrito,
    }
}

export default generarUsuarios; 