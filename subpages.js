let header = document.querySelector("header");

let changeTheme = document.getElementById("ChangeTheme");

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("theme", savedTheme);
    }
    
        
    MathJax.typeset();
});


function remToPx(rem) {
    const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize); 
    return rem * baseFontSize;
}

window.addEventListener("scroll", ()=>{
   if(window.scrollY <= remToPx(3)){
       header.setAttribute("state","");
   } else {
       header.setAttribute("state","stick");
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