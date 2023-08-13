function logout(){
    var id = -1;
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    var cookieValue = `${encodeURIComponent(id)}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = `sid=${cookieValue}`;
    window.location.href = "login.html";
}




