'use strict';

// Variables que usaremos

const wordList = document.querySelector(`.words`); // Donde van a ir los _ _ _ _

const message = document.querySelector(`.message`); // Donde lanzaremos los mensajes

const btnCheck = document.querySelector(`.check`);

const valorUsuario = document.querySelector(`.user`); // Valor introducido en el input

const reseteo = document.querySelector(`.reset`);

let pictures = document.querySelector(`#pics`);

// ---------------------------------

// Modal

const btnModal = document.querySelector(`.instructions`);

const modal = document.querySelector(`.modal`);

const overlay = document.querySelector(`.overlay`);

const btnClose = document.querySelector(`.close-modal`);

// -----------------------------------

// Hacemos una lista interna de palabras e inicialmente escoge una aleatoriamente.

const words = [
  `react`,
  `node`,
  `python`,
  `maracas`,
  `pentagono`,
  `asimetria`,
  `jirafa`,
  `trompeta`,
  `universo`,
  `cirujia`,
  `personaje`,
  `seta`,
  `anfibio`,
  `futuro`,
  `terror`,
  `aplicación`,
  `comando`,
  `arcoiris`,
  `crimen`,
  `tonelada`,
  `jersey`,
  `montaña`,
  `piano`,
  `ordenador`,
  `cabello`,
  `ampliar`,
  `vinilo`,
  `pestaña`,
  `tenis`,
  `submarino`,
  `familia`,
  `dinamita`,
  `cerrojo`,
  `jerarquia`,
  `tabaco`,
  `cereza`,
  `holanda`,
  `ramen`,
  `galaxia`,
  `empatia`,
  `nieve`,
  `tornado`,
  `felino`,
  `mermelada`,
  `ristretto`,
  `tostadora`,
  `estelar`,
  `saturno`,
  `envejecer`,
  `acustica`,
  `amperio`,
  `electrodo`,
  `fusion`,
  `transplante`,
  `pimiento`,
  `japon`,
  `timpano`,
  `sudadera`,
  `ejercicio`,
];

const randomValue = Math.trunc(Math.random() * words.length);

const randomWord = words[randomValue];

// ------------------------------------

let lifes = 6;
let aciertos = randomWord.length;
let letrasUsadas = [];

// Mediante elementos span, hacemos aparecer tantas lineas como letras contenga la palabra
for (let i = 0; i < randomWord.length; i++) {
  const span = document.createElement(`span`);
  wordList.appendChild(span);
}

// -------------------------------------

// Variable para cambio entre imagenes
let pieces = 1;

// Usamos un bucle para buscar si hay letras coincidentes, y las sustituimos en el array de
// spans
btnCheck.addEventListener(`click`, () => {
  comprobarAciertos();
});

// El mismo evento pero para comprobar con Enter el resultado
document.addEventListener(`keydown`, function (e) {
  console.log(e.key);
  if (e.key === `Enter`) {
    comprobarAciertos();
  }
});

function comprobarAciertos() {
  const valorUsuarioMinuscula = valorUsuario.value.toLowerCase();
  if (letrasUsadas.includes(valorUsuarioMinuscula)) {
    alert(`La letra "${valorUsuarioMinuscula}" ya fue usada, pon otra!`);
    valorUsuario.value = ``;
    return;
  } else {
    letrasUsadas.push(valorUsuarioMinuscula);
  }
  for (let i = 0; i < randomWord.length; i++) {
    const spans = document.querySelectorAll(`.words span`);
    if (valorUsuarioMinuscula === randomWord[i]) {
      spans[i].textContent = valorUsuarioMinuscula;
      aciertos--;
    } else if (
      randomWord.indexOf(valorUsuarioMinuscula) === -1 &&
      i === randomWord.length - 1
    ) {
      lifes--;
      pieces++;
      pictures.src = `media/${pieces}.png`;
    }
  }

  if (lifes === 0) {
    const intervalo = function () {
      if (pieces < 9) {
        pieces++;
        pictures.src = `media/${pieces}.png`;
      } else {
        pieces = 8;
        pictures.src = `media/${pieces}.png`;
      }
    };
    intervalo();
    setInterval(intervalo, 500);
    message.textContent = `You're dead`;
    valorUsuario.classList.add(`hidden`);
    btnCheck.classList.add(`hidden`);
    wordList.classList.add(`hidden`);
  }

  if (aciertos === 0) {
    message.textContent = `You win`;
    valorUsuario.classList.add(`hidden`);
    btnCheck.classList.add(`hidden`);
    wordList.classList.add(`hidden`);
  }

  valorUsuario.value = ``;
}
// -----------------------------------

// Resetear el juego

reseteo.addEventListener(`click`, () => {
  location.reload();
});

// -----------------------------------

// Modales

function openModal() {
  modal.classList.remove(`hidden`);
  overlay.classList.remove(`hidden`);
}

function closeModal() {
  modal.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
}

btnModal.addEventListener(`click`, openModal);

btnClose.addEventListener(`click`, closeModal);

overlay.addEventListener(`click`, closeModal);

// Cerrar el modal con Escape
document.addEventListener(`keydown`, function (e) {
  console.log(e.key);
  if (e.key === `Escape` && !modal.classList.contains(`hidden`)) {
    closeModal();
  }
});
