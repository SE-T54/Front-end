var ingredients = [];

function get_ingredients() {
  let sid = getCookie('sid');
  console.log(sid);
  fetch('https://back-end-production-d316.up.railway.app/ingredients?sid=' + sid)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        document.getElementById("ingredienti").innerHTML = "<h2>Non ci sono ingredienti</h2>";
      } else {
        data.forEach(item => {
          let ingredient = {};
          ingredient.name = item.name;
          ingredient.expiration = item.expiration;
          ingredients.push(ingredient);
        });
      }
      expirationOrder(ingredients);
      showIngredients();
    })
    .catch(error => {
      console.error('Errore:', error);
    });
}

function modifyOrder() {
  let selezione = document.getElementById('menuAzione').value;
  if (selezione === 'Alfabetico') {
    showAlpabetiOrder();
  } else {
    showExpirationOrder();
  }
}

function showExpirationOrder() {
  expirationOrder(ingredients);
  showIngredients();
}

function showAlpabetiOrder() {
  alphabeticOrder(ingredients);
  showIngredients();
}


function showIngredients() {
  let str = "";
  let file = "card-ingrediente.html";
  for (let i = 0; i < ingredients.length; i++) {
    let name = ingredients[i].name;
    let expiration = ingredients[i].expiration;
    fetch(file)
      .then(response => response.text())
      .then(card => {
        let s = card.replace("SPAZIONOME", name);
        str += s.replace("SPAZIODATA", expiration);
        document.getElementById('ingredienti').innerHTML = str;
      })
      .catch(error => {
        console.error('Errore nel recupero del file', error);
      });
  }
}

function alphabeticOrder(array) {
  array.sort(function (a, b) {
    let valoreA = a["name"].toLowerCase();
    let valoreB = b["name"].toLowerCase();
    if (valoreA < valoreB) {
      return -1;
    }
    if (valoreA > valoreB) {
      return 1;
    }
    return 0;
  });
}

function expirationOrder(array) {
  array.sort(function (a, b) {
    let dataA = new Date(a["expiration"]);
    let dataB = new Date(b["expiration"]);
    return dataA - dataB;
  });
}

function click_function(button){
  deleteElement(button);
}


function deleteElement(button) {
  let conferma = window.confirm("Vuoi eliminare questo ingrediente?");
  if (conferma) {
    let ingredient = button.textContent.trim();
    const url = 'https://back-end-production-d316.up.railway.app/remove';
    const data = {
      sid: getCookie('sid'),
      ingredient: ingredient
    };

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, requestOptions)
      .then(response => {
        if (response.ok) {
          alert("Ingrediente eliminato correttamente.");
          location.reload();
        } else {
          alert("Qualcosa non è andato a buon fine... Riprova.");
        }
      })
      .catch(error => {
        alert("Qualcosa non è andato a buon fine... Riprova.");
        console.error('Errore:', error);
      });
  }

}