/* eslint-disable no-console */
/* global data */
/* exported data */

var imgTagLocation = document.querySelector('#img');
var formLocation = document.querySelector('#form');
formLocation.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();

  if (customNumberPulled) {
    console.log('custom number', customNumberPulled);
    console.log('ola');
    console.log(data.entries);
    console.log(data.entries.length);
    for (var a = 0; a < data.entries.length; a++) {
      console.log(data.entries[a].id);
      if (customNumberPulled === data.entries[a].id) {
        // 1;
        console.log('data.entries[a].name', data.entries[a].name);
        data.entries[a].name = formLocation.elements.title.value;
        console.log('new name', formLocation.elements.title.value);
        // 2
        console.log('data.entries[a].photoURL', data.entries[a].photoURL);
        data.entries[a].photoURL = formLocation.elements.photoURL.value;
        console.log('new photourl', formLocation.elements.photoURL.value);
        // 3
        console.log('data.entries[a].notes', data.entries[a].notes.value);
        data.entries[a].notes = formLocation.elements.notes.value;
        console.log('data notes', formLocation.elements.notes.value);
        console.log('data.entries[a] after', data.entries[a]);
      }
    }
    var viewAllDataEntry = document.querySelectorAll('li');
    console.log('dasfdf', viewAllDataEntry);
    for (var z = 0; z < viewAllDataEntry.length; z++) {
      // console.log(typeof parseInt(viewAllDataEntry[z].getAttribute('data-entry')));
      if (customNumberPulled === parseInt(viewAllDataEntry[z].getAttribute('data-entry'))) {
        console.log('this one pulled', viewAllDataEntry[z]);
        var obj2 = {
          name: formLocation.elements.title.value,
          photoURL: formLocation.elements.photoURL.value,
          notes: formLocation.elements.notes.value,
          id: customNumberPulled
        };
        console.log(obj2);
        var editedObj = createEntry(obj2);
        console.log(editedObj);
        viewAllDataEntry[z].replaceWith(editedObj);
        viewAll[0].classList.add('hidden');
        viewAll[1].classList.remove('hidden');
      }
    }

  } else {
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
}

var photoURLLocation = document.querySelector('#photoURL');
photoURLLocation.addEventListener('input', handleURLInput);
function handleURLInput(event) {
  imgTagLocation.setAttribute('src', event.target.value);
}

function createEntry(entry) {
  var list = document.createElement('li');
  list.setAttribute('data-entry', entry.id);
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
  var edit = document.createElement('i');
  edit.setAttribute('class', 'edit-button fa-solid fa-pen');
  edit.setAttribute('customNumber', entry.id);
  titleRow.appendChild(edit);
  var info = document.createElement('p');
  info.textContent = entry.notes;
  row2.appendChild(info);
  return list;
}
// DOMCONTENTLOADED
//
//
var customNumberPulled = null;
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
  // searching for edit buttons
  var editButton = document.querySelector('.no-bullets');
  console.log('edit button', editButton);
  editButton.addEventListener('click', function (event) {
    console.log('the event target', event.target);
    if (event.target.matches('.edit-button')) {
      viewAll[0].classList.remove('hidden');
      viewAll[1].classList.add('hidden');
      customNumberPulled = parseInt(event.target.getAttribute('customNumber'));
      console.log('custom number pulled', customNumberPulled);
      console.log('-------');
      for (var b = 0; b < data.entries.length; b++) {
        // console.log('data entry id', data.entries[b].id);
        if (customNumberPulled === data.entries[b].id) {
          console.log('konbanwa', data.entries[b].id);
          var formHeader = document.querySelector('.heading');
          formHeader.textContent = 'Edit Entry';
          var formTitle = document.querySelector('#title');
          formTitle.setAttribute('value', data.entries[b].name);
          console.log(formTitle);
          var formPhotoURL = document.querySelector('#photoURL');
          console.log(formPhotoURL);
          formPhotoURL.setAttribute('value', data.entries[b].photoURL);
          var formImg = document.querySelector('#img');
          formImg.setAttribute('src', data.entries[b].photoURL);
          console.log(formImg);
          var formNotes = document.querySelector('#notes');
          formNotes.textContent = data.entries[b].notes;
          console.log(formNotes);
        }
      }
    }
  });
});

var tabContainer = document.querySelector('.header-container');

var tabAll = document.querySelectorAll('.tab');
// console.log(tabAll);
var viewAll = document.querySelectorAll('.view');
// console.log('viewAll', viewAll);
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
