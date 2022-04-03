/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntryJSON = localStorage.getItem('data-local-storage');
if (previousEntryJSON) {
  data = JSON.parse(previousEntryJSON);
}

window.addEventListener('beforeunload', function () {
  var entryJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', entryJSON);
});
