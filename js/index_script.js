"use strict"
// Menu principal de navegación desplegable
document.querySelector(".btn_menu").addEventListener("click", toggleMenu);

function toggleMenu() {
  document.querySelector(".navigation").classList.toggle("show");
}



