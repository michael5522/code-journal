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
  data.entries.unshift(obj);
  formLocation.reset();
  var firstOne = createEntry(obj);
  console.log(firstOne);
  entryRender.prepend(firstOne);
  viewAll[0].classList.add('hidden');
  viewAll[1].classList.remove('hidden');
}

var photoURLLocation = document.querySelector('#photoURL');
photoURLLocation.addEventListener('input', handleURLInput);
function handleURLInput(event) {
  imgTagLocation.setAttribute('src', event.target.value);
}

function createEntry(entry) {
  var list = document.createElement('li');
  var row = document.createElement('div');
  row.setAttribute('class', 'row margin-for-entry');
  list.appendChild(row);
  var columnRow = document.createElement('div');
  columnRow.setAttribute('class', 'column-half flex-column');
  row.appendChild(columnRow);
  var imagePlaceholder = document.createElement('div');
  imagePlaceholder.setAttribute('class', 'imagePlaceHolder');
  columnRow.appendChild(imagePlaceholder);
  var image = document.createElement('img');
  image.setAttribute('src', entry.photoURL);
  imagePlaceholder.appendChild(image);

  var row2 = document.createElement('div');
  row2.setAttribute('class', 'column-half flex-column');
  row.appendChild(row2);
  var titleRow = document.createElement('div');
  titleRow.setAttribute('class', 'row-entries');
  row2.appendChild(titleRow);
  var title = document.createElement('h3');
  title.textContent = entry.name;
  titleRow.appendChild(title);
  var edit = document.createElement('div');
  edit.setAttribute('class', 'edit-button fa-solid fa-pen');
  titleRow.appendChild(edit);
  var info = document.createElement('p');
  info.textContent = entry.notes;
  row2.appendChild(info);
  return list;
}

var entryRender = document.querySelector('.no-bullets');
window.addEventListener('DOMContentLoaded', function () {
  for (var i = 0; i < data.entries.length; i++) {
    var returnValue = createEntry(data.entries[i]);
    entryRender.appendChild(returnValue);
  }
  if (data.view !== 'entries') {
    viewAll[0].classList.remove('hidden');
    viewAll[1].classList.add('hidden');
  }
});

var tabContainer = document.querySelector('.header-container');

var tabAll = document.querySelectorAll('.tab');

var viewAll = document.querySelectorAll('.view');
tabContainer.addEventListener('click', function (event) {
  if (event.target.matches('#entry')) {

    for (var i = 0; i < tabAll.length; i++) {
      if (tabAll[i] !== event.target) {
        viewAll[i].classList.add('hidden');
      } else {
        viewAll[i].classList.remove('hidden');
        data.view = 'entries';
      }
    }
  }
});

var buttonQuery = document.querySelector('.button-new');
buttonQuery.addEventListener('click', function () {
  data.view = 'entry-form';
  viewAll[0].classList.remove('hidden');
  viewAll[1].classList.add('hidden');
});

console.log('parent of all rendered entries', entryRender);
