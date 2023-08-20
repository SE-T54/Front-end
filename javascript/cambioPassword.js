document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('myForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impedisci il comportamento predefinito di invio del form

        let old_password = document.getElementById('old-password').value;
        let new_password = document.getElementById('new-password').value;
        let confirm_new_password = document.getElementById('confirm-new-password').value;

        if (new_password == confirm_new_password) {
            //cambia nome api
            let sid = getCookie('sid');

            // Crea l'oggetto JSON
            var jsonData = {
                "sid": sid,
                "old_psw": old_password,
                "new_psw": new_password
            };

            // Esegui la richiesta POST utilizzando fetch()
            fetch('https://back-end-production-d316.up.railway.app/change_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Cambio Passwordeffettuato');
                        alert("Cambio password effettuato");
                    } else {
                        console.error('Eoore ->', response.status);
                        alert("Ci dispiace, c\'è stato un errore");
                    }
                })
                .catch(error => {
                    console.error('Errore nella richiesta POST:', error);
                });
        } else {
            alert("Le password devono essere uguali");
            document.getElementById('new-password').value = "";
            document.getElementById('confirm-new-password').value = "";
        }

    });
});

