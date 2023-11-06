const translate = document.querySelectorAll(".translate");
const header = document.querySelector("header");
const hboxes = document.querySelector(".header-boxes");
const shadow = document.querySelector(".shadow");
const content = document.querySelector(".content");
const section = document.querySelector("section");
const image_container = document.querySelector(".imgContainer");
const opacity = document.querySelectorAll(".opacity");
const border = document.querySelector(".border");
const nav =document.querySelector("nav");
//const mediaQuery = window.matchMedia("(max-width: 850px)");
const hamenu = document.querySelector(".burger-symbol");
const bopenmenu = document.querySelector(".openmenu-background");

let header_height = header.offsetHeight;
let section_height = section.offsetHeight;

window.addEventListener("scroll", () => {
    let scroll = window.pageYOffset;
    let sectionY = section.getBoundingClientRect();
    
    translate.forEach(element => {
        let speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;
    });

    opacity.forEach(element => {
        element.style.opacity = scroll / (sectionY.top + section_height);
    })
    if(window.innerWidth < 850){
        hboxes.style.opacity = Math.max(Math.min(-4* scroll / header_height + 3,1),0);
    } else {
        hboxes.style.opacity = Math.max(Math.min(- scroll / header_height + 1,1),0);
    }
    shadow.style.height = `${scroll * 0.5 + 300}px`;

    content.style.transform = `translateY(${scroll / (section_height + sectionY.top) * 50 - 50}px)`;
    image_container.style.transform = `translateY(${scroll / (section_height + sectionY.top) * -50 + 50}px)`;

    border.style.width = `${scroll / (sectionY.top + section_height) * 30}%`;
    
    nav.classList.toggle("scrolled", scrollY>0);
    
})
window.addEventListener("resize", () => {
    hamenu.setAttribute("is-open","false");  
})

hamenu.addEventListener("click", () =>{
    var is_open = hamenu.getAttribute("is-open");
    if(is_open==="false"){
        hamenu.setAttribute("is-open","true");  
    }else{
        hamenu.setAttribute("is-open","false");  
    }
})

bopenmenu.addEventListener("click", () =>{
    var is_open = hamenu.getAttribute("is-open");
    if(is_open==="false"){
        hamenu.setAttribute("is-open","true");  
    }else{
        hamenu.setAttribute("is-open","false");  
    }
})