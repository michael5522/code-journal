/* eslint-disable no-console */
/* global data */
/* exported data */

var imgTagLocation = document.querySelector('#img');
console.log(imgTagLocation);
var inputListening = document.querySelector('#photoURL');
console.log(inputListening);

inputListening.addEventListener('input', handleInput);

function handleInput(event) {
  // console.log(event.target.name, event.target.value);
  imgTagLocation.setAttribute('src', event.target.value);
  // console.log(imgTagLocation.getAttribute('src'));
}
