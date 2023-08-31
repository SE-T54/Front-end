var ingredients = [];

//ottiene gli ingredienti della dispensa di quell'utente
function get_ingredients() {
  let sid = getCookie('sid');
  //chiama le API per ottenere gli ingredienti dell'utente
  fetch('https://back-end-production-d316.up.railway.app/ingredients?sid=' + sid)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        document.getElementById("ingredienti").innerHTML = "<h2>Non ci sono ingredienti</h2>";
      } else {
        data.forEach(item => {
          //inserisce nell'array ingredients ogni ingrediente ricevuto
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
      alert("Sessione scduta!");
      window.location.href = "login.html";
    });
}

//cambia l'odrine degli ingredienti
function modifyOrder() {
  let selezione = document.getElementById('menuTendina').value;
  console.log(selezione);
  if (selezione === 'alfabetico') {
    showAlpabetiOrder();
  } else {
    showExpirationOrder();
  }
}

//ordina per scadenza e mostra gli ingredienti
function showExpirationOrder() {
  expirationOrder(ingredients);
  showIngredients();
}

//ordine alfabetico e mostra gli ingredienti
function showAlpabetiOrder() {
  alphabeticOrder(ingredients);
  showIngredients();
}

//mostra gli ingredienti di ingredients nelle card
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
        console.error(error);
      });
  }
}

//definisco l'ordinamento lafabetico
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

//definisco l'ordinamento per scadenza
function expirationOrder(array) {
  array.sort(function (a, b) {
    let dataA = new Date(a["expiration"]);
    let dataB = new Date(b["expiration"]);
    return dataA - dataB;
  });
}

//funzione chiamata al click dell'ingrediente
function click_function(button){
  deleteElement(button);
}

//funzione di eliminazione dell'ingrediente
function deleteElement(button) {
  //chiedo all'utente la conferma di cancellazione
  let conferma = window.confirm("Vuoi eliminare questo ingrediente?");
  if (conferma) {

    let nameElement = button.querySelector('#name');
    let ingredient = nameElement.textContent;
    //chiamo le API con DELETE per rimuovere l'ingrediente
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
        console.error(error);
      });
  }

}