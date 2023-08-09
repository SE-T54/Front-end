

/*
function get_ingredients() {
  let sid = getCookie('sid');
  let file = "card-ingrediente.html";
  var str = "";
  fetch('https://back-end-production-d316.up.railway.app/ingredients?sid=' + sid)
    .then(response => response.json())
    .then(data => {
      console.log(sid);//elimina
      console.log(data);
      if (data.length === 0) {
        document.getElementById("ingredienti").innerHTML = "<h2>Non ci sono ingredienti</h2>";
      } else {
        data.forEach(item => {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
              var htmlContent = xhttp.responseText;
              str += htmlContent.replace("txt", "<h3 id=\"name\">" + item.name + "</h3><p id=\"date\">" + item.expiration + "</p>");;
              
            }
          };
          xhttp.open("GET", file, true);
          xhttp.send();
        });
      }

    })
    .catch(error => {
      console.error('Errore:', error);
    });
}*/