function login(){
    window.location.href = "html/login.html";
}
function signup(){
    window.location.href = "html/signup.html";
}

function autoLogin() {//effettua il login se l'utente risulta già autenticato
    if (document.cookie.indexOf('sid=') != -1 && getCookie("sid") != -1) {
        window.location.href = "html/ricette.html";
    }
}