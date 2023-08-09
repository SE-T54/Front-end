function loadContent() {
    let header, footer;

    if (window.innerWidth > 768) {
        header = "header-footer/header.html";
        footer = "header-footer/footer.html";

        fetch(header)
        .then(response => response.text())
        .then(data => {
          document.getElementById("headerDesktop").innerHTML = data;
        })
        .catch(error => {
          console.error("Impossibile caricare il contenuto del documento HTML: ", error);
        });

        fetch(footer)
        .then(response => response.text())
        .then(data => {
          document.getElementById("footerDesktop").innerHTML = data;
        })
        .catch(error => {
          console.error("Impossibile caricare il contenuto del documento HTML: ", error);
        });
    }else{
        header = "header-footer/header-mobile.html";

        fetch(header)
        .then(response => response.text())
        .then(data => {
          document.getElementById("headerMobile").innerHTML = data;
        })
        .catch(error => {
          console.error("Impossibile caricare il contenuto del documento HTML: ", error);
        });
    }

    
}

function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
  
      if (cookie.startsWith(name + '=')) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
  
    return null;
}

  window.addEventListener("DOMContentLoaded", loadContent);
  window.addEventListener("resize", loadContent);