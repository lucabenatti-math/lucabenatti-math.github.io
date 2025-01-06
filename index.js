let header = document.querySelector("header");
let changeTheme = document.getElementById("ChangeTheme");

let navLinks = document.querySelectorAll("nav a");
let sections = document.querySelectorAll("section");

let emailButton = document.getElementById("ContactMe");

let burgerButton = document.getElementById("BurgerMenu");
let menu = document.getElementById("Menu");
let viewAll = document.getElementById("ViewAll");

viewAll.addEventListener("click", ()=> {
    window.location.href = "research.html"; 
});


burgerButton.addEventListener("click", ()=> {
    if(menu.getAttribute("state") === "open"){
        menu.setAttribute("state","close");
        burgerButton.setAttribute("state","close");
    } else {
        menu.setAttribute("state","open");
        burgerButton.setAttribute("state","open");
    }
});

function updateActiveLink() {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        // Verifica se la posizione dello scroll è all'interno della sezione
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    // Aggiorna i link
    navLinks.forEach((link) => {
        if (link.getAttribute("href").substring(1) === currentSection) {
            link.classList.add("active-link");
        } else if (currentSection === "AboutMe" && link.getAttribute("href").substring(1) === "Home"){
            link.classList.add("active-link");
        } else {
            link.classList.remove("active-link");
        }
    });
}

function remToPx(rem) {
    const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize); 
    return rem * baseFontSize;
}

window.addEventListener("scroll", ()=>{
    updateActiveLink();
    menu.setAttribute("state","close");
    burgerButton.setAttribute("state","close");
   if(window.scrollY <= remToPx(3)){
       header.setAttribute("state","");
   } else {
       header.setAttribute("state","stick");
   }
    const parallaxElements = document.querySelectorAll('.parallax');

    parallaxElements.forEach(function(element) {
    // Get the scroll position
        const scrollPosition = window.scrollY;

        // Read the data-parallax-speed custom attribute
        const parallaxSpeed = parseFloat(element.getAttribute('data-parallax-speed'));
        

        // Calculate the new position based on scroll position and parallax speed
        const offset = - scrollPosition * parallaxSpeed;
        

        // Apply the transformation to move the element
        element.style.transform = `translateY(${offset}px)`;
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("theme", savedTheme);
    } else{
         document.documentElement.setAttribute("theme","dark");
    }
});

changeTheme.addEventListener("click", ()=>{
    const root = document.documentElement;
    
    const theme = root.getAttribute("theme");
    if(theme === "light"){
        root.setAttribute("theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        root.setAttribute("theme", "light");
        localStorage.setItem("theme", "light");
    }  
});

if ( document.getElementById("Prova")){
    console.error("Events element not found!");
}


  document.getElementById('downloadCurriculum').addEventListener('click', function() {
    // Specifica il percorso al file PDF
    const pdfPath = 'assets/Curriculum.pdf';    
    // Apri il PDF in una nuova scheda o finestra
    window.open(pdfPath, '_blank');
  });



