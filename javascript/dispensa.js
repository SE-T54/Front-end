function get_ingredients() {
  let sid = getCookie('sid');
  let file = "card-ingrediente.html";
  var str = "";
  fetch('https://back-end-production-d316.up.railway.app/ingredients?sid=' + sid)
    .then(response => response.json())
    .then(data => {
      console.log(sid);//elimina
      if (data.length === 0) {
        document.getElementById("ingredienti").innerHTML = "<h2>Non ci sono ingredienti</h2>";
      } else {
        data.forEach(item => {
          fetch(file)
            .then(response => response.text())
            .then(card => {
              card.replace("SPAZIONOME", item.name);
              str += card.replace("SPAZIODATA", item.expiration);
              console.log(str);
            })
            .catch(error => {
              console.error('Errore nel recupero del file', error);
            });
        });
        console.log(str);
        document.getElementById('ingredienti').innerHTML = str;
      }
    })
    .catch(error => {
      console.error('Errore:', error);
    });
}