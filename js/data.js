/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntryJSON = localStorage.getItem('entry-local-storage');

if (previousEntryJSON) {
  data.entries = JSON.parse(previousEntryJSON);
  data.nextEntryId = data.entries.length + 1;
  // localStorage.removeItem('entry-local-storage');
}

window.addEventListener('beforeunload', function () {
  var entryJSON = JSON.stringify(data.entries);
  localStorage.setItem('entry-local-storage', entryJSON);
});
