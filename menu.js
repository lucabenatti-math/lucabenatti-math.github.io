const header = document.querySelector("header");
const hamMenu = document.querySelector(".ham-menu");
const listMenu = document.querySelector(".nav_list");
const lockscreen = document.querySelector(".lockscreen_menu");

window.addEventListener("scroll", function() {
    this.scrollY >=10 ? header.classList.add("scrolled") : header.classList.remove("scrolled");
    hamMenu.classList.remove("ham-open");
    listMenu.classList.remove("nav_open");
    header.classList.remove("header_open");
})



hamMenu.addEventListener("click", function (){
    hamMenu.classList.toggle("ham-open");
    listMenu.classList.toggle("nav_open");
    header.classList.toggle("header_open");
})

lockscreen.addEventListener("click", function(){
    hamMenu.classList.remove("ham-open");
    listMenu.classList.remove("nav_open");
    header.classList.remove("header_open");
})


// QUESTO CODICE SERVE PER CHIUDERE IL MENU QUANDO CAMBIA LA DIMENSIONE DELLO SCHERMO
// Definisci la media query
const mediaQuery = window.matchMedia("(max-width: 800px)");

// Funzione per controllare e rimuovere la classe
function handleMediaChange(event) {
    if (!event.matches) {
        // Se la media query è vera (viewport <= 600px)
        hamMenu.classList.remove("ham-open");
        listMenu.classList.remove("nav_open");
        header.classList.remove("header_open");
    } 
}

// Aggiungi il listener per monitorare i cambiamenti della media query
mediaQuery.addEventListener("change", handleMediaChange);

// Esegui la funzione una volta per impostare lo stato iniziale
handleMediaChange(mediaQuery);