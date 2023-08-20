var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var recipe = urlParams.get('recipe');
var ingredients = urlParams.get('ingredients');
var str = "";

document.addEventListener('DOMContentLoaded', loadInfo);

function loadInfo(){
    console.log(recipe);
  document.getElementById('ricetta').textContent = recipe;

  ingredients.forEach(item => {
    fetch(file)
      .then(response => response.text())
      .then(card => {
        var s = card.replace("SPAZIONOME", item);
        str += s.replace("SPAZIODATA", "");
        document.getElementById('ingredienti').innerHTML = str;      
      })
      .catch(error => {
        console.error('Errore nel recupero degli ingredienti', error);
      });
  });
}