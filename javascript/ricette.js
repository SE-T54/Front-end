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
              let title = item.title || "";
              let ingredients = item.ingredients || [];
              let link = item.link || "";

              /*parsing immagine*/
              let imageBinary = item.image;
              let blob = new Blob([imageBinary], { type: 'image/jpeg' });
              let blobURL = URL.createObjectURL(blob);
              let image = blobURL.substring(5);
              /* fine parsing */

              let recipe = {
                name: title,
                ingredients: ingredients,
                image: image,
                link: link
              }

              recipes.push(recipe);
              let s = card.replace("SPAZIOIMMAGINE", image);
              str += s.replace("SPAZIOTITOLO", title);
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
  let recipe = button.textContent.trim();
  let ogg = trovaInfo(recipe);
  let ingredientsJSON = JSON.stringify(ogg.ingredients);
  let encodedIngredients = encodeURIComponent(ingredientsJSON);
  let pagina = 'info_ricetta.html?recipe=' + recipe + '&ingredients=' + encodedIngredients + '&link=' + ogg.link;
  window.location.href = pagina;
}

function trovaInfo(chiave) {
  let oggettoTrovato = recipes.find(function(oggetto) {
    return oggetto.name === chiave;
  });
  return oggettoTrovato;
}