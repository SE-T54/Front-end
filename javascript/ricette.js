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
              str += card.replace("SPAZIOTITOLO", item[0]);
              document.getElementById('ricette').innerHTML = str;
            })
            .catch(error => {
              console.error('Errore nel recupero del file', error);
            });
        });
      }
    })
    .catch(error => {
      console.error('Errore:', error);
    });
}