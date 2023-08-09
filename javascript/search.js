const searchInput = document.getElementById('search-input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    performSearch();
  }
});

function performSearch() {
  const searchText = searchInput.value;
  console.log('Testo della ricerca:', searchText);

  
}

//collega le due funzioni, modifica la chiamata alle api perche qua ti sta ancora mandando tutti gli ingredienti del db

function get_all_ingredients() {
    let file = "card-ingrediente.html";
    var str = "";
    fetch('https://back-end-production-d316.up.railway.app/all_ingredients')
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          document.getElementById("ingredienti").innerHTML = "<h2>Non ci sono </h2>";
        } else {
          data.forEach(item => {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
              if (this.readyState === 4 && this.status === 200) {
                var htmlContent = xhttp.responseText;
  
                var s = htmlContent.replace("txt", "<h3 id=\"name\">" + item.name + "</p>");
                str += s;
                document.getElementById("ingredienti").innerHTML = str;
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
  }