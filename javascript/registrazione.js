document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('myFormRegistration');
    //aggiunge un listener al form in modo che rilevi il submit dell'utente
    form.addEventListener('submit', function (event) {
        // Impedisci il comportamento predefinito di invio del form
        event.preventDefault(); 
        
        var mail = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var confermaPassword = document.getElementById("confermaPassword").value;
        var username = document.getElementById("username").value;

        if (password.length < 8) {
            alert("La password deve contenere almeno 8 caratteri.");
            document.getElementById("password").value = "";
            document.getElementById("confermaPassword").value = "";
        } else {
            if (password === confermaPassword) {
                var jsonData = {
                    "mail": mail,
                    "psw": password,
                    "username": username
                }

                //Chiama le API usando POST per la registrazione
                fetch('https://back-end-production-d316.up.railway.app/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                })
                    .then(response => {
                        if (response.ok) {
                            alert("Ti sei registrato correttamente");
                            window.location.href = "ricette.html";
                        } else {
                            console.error(error);
                            alert("Registrazione non andata a buon fine, mail o username già in uso.");
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                alert("Le password devono essere uguali");
                document.getElementById("confermaPassword").value = "";
            }
        }
    });
});