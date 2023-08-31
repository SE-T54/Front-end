var ingredients = [];
var filter;
let file = "card-ingrediente.html";
var str = "";

//aggiunge il listener al tasto cerca della search bar
document.addEventListener('DOMContentLoaded', function() {
    var searchButton = document.querySelector('.search-bar button');
    searchButton.addEventListener('click', performSearch);  

    //effettua la ricerca tra gli ingredienti in base a ciò che è scritto nella search bar e mostra  gli ingredienti filtrati
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

//stampa gli ingredienti formattati come card ingrediente e li stampa sulla pagina
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
      console.error(error);
    });
}

//chiama le API per ottenere tutti i possibili ingredienti che possono essere cercati dall'utente
function get_all_ingredients() {
  let sid = getCookie('sid');
  fetch('https://back-end-production-d316.up.railway.app/all_ingredients?sid=' + sid)
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
          //inserisce ogni elemento nell'array
          ingredients.push(item.name);
          //document.getElementById('ingredienti').innerHTML = "<h3>Fai la tua ricerca :)</h3>";  
        });
        //se non visualizza nulla toglilo
        document.getElementById('ingredienti').innerHTML = "<h3>Fai la tua ricerca :)</h3>";  
      }
    )
    .catch(error => {
      console.error(error);
    });
}

//apre la pagina aggiungi ingrediente passando come parametro il nome dell'ingrediente
function click_function(button) {
  var ingredient = button.textContent.trim();
  var pagina = "aggiungi-ingrediente.html?ingrediente=" + ingredient;
  window.location.href = pagina;
}