(function(window){
  var axios = window.axios;
  var hostname = window.location.hostname;
  var endpoint = '/search/'; 
  var searchInput = window.document.getElementsByClassName('search-input')[0];
  var searchButton = window.document.getElementsByClassName('search-button')[0];
  var clearButton = window.document.getElementsByClassName('clear-button')[0];
  var archivesButton = window.document.getElementsByClassName('archives-button')[0];
  var archivesDiv = window.document.getElementsByClassName('timeline')[0];
  var noResultsDiv = window.document.getElementsByClassName('no-search-results')[0];
  var resultsDiv = window.document.getElementsByClassName('search-results')[0];
  var loadingDiv = window.document.getElementsByClassName('loading')[0];

  if (hostname === 'localhost') {
    endpoint = 'http://localhost:9500/docs/';
  }

  function init() {
    searchButton.addEventListener('click', reqSearch);
    clearButton.addEventListener('click', reset);
    searchInput.addEventListener('keypress', reqSearch);
    archivesButton.addEventListener('click', archives);
    search();
  }

  function result(data) {
    console.log(data.id);
    var id = data.id.replace(/\/index\.html$/i, '');
    var card = window.document.createElement('div');
    card.classList.add('card');
    
    var header = window.document.createElement('div');
    header.classList.add('card-header');
    
    var title = window.document.createElement('div');
    title.classList.add('card-title');
    title.classList.add('h5');

    var link = window.document.createElement('a');
    link.setAttribute('href', id);
    link.innerHTML = '&rarr; ' + id;
    
    var subtitle = window.document.createElement('div');
    title.classList.add('card-subtitle');
    title.classList.add('text-gray');
    
    var body = window.document.createElement('div');
    body.classList.add('card-body');
    body.innerHTML = data.highlight;
  
    // Structure
    title.appendChild(link);
    header.appendChild(title);
    header.appendChild(subtitle);
    card.appendChild(header);
    card.appendChild(body);

    return card
  }

  function getParam(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return results[2].replace(/\+/g, " ");
  }

  function search() {
    var q = getParam('q');
    if (!q) {
      archives();
      return;
    }
    searchInput.value = decodeURIComponent(q);
    var req = endpoint + '?search=' + q + '&contents=false';
    console.log('executing...');
    axios.get(req).then(function(resp){
      results(resp.data.results);
    }).catch(function(resp){
      noResults();
    })
  }

  function noResults(){
    noResultsDiv.classList.remove('d-none');
    resultsDiv.innerHTML = '';
    clearButton.classList.remove('d-none');
    loadingDiv.classList.add('d-none');
    resultsDiv.classList.add('d-none');
    archivesDiv.classList.add('d-none');
  }

  function results(items){
    var info = window.document.createElement('p');
    info.textContent = items.length + ' results found.';
    resultsDiv.innerHTML = '';
    resultsDiv.appendChild(info);
    resultsDiv
    items.forEach(function(item) {
      resultsDiv.appendChild(result(item));
    });
    clearButton.classList.remove('d-none');
    loadingDiv.classList.add('d-none');
    noResultsDiv.classList.add('d-none');
    resultsDiv.classList.remove('d-none');
    archivesDiv.classList.add('d-none');
  }

  function archives(){
    noResultsDiv.classList.add('d-none');
    clearButton.classList.add('d-none');
    loadingDiv.classList.add('d-none');
    searchInput.value = '';
    resultsDiv.innerHTML = '';
    resultsDiv.classList.add('d-none');
    archivesDiv.classList.remove('d-none');
  }

  function reset() {
    window.location.search = '';
  }

  function reqSearch(e){
    if (e && e.type === 'keypress' && e.keyCode != 13) {
      return false;
    }
    var q = searchInput.value;
    if (q) {
      window.location.search = '?q=' + encodeURIComponent(q);
    } else {
      reset();
    }
  }

  init();
})(window)
