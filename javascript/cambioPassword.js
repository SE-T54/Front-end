document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('myForm');

    //aggiungo un listener al form in modo di intercettare il submit di un utente
    form.addEventListener('submit', function (event) {
        // Impedisci il comportamento predefinito di invio del form
        event.preventDefault(); 

        let old_password = document.getElementById('old-password').value;
        let new_password = document.getElementById('new-password').value;
        let confirm_new_password = document.getElementById('confirm-new-password').value;

        if (new_password.length < 8) {
            alert("La password deve contenere almeno 8 caratteri.");
            document.getElementById('new-password').value = "";
            document.getElementById('confirm-new-password').value = "";
        } else {
            if (new_password === confirm_new_password) {
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
                            alert("Cambio password effettuato");
                            window.location.href="areaRiservata.html";
                        } else {
                            alert(response.status);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                alert("Le password devono essere uguali");
                document.getElementById('new-password').value = "";
                document.getElementById('confirm-new-password').value = "";
            }
        }
    });
});

