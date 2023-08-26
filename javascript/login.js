document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('myForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let username = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        fetch('https://back-end-production-d316.up.railway.app/login?username=' + username + '&psw=' + password)
            .then(response => response.json())
            .then(data => {
                id = data.sessionId;

                const expirationDate = new Date();
                expirationDate.setMonth(expirationDate.getMonth() + 3);

                document.cookie = `sid=${encodeURIComponent(id)}; expires=${expirationDate.toUTCString()}; path=/`;
                window.location.href = "index.html";
            })
            .catch(error => {
                if(error == "SyntaxError: Unexpected token 'W', \"Wrong Credentials\" is not valid JSON"){
                    document.getElementById('password').value = "";
                    alert("Credenziali errate");
                }else{
                    console.error(error);
                }
            });
    });
});

function guestLogin(){
    fetch('https://back-end-production-d316.up.railway.app/guest_registration')
    .then(response => response.text())
    .then(data => {
        id = data;

        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 3);

        document.cookie = `sid=${encodeURIComponent(id)}; expires=${expirationDate.toUTCString()}; path=/`;
        window.location.href = "index.html";
        })
    .catch(error => {
        alert(error);
        });
}