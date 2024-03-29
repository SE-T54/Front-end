var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var ingredient = urlParams.get('ingrediente');

document.addEventListener('DOMContentLoaded', loadIngrediente);

function loadIngrediente() {
  document.getElementById('ingrediente').textContent = ingredient;
}

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('myForm');

  form.addEventListener('submit', function (event) {
    // Impedisci il comportamento predefinito di invio del form
    event.preventDefault(); 

    // Ottieni i valori dai campi del form
    let sid = getCookie('sid');
    let date = document.getElementById('date').value;
    let quantity = document.getElementById('quantity').value;
    let inputdate = new Date(date);
    let currentDate = new Date();

    if (inputdate >= currentDate) {
      // Crea l'oggetto JSON
      var jsonData = {
        "sid": sid,
        "ingredient": {
          "name": ingredient,
          "expiration": date,
          "quantity": quantity
        }
      };

      // Esegui la richiesta POST utilizzando fetch()
      fetch('https://back-end-production-d316.up.railway.app/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      })
        .then(response => {
          if (response.ok) {
            console.log('Richiesta POST eseguita con successo');
            alert("Ingrediente inserito correttamente");
            window.location.href = "dispensa.html";
          } else {
            console.error('Errore nella richiesta POST:', response.status);
            alert("Ci dispiace, c\'è stato un errore");
          }
        })
        .catch(error => {
          console.error(error);
        });

    } else {
      alert("La data inserita non è valida... Riprova.");
    }


  });
});