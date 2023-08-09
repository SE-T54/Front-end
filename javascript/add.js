function add_ingredient(){
    let sid = getCookie('sid');
    let date = document.getElementById('date').value;
    //let quantity = document.getElementById('quantity').value; //aggiungiamo la quantità alle API?

    fetch('https://back-end-production-d316.up.railway.app//add?sid=' + sid + '&expiration=' + date + '&ingredient=' + ingredient)
        .then(response => response.json())
        .then(data => {
            //controlla se risposta è ok
            window.alert("Ingrediente aggiunto.");
        })
        .catch(error => {
          window.alert("Errore: Ingrediente non aggiunto.");  
          console.error('Errore:', error);
        });
}