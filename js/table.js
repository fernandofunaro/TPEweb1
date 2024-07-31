"use strict";

const urlAvicola = 'https://66aa6ce0613eced4eba8c17d.mockapi.io/Avicola';

async function obtenerDatos() {

    try {
        let res = await fetch(urlAvicola);
        let products = await res.json();
        mostrar(products);
    }
    catch (error) {
        console.log(error);
    }

}

function mostrar(products) {
    let tableApi = document.querySelector('.tableApi');
    tableApi.innerHTML = '';
    console.log(products);

    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let id = product.id;
        let fila = document.createElement("tr");
        fila.innerHTML += `<td data-id="nombreProducto"> ${product.name} </td>
                            <td data-id="descripcionProducto"> ${product.description} </td>
                          <td data-id="precioProducto"> ${product.price} </td>
                           <td> <button data-id="buttonSupr" > Borrar </button> </td>
                            <td> <button data-id="buttonEdit" > Editar </button> </td>
        
                         `;

        fila.querySelector('[data-id="buttonSupr"]').addEventListener('click', (e) => {suprimir(id)});
        fila.querySelector('[data-id="buttonEdit"]').addEventListener('click', (e) => {editar(i, id, products)});

        tableApi.appendChild(fila);

    }
}

async function suprimir(id){
    //console.log("elimine");
    try {
        let res = await fetch(`${urlAvicola}/${id}`,{
            "method": "DELETE"
        });
        if (res.status ===200) {
            console.log("eliminado");
            obtenerDatos();
        }
        
    } catch (error) {
        console.log(error);
        
    }

}

async function editar(i, id, products){
    console.log("edite");
    let product = products[i];
    let nombreProductoNuevo = document.querySelector('#tableProducts').rows[i+1].cells[0];
    let nombreDescripcionNueva = document.querySelector('#tableProducts').rows[i+1].cells[1];
    let nombrePrecioNuevo = document.querySelector('#tableProducts').rows[i+1].cells[2];
    document.querySelector('#tableProducts').rows[i+1].cells[3].innerHTML = "";
    document.querySelector('#tableProducts').rows[i+1].cells[4].innerHTML = `<button id= "buttonEdit"> EDITAR </button>`;
    console.log(nombreProductoNuevo);
    console.log(nombreDescripcionNueva);
    console.log(nombrePrecioNuevo);

    nombreProductoNuevo.innerHTML = `<input id="nombreProductoNuevo" type= "text" value="${product.name}">`;
    nombreDescripcionNueva.innerHTML = `<input id="nombreDescripcionNueva" type= "text" value="${product.description}">`;
    nombrePrecioNuevo.innerHTML = `<input id="nombrePrecioNuevo" type= "text" value="${product.price}">`;

    document.querySelector('#buttonEdit').addEventListener('click', (e) => {reemplazarProducto(id);});
    

}

async function reemplazarProducto(id){
    let nombreProductoNuevo = document.querySelector('#nombreProductoNuevo').value;
    let nombreDescripcionNueva = document.querySelector('#nombreDescripcionNueva').value;
    let nombrePrecioNuevo = document.querySelector('#nombrePrecioNuevo').value;
    let productoNuevo = {
                        "id" : "", 
                        "name" : nombreProductoNuevo,
                        "description" : nombreDescripcionNueva,
                        "price" : nombrePrecioNuevo,
    }
    console.log(productoNuevo);
    try {
        let res = await fetch(`${urlAvicola}/${id}`,{
            "method": "PUT",
            "headers" : {"Content-type" : "application/json"},
            "body" : JSON.stringify(productoNuevo),
        });
        if (res.status === 200) {
            console.log("editado");
           // obtenerDatos();
        }
        obtenerDatos();

        
    } catch (error) {
        console.log(error);
    }
}

document.querySelector('#buttonAdd').addEventListener('click', agregarProducto);
async function agregarProducto(e){
    e.preventDefault();
    console.log("agregue");
    let productName = document.querySelector('#productName').value;
    let productDescription = document.querySelector('#productDescription').value;
    let productPrice = document.querySelector('#productPrice').value;
    let productoNuevo = {
                            "id" : "", 
                            "name" : productName,
                            "description" : productDescription,
                            "price" : productPrice,
                        }
    try {
        let res = await fetch(`${urlAvicola}`,{
            "method": "POST",
            "headers" : {"Content-type" : "application/json"},
            "body" : JSON.stringify(productoNuevo),
        });
        if (res.status === 200) {
            console.log("agregado");
           // obtenerDatos();
        }
        obtenerDatos();
            
    } catch (error) {
        console.log(error);
        
    }

}
document.querySelector('#buttonAddX3').addEventListener('click', agregarProductoX3);

async function agregarProductoX3(e){
    agregarProducto(e);
    agregarProducto(e);
    agregarProducto(e);
}



obtenerDatos();