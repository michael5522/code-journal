/* eslint-disable no-console */
/* global data */
/* exported data */

var imgTagLocation = document.querySelector('#img');
var formLocation = document.querySelector('#form');

formLocation.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  var obj = {
    name: formLocation.elements.title.value,
    photoURL: formLocation.elements.photoURL.value,
    notes: formLocation.elements.notes.value,
    id: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.push(obj);
  formLocation.reset();
}

var photoURLLocation = document.querySelector('#photoURL');
photoURLLocation.addEventListener('input', handleURLInput);
function handleURLInput(event) {
  imgTagLocation.setAttribute('src', event.target.value);
}
