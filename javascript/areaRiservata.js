//scrive l'username dell'utente, guest altrimenti
function get_username(){
    let sid = getCookie('sid');
    fetch('https://back-end-production-d316.up.railway.app/user?sid=' + sid)
    .then(response => response.json())
    .then(data => {
        if(data.guest){
            document.getElementById("username").textContent = "Hey Guest, Registrati per non perdere i tuoi dati!";
            document.getElementById("cambioPassword").style.display = "none";
            document.getElementById("deleteAccount").style.display = "none";
        }else{
            document.getElementById("username").textContent = data.username;
        }
      })
    .catch(error => {
        console.error(error);
      });
}

//effettuo il logout settando a -1 il sid
function logout(){
    var id = -1;
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    var cookieValue = `${encodeURIComponent(id)}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = `sid=${cookieValue}`;
    window.location.href = "login.html";
}

//elimino l'account chiamando la remove

function deleteAccount() {
    //chiedo all'utente la conferma di cancellazione
    let conferma = window.confirm("Vuoi eliminare il tuo account?");
    if (conferma) {
  
        let sid = getCookie('sid');
        logout();
      //chiamo le API con DELETE per rimuovere l'account
      const url = 'https://back-end-production-d316.up.railway.app/delete_account';
      const data = {
        sid: sid
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
            alert("Account eliminato correttamente.");
            window.location.href = "../index.html";
          } else {
            alert("Qualcosa non è andato a buon fine... Riprova.");
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  
  }

//apro la pagina di cambio password
function changePassword(){
    window.location.href = "cambioPassword.html";
}


