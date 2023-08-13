var ingredients = [];
var filter;
let file = "card-ingrediente.html";
var str = "";

document.addEventListener('DOMContentLoaded', function() {
    var searchButton = document.querySelector('.search-bar button');
    searchButton.addEventListener('click', performSearch);

    function performSearch() {
        filter = [];
        document.getElementById('ingredienti').innerHTML = ""; 
        str = "";
        var searchInput = document.querySelector('.search-bar input');
        const searchString = searchInput.value;
        if(searchString != ""){
          var pattern = new RegExp(searchString, "i");
          filter = ingredients.filter(function(str) {
            return pattern.test(str);
          });
          showIngredients();
        }else{
          document.getElementById('ingredienti').innerHTML = "<h3>Inserisci almeno una lettera!</h3>"; 
        }
    }
});

function showIngredients(){
  fetch(file)
    .then(response => response.text())
    .then(card => {
      filter.forEach(ingrediente => {
        var s = card.replace("SPAZIONOME", ingrediente);
        str += s.replace("<p id=\"date\">SPAZIODATA</p>", "");
      });
      document.getElementById('ingredienti').innerHTML = str;
    })
    .catch(error => {
      console.error('Errore nel recupero del file', error);
    });
}

function get_all_ingredients() {
  let sid = getCookie('sid');
  fetch('https://back-end-production-d316.up.railway.app/all_ingredients?sid=' + sid)
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
          ingredients.push(item.name);
          document.getElementById('ingredienti').innerHTML = "<h3>Fai la tua ricerca :)</h3>";  
        });
      }
    ).catch(error => {
      console.error('Errore:', error);
    });
}

function click_function(button) {
  var ingredient = button.textContent.trim();
  var pagina = "aggiungi-ingrediente.html?ingrediente=" + ingredient;
  window.location.href = pagina;
}