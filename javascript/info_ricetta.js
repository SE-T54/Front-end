var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var recipe = urlParams.get('recipe');
var ingredientsJSON = urlParams.get('ingredients');
var link = urlParams.get('link');
var image = urlParams.get('image');
var ingredients = JSON.parse(decodeURIComponent(ingredientsJSON));
var str = "";
var file = "card-ingrediente.html";

document.addEventListener('DOMContentLoaded', loadInfo);

function loadInfo(){
  document.getElementById('ricetta').textContent = recipe;
  document.getElementById('link').href = link;

  ingredients.forEach(item => {
    fetch(file)
      .then(response => response.text())
      .then(card => {
        let keysArray = Object.keys(item);
        let ingrediente = keysArray[0];
        let s = card.replace("SPAZIONOME", ingrediente);
        str += s.replace("SPAZIODATA", "");
        document.getElementById('ingredienti').innerHTML = str;      
      })
      .catch(error => {
        console.error(error);
      });
  });
}

function click_function(button) {
  var ingredient = button.textContent.trim();
  var pagina = "aggiungi-ingrediente.html?ingrediente=" + ingredient;
  window.location.href = pagina;
}