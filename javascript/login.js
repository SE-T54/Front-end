document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('myForm');
    //aggiunge un listener al form in modo che rilevi il submit dell'utente
    form.addEventListener('submit', function(event) {
        // Impedisci il comportamento predefinito di invio del form
        event.preventDefault();
        
        let username = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        //chiama le API scrivendo username e password nei parametri
        fetch('https://back-end-production-d316.up.railway.app/login?username=' + username + '&psw=' + password)
            .then(response => response.json())
            .then(data => {
                id = data.sessionId;

                const expirationDate = new Date();
                expirationDate.setMonth(expirationDate.getMonth() + 3);
                //setta il cookie sid dandogli una validità di 3 mesi
                document.cookie = `sid=${encodeURIComponent(id)}; expires=${expirationDate.toUTCString()}; path=/`;
                window.location.href = "ricette.html";
            })
            .catch(error => {
                    alert("Credenziali errate");
            });
    });
});

//effettua il login come guest non passando username e password
function guestLogin(){
    fetch('https://back-end-production-d316.up.railway.app/guest_registration')
    .then(response => response.text())
    .then(data => {
        id = data;

        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 3);

        document.cookie = `sid=${encodeURIComponent(id)}; expires=${expirationDate.toUTCString()}; path=/`;
        window.location.href = "ricette.html";
        })
    .catch(error => {
        alert(error);
    });
}