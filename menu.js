const header = document.querySelector("header");

window.addEventListener("scroll", function() {
    this.scrollY >=10 ? header.classList.add("scrolled") : header.classList.remove("scrolled");
})

const hamMenu = document.querySelector(".ham-menu");
const listMenu = document.querySelector(".nav_list");

hamMenu.addEventListener("click", function (){
    hamMenu.classList.toggle("ham-open");
    listMenu.classList.toggle("nav_open");
    header.classList.toggle("header_open");
})

