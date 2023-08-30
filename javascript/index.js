function login(){
    window.location.href = "html/ricette.html";
}
function signup(){
    window.location.href = "html/signup.html";
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.cookie.indexOf('sid=') != -1 && getCookie("sid") != -1) {
        window.location.href = "html/dispensa.html";
    }
});