document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('myForm');
    //aggiunge un listener al form in modo che rilevi il submit dell'utente
    form.addEventListener('submit', function(event) {
        // Impedisci il comportamento predefinito di invio del form
        event.preventDefault();
        
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let hashedPassword;

        //calcolo l'hash della password
        hashString(password)
        .then(hashValue => {
            hashedPassword = hashValue;

            var jsonData = {
                "email": email,
                "psw": hashedPassword
            }
    
            //Chiama le API usando POST per il login
            fetch('https://back-end-production-d316.up.railway.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(data => {
                //setta il cookie sid dandogli una validità di 3 mesi
                id = data.sessionId;
                const expirationDate = new Date();
                expirationDate.setMonth(expirationDate.getMonth() + 3);
                
                document.cookie = `sid=${encodeURIComponent(id)}; expires=${expirationDate.toUTCString()}; path=/`;
                window.location.href = "ricette.html";
            })
            .catch(error => {
                    alert("Credenziali errate");
            });
        })
        .catch(error => {
            alert("Qualcosa non è andato a buon fine...");
            console.error(error);
        });
    });
});

//effettua il login come guest non passando mail e password
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