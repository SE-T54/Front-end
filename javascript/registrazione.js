document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('myFormRegistration');
    //aggiunge un listener al form in modo che rilevi il submit dell'utente
    form.addEventListener('submit', function (event) {
        // Impedisci il comportamento predefinito di invio del form
        event.preventDefault(); 
        
        let mail = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let confermaPassword = document.getElementById("confermaPassword").value;
        let username = document.getElementById("username").value;

        let hashedPassword;

        hashString(password)
        .then(hashValue => {
            hashedPassword = hashValue;

            if (password.length < 8) {
                alert("La password deve contenere almeno 8 caratteri.");
                document.getElementById("password").value = "";
                document.getElementById("confermaPassword").value = "";
            } else {
                if (password === confermaPassword) {
                    var jsonData = {
                        "mail": mail,
                        "psw": hashedPassword,
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
                                window.location.href = "login.html";
                            } else {
                                console.error(error);
                                alert("Registrazione non andata a buon fine, mail o username già in uso.");
                            }
                        })
                        .catch(error => {
                            alert("Mail o username già in uso");
                            console.error(error);
                        });
                } else {
                    alert("Le password devono essere uguali");
                    document.getElementById("confermaPassword").value = "";
                }
            }
        })
        .catch(error => {
            alert("Qualcosa non è andato a buon fine...");
            console.error(error);
        });
    });
});

//funzione che ritorna l'hash di una stringa
async function hashString(inputString) {
    const encoder = new TextEncoder();
    const data = encoder.encode(inputString);
  
    // Calcola l'hash SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
    // Converti il buffer dell'hash in una rappresentazione esadecimale
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
    return hashHex;
  }