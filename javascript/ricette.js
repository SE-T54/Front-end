var recipes = [];

function get_recipes() {
  let sid = getCookie('sid');
  let file = "card-ricetta.html";
  var str = "";
  fetch('https://back-end-production-d316.up.railway.app/recipes?sid=' + sid)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        document.getElementById("ricette").innerHTML = "<h2>Errore, non è stata trovata alcuna ricetta</h2>";
      } else {
        data.forEach(item => {
          fetch(file)
            .then(response => response.text())
            .then(card => {
              console.log(item);
              var recipe = {
                name: item[0],
                ingredients: item[1]
              }
              recipes.push(recipe);
              str += card.replace("SPAZIOTITOLO", item[0]);
              document.getElementById('ricette').innerHTML = str;
            })
            .catch(error => {
              console.error('Errore nel recupero del file =>', error);
            });
        });
      }
    })
    .catch(error => {
      console.error('Errore:', error);
    });
}

function click_function(button) {
  var recipe = button.textContent.trim();
  var pagina = 'info_ricetta.html?recipe=' + 'pera' + '&ingredients=' + 'mela';
  console.log(pagina);
  window.location.href = pagina;
}

function trovaValore(chiave) {
  var oggettoTrovato = recipes.find(function(oggetto) {
    return oggetto.name === chiave;
  });
  return oggettoTrovato.ingredients;
}