function login(){
    let username = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch('https://back-end-production-d316.up.railway.app/login?username=' + username + '&psw=' + password)
        .then(response => response.json())
        .then(data => {
            id = data.sessionId;//controlla login errato
            console.log(id);

            const expirationDate = new Date();
            expirationDate.setMonth(expirationDate.getMonth() + 3);

            document.cookie = `sid=${encodeURIComponent(id)}; expires=${expirationDate.toUTCString()}; path=/`;

            //window.location.href = "index.html";
        })
        .catch(error => {
            console.error('Errore:', error);
        });
        
}