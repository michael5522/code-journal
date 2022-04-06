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
}

var photoURLLocation = document.querySelector('#photoURL');
photoURLLocation.addEventListener('input', handleURLInput);
function handleURLInput(event) {
  imgTagLocation.setAttribute('src', event.target.value);
}

console.log('hi');
// var entry = [
//   {
//     photoURL: 'https://upload.wikimedia.org/wikipedia/en/9/92/Pok%C3%A9mon_episode_1_screenshot.png',
//     name: 'pp man',
//     notes: 'wa da fa'
//   },
//   {
//     photoURL: 'https://upload.wikimedia.org/wikipedia/en/9/92/Pok%C3%A9mon_episode_1_screenshot.png',
//     name: 'pp man',
//     notes: 'wa da fa'
//   }
// ];
// starting to create the dom creation gere
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
  var title = document.createElement('h3');
  title.textContent = entry.name;
  row2.appendChild(title);
  var info = document.createElement('p');
  info.textContent = entry.notes;
  row2.appendChild(info);
  return list;
}

console.log(data.entries.length);
var entryRender = document.querySelector('.no-bullets');
for (var i = 0; i < data.entries.length; i++) {
  var returnValue = createEntry(data.entries[i]);
  entryRender.appendChild(returnValue);
}
