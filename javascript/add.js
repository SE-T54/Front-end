var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var ingredient = urlParams.get('ingrediente');

document.addEventListener('DOMContentLoaded', loadIngrediente);

function loadIngrediente(){
  document.getElementById('ingrediente').textContent = ingredient;
}

document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('myForm');
  
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Impedisci il comportamento predefinito di invio del form
      
      // Ottieni i valori dai campi del form
      let sid = getCookie('sid');
      let date = document.getElementById('date').value;
      let ingredient = document.getElementById('ingrediente').value;
      let quantity = document.getElementById('quantity').value;

      
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
      .then(response => response.json())
      .then(data => {
          console.log('Risposta dal server:', data);
      })
      .catch(error => {
          console.error('Errore nella richiesta POST:', error);
      });
  });
});