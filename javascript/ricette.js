function get_recipes() {
  let sid = getCookie('sid');
  let file = "card-ricetta.html";
  var str = "";
  fetch('https://back-end-production-d316.up.railway.app/recipes?sid=' + sid)
    .then(response => response.json())
    .then(data => {
      console.log(sid);//elimina
      console.log(data);
      if (data.length === 0) {
        document.getElementById("ricette").innerHTML = "<h2>Non ci sono ingredienti</h2>";
      } else {
        data.forEach(item => {
          fetch(file)
            .then(response => response.text())
            .then(data => {
              str += data.replace("SPAZIOTITLE", item.name);
            })
            .catch(error => {
              console.error('Errore nel recupero del file', error);
            });
        });
        document.getElementById('ricette').innerHTML = str;
      }
    })
    .catch(error => {
      console.error('Errore:', error);
    });
}