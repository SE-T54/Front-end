document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('myFormRegistration');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impedisci il comportamento predefinito di invio del form

        // Ottieni i valori dai campi del form
        var mail = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var confermaPassword = document.getElementById("confermaPassword").value;
        var nome = document.getElementById("first-name").value;
        var cognome = document.getElementById("last-name").value;

        if(password === confermaPassword){
        // Crea l'oggetto JSON
        var jsonData = {
            "mail": mail,
            "psw": password
        }

        // Esegui la richiesta POST utilizzando fetch()
        fetch('https://back-end-production-d316.up.railway.app/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
            .then(data => {
                console.log('Risposta dal server:', data);
            })
            .catch(error => {
                console.error('Errore nella richiesta POST:', error);
            });
        }else{
            alert("Le password devono essere uguali");
            document.getElementById("confermaPassword").value = "";
        }
        
    });
});