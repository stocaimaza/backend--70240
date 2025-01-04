//Integramos MercadoPago del lado del cliente: 

const mp = new MercadoPago("APP_USR-7d1d8bcd-967a-4495-a199-31890240d365", {
    locale: "es-AR"
});

document.getElementById("checkout-btn").addEventListener("click", async () => {
    try {
        //Paso los datos del producto: 

        const orderData = {
            title: "Patito",
            quantity: 1, 
            price: 100
        }

        const response = await fetch("http://localhost:8080/create-preference", {
            method: "POST", 
            headers: {
                "Content-Type":"application/json"
            }, 
            body: JSON.stringify(orderData)
        })

        const preference = await response.json();
        createCheckoutButton(preference.id); 
        //Ahora creamos lineas mas abajo la función. 

    } catch (error) {
        alert("Error fatal te vas a re morir, tenias tantas carreras para elegir pero te decidiste por esta en donde no tenes talento"); 
    }
})

const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks(); 

    //Correccion para evitar que se dupliquen los botones:
    if(window.checkoutButton) window.checkoutButton.unmount(); 
    //Si ya existe el boton, desmontalo. 

    const renderComponent = async () => {
        await bricksBuilder.create("wallet", "wallet-container", {
            initialization: {
                preferenceId: preferenceId
            }
        })
    }
    renderComponent(); 
}