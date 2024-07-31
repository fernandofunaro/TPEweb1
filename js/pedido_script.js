
// Cambia de KG a unidades
document.querySelector(".btn_menu").addEventListener("click", toggleMenu);

function toggleMenu() {
    document.querySelector(".navigation").classList.toggle("show");
}

document.getElementById('producto').addEventListener('change', function () {

    var selectedValue = this.value;
    var unidadText = document.getElementById('unidad');

    if (selectedValue === 'Pechuga' || selectedValue === 'Patamuslo') {
        unidadText.textContent = 'KG';
    }
    else if (selectedValue === 'Huevos' || selectedValue === 'Pollo entero') {
        unidadText.textContent = 'Unidades';
    }
});

// Cargar lista de pedidos
let productos = [];
let cantidades = [];
let unidades = [];
let precios = [];

function agregar() {

    let producto = document.getElementById("producto").value;
    let cantidad = document.getElementById("cantidad").value;
    let unidad = document.getElementById("unidad").textContent;

    if (!cantidad) {
        alert("Ingrese una cantidad Válida");
        return;
    }

    let precioUnitario = obtenerPrecioUnitario(producto);
    let precioTotalProducto = parseFloat(cantidad) * precioUnitario;

    productos.push(producto);
    cantidades.push(cantidad);
    unidades.push(unidad);
    precios.push(precioTotalProducto);
    mostrar();
    document.getElementById("cantidad").value = "";
}

// Obtener el precio unitario del producto
function obtenerPrecioUnitario(producto) {
    switch (producto) {
        case 'Pechuga':
            return 3500;
        case 'Patamuslo':
            return 3000;
        case 'Huevos':
            return 50;
        case 'Pollo entero':
            return 5000;
        default:
            return 0;
    }
}

//Limpiar todos
function reset() {
    productos = [];
    cantidades = [];
    unidades = [];
    precios = [];
    document.getElementById('precioTotal').textContent = '';
    mostrar();
}

function borrarUltimo() {

    // Verificar si hay elementos para borrar
    if (productos.length > 0) {

        // Eliminar el último elemento de los arreglos
        productos.pop();
        cantidades.pop();
        unidades.pop();

        // Eliminar el último precio de los productos
        precios.pop();
        mostrar();
    }
}

function mostrar() {
    let listaProductos = document.querySelector("#listadoProductos");
    let listaCantidades = document.querySelector("#listadoCantidades");

    listaProductos.innerHTML = "";
    listaCantidades.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        listaProductos.innerHTML += "<li>" + productos[i] + "</li>";
        listaCantidades.innerHTML += "<li>" + cantidades[i] + " (" + unidades[i] + ")</li>";
    }

    calcularTotal(); // Recalcular el total después de mostrar los productos
}

function calcularTotal() {
    let total = 0;

    for (let i = 0; i < precios.length; i++) {
        total += precios[i];
    }

    document.getElementById('precioTotal').textContent = 'Total a pagar: $' + total.toFixed(2);

    let realizarPedidoLink = document.getElementById('realizarPedidoLink');
    if (total > 0) {
        realizarPedidoLink.style.display = 'block';
    } else {
        realizarPedidoLink.style.display = 'none';
    }
}

document.getElementById('btn-agregar').addEventListener("click", agregar);
document.querySelector("#btn-reset").addEventListener("click", reset);
document.querySelector("#borrar-ultimo").addEventListener("click", borrarUltimo);