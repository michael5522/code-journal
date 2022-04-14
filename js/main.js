/* eslint-disable no-console */
/* global data */
/* exported data */

var imgTagLocation = document.querySelector('#img');
var formLocation = document.querySelector('#form');
formLocation.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  console.log('wdsfafd');
  if (customNumberPulled) {
    for (var a = 0; a < data.entries.length; a++) {
      if (customNumberPulled === data.entries[a].id) {
        data.entries[a].name = formLocation.elements.title.value;
        data.entries[a].photoURL = formLocation.elements.photoURL.value;
        data.entries[a].notes = formLocation.elements.notes.value;
      }
    }
    var viewAllDataEntry = document.querySelectorAll('li');
    for (var z = 0; z < viewAllDataEntry.length; z++) {
      if (customNumberPulled === parseInt(viewAllDataEntry[z].getAttribute('data-entry'))) {
        var obj2 = {
          name: formLocation.elements.title.value,
          photoURL: formLocation.elements.photoURL.value,
          notes: formLocation.elements.notes.value,
          id: customNumberPulled
        };
        var editedObj = createEntry(obj2);
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
var customNumberPulled = null;
var entryRender = document.querySelector('.no-bullets');
window.addEventListener('DOMContentLoaded', function () {
  for (var i = 0; i < data.entries.length; i++) {
    var returnValue = createEntry(data.entries[i]);
    entryRender.appendChild(returnValue);
  }
  if (data.view !== 'entries') {
    console.log('this is triggering');
    viewAll[0].classList.remove('hidden');
    viewAll[1].classList.add('hidden');
  }
  // searching for edit buttons
  var editButton = document.querySelector('.no-bullets');
  editButton.addEventListener('click', function (event) {

    if (event.target.matches('.edit-button')) {
      viewAll[0].classList.remove('hidden');
      viewAll[1].classList.add('hidden');
      customNumberPulled = parseInt(event.target.getAttribute('customNumber'));
      document.getElementById('delete').textContent = 'Delete Entry';
      for (var b = 0; b < data.entries.length; b++) {

        if (customNumberPulled === data.entries[b].id) {
          var formHeader = document.querySelector('.heading');
          formHeader.textContent = 'Edit Entry';
          var formTitle = document.querySelector('#title');
          formTitle.setAttribute('value', data.entries[b].name);
          var formPhotoURL = document.querySelector('#photoURL');
          formPhotoURL.setAttribute('value', data.entries[b].photoURL);
          var formImg = document.querySelector('#img');
          formImg.setAttribute('src', data.entries[b].photoURL);
          var formNotes = document.querySelector('#notes');
          formNotes.textContent = data.entries[b].notes;
        }
      }
    }
  });
});

var tabContainer = document.querySelector('.header-container');
console.log('tabcontaner', tabContainer);
var tabAll = document.querySelectorAll('.tab');
console.log('taball', tabAll);
var viewAll = document.querySelectorAll('.view');
console.log('viewall', viewAll);
tabContainer.addEventListener('click', function (event) {
  if (event.target.matches('#entry')) {
    console.log('this is triggering');
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

var deleteEntryQuery = document.querySelector('#delete');
deleteEntryQuery.addEventListener('click', function (event) {
  event.preventDefault();
  console.log('custom numner pulled', customNumberPulled);
  console.log(deleteEntryQuery);
  var switchStatus = document.querySelector('#change');
  console.log(switchStatus);
  switchStatus.className = 'modal-open';
  console.log(switchStatus);
  var buttonCancel = document.querySelector('.button-cancel');
  console.log(buttonCancel);
  buttonCancel.addEventListener('click', function () {
    switchStatus.className = 'modal-close';
    console.log('current class after should be closed', switchStatus);
  });
  var buttonConfirm = document.querySelector('.button-confirm');
  console.log(buttonConfirm);
  buttonConfirm.addEventListener('click', function () {
    console.log('customnumber pulled', customNumberPulled);
    console.log(data.entries[customNumberPulled]);
  });
  // viewAll[0].classList.remove('hidden');
  // viewAll[1].classList.add('hidden');
});
console.log('here', deleteEntryQuery);
