var recipes = [];

//ottiene le ricette che può fare l'utente in base al session ID
function get_recipes() {
  let sid = getCookie('sid');
  let file = "card-ricetta.html";
  let str = "";
  //chiamo le API per ottenere le ricette 
  fetch('https://back-end-production-d316.up.railway.app/recipes?sid=' + sid)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        document.getElementById("ricette").innerHTML = "<h2>Errore, non è stata trovata alcuna ricetta</h2>";
      } else {
        //Scrivo le informazioni delle ricette sulle card ricette
        data.forEach(item => {
          fetch(file)
            .then(response => response.text())
            .then(card => {
              let title = item.title || "";
              let ingredients = item.ingredients || [];
              let link = item.link || "";
              let image = "data:image/jpeg;base64," + item.image;

              let recipe = {
                name: title,
                ingredients: ingredients,
                link: link
              }

              recipes.push(recipe);
              let s = card.replace("SPAZIOIMMAGINE", image);
              str += s.replace("SPAZIOTITOLO", title);
              document.getElementById('ricette').innerHTML = str;
            })
            .catch(error => {
              console.error(error);
            });
        });
      }
    })
    .catch(error => {
      //in caso la sessione sia scaduta è necessario rieffettuare il login
      alert("Sessione scaduta!");
      window.location.href = "login.html";
    });
}

//apre la pagina di info ricetta aggiungendo le info della ricetta come parametri dell'URL
function click_function(button) {
  let recipe = button.textContent.trim();
  let ogg = trovaInfo(recipe);
  let ingredientsJSON = JSON.stringify(ogg.ingredients);
  let encodedIngredients = encodeURIComponent(ingredientsJSON);
  let img = ogg.image;
  let pagina = 'info_ricetta.html?recipe=' + recipe + '&ingredients=' + encodedIngredients + '&link=' + ogg.link;
  window.location.href = pagina;  
}

//trova ritorna l'elemento di recipes con il nome corrispondente
function trovaInfo(chiave) {
  let oggettoTrovato = recipes.find(function(oggetto) {
    return oggetto.name === chiave;
  });
  return oggettoTrovato;
}