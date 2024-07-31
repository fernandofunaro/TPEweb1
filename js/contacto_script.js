//Si hacia esto en el script principal, no funcionaba.
// Repito la funcion de menu desplegable
// porque no se me ocurre como hacer


// Menu principal de navegación desplegable
document.querySelector(".btn_menu").addEventListener("click", toggleMenu);

function toggleMenu() {
  document.querySelector(".navigation").classList.toggle("show");
}

//Captcha

let captcha;
function randomCaptcha(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarCaptcha() {
  var mostrarCaptcha = document.getElementById("captchaGenerator");

  captcha = randomCaptcha(1000, 9999);

  mostrarCaptcha.textContent = "Captcha: " + captcha;
}

function verificarCaptcha() {
  let btnSignupShow = document.getElementById("btn-signup");
  const ingresarCaptcha = document.getElementById("ingresarCaptcha").value;
  const resultadoCaptcha = document.getElementById("resultadoCaptcha");

  if (parseInt(ingresarCaptcha) === captcha) {
    resultadoCaptcha.textContent = "Captcha válido";
    resultadoCaptcha.style.color = "green";
    btnSignupShow.style.display = 'block';

  } else {
    resultadoCaptcha.textContent = "Captcha incorrecto";
    resultadoCaptcha.style.color = "red";
    btnSignupShow.style.display = 'none';

  }
}

generarCaptcha();

// refrescar captcha
document.getElementById('btn-refrescar').addEventListener("click", generarCaptcha);
document.getElementById('verificarCaptcha').addEventListener("click", verificarCaptcha);


