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
function deleteAccount(){
    let sid = getCookie('sid');
    logout();
    fetch('https://back-end-production-d316.up.railway.app/delete_account?sid=' + sid)
    .then(response => {
        if (response.ok) {
            alert("Account Eliminato correttamente");
        }
    })
    .catch(error => {
        console.error(error);
      });
}

//apro la pagina di cambio password
function changePassword(){
    window.location.href = "cambioPassword.html";
}


