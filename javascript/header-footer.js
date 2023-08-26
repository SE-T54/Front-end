function loadContent() {
  let header, footer;

  if (window.innerWidth > 768) {
    var pathname = window.location.pathname;
    var nomePagina = pathname.substring(pathname.lastIndexOf('/') + 1);
    if ((nomePagina == "login.html" ||  nomePagina == "signup.html") || (document.cookie.indexOf('sid=') != -1 && getCookie("sid") != -1)) {
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
      window.location.href = 'login.html';
    }
  } else {
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

window.addEventListener("DOMContentLoaded", loadContent);
window.addEventListener("resize", loadContent);

function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith(name + '=')) {
      var str = decodeURIComponent(cookie.substring(name.length + 1));
      if (name == "sid" && str === -1) {
        window.location.href = "login.html";
      } else {
        return str;
      }
    }
  }

  return null;
}