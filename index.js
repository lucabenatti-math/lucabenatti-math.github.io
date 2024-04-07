const menuButton = document.querySelector(".news-button");
/*==== BioNews swiper parallax ====*/

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll(".menu a");


const papersButton = document.querySelector(".papers-button");

document.addEventListener("touchstart", ()=>{
    navLinks.forEach(link =>{
        link.classList.remove("non-touch");
    });
    document.querySelector(".name").classList.remove("non-touch");
}, false);

document.addEventListener("mouseover", ()=>{
    navLinks.forEach(link =>{
        link.classList.add("non-touch");
    });
    document.querySelector(".name").classList.add("non-touch");
}, false);

window.addEventListener("scroll", function() {
    const parallaxBg = document.querySelector(".parallax-bg");
    let scrollPosition = window.pageYOffset;
    parallaxBg.style.top= -20 - scrollPosition * .5 + "px";
    const header =document.querySelector("header");
    this.scrollY >=10 ? header.classList.add("scrolled") : header.classList.remove("scrolled");
    
  
    sections.forEach(section => {
        let top = this.scrollY;
        let offset = section.offsetTop -150;
        let height = section.offsetHeight;
        let id = section.getAttribute("id");
        if(top>=offset && top<offset+height){
            navLinks.forEach(links => {
                links.classList.remove("active");
                if(id === "Papers")
                    id="Research";
                if(id!=="About" && id!=="Home")
                    document.querySelector(".menu a[href*="+id+"]").classList.add("active");
                if(id !== "Papers" && id !== "Research"){
                    papersButton.style.transform = "scale(1)";
                    document.querySelector(".papers-list").style.height=0;
                }
                if(id!=="Home"){
                    backToBio();
                }
            });
        }
    });
});



papersButton.addEventListener("click", function () {
    const papersList = document.querySelector(".papers-list");
    if(papersList.clientHeight){
        papersList.style.height=0;
        this.style.transform ="scale(1)";
    } else {
        const papersWrapper = document.getElementById("wrapperPapers");
        this.style.transform ="scale(-1)";
        papersList.style.height = "calc("+papersWrapper.clientHeight+"px + 1rem)";
    }
});


function formatDate(inputDate) {
    // Create a Date object from the input date string
    const date = new Date(inputDate);

    // Define months array
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Extract day, month, and year from the Date object
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Format the month using the months array
    const month = months[monthIndex];

    // Construct the formatted date string
    const formattedDate = day + " " + month + " " + year;

    // Return the formatted date string
    return formattedDate;
}

const bioSwiper = new Swiper(".bio-news", {
    speed: 600,
    mousewheel: false,
    initialSlide:0,
    direction:"horizontal",
    effect: "creative",
    allowTouchMove:false,
    grab:false,
    resistance:true,
    nested: true,
    resistanceRatio:0,
    ///slideToClickedSlide:true,
    creativeEffect: {
        next: {
            translate: ["-4rem",0,1],
        },
        prev: {
            translate: [0, 0, -50],
        },
    },

});

var theNews = document.querySelectorAll(".news-animation")

theNews.forEach((myNews,index) => {
    var delay = index * .5;
    myNews.style.setProperty("--after-animation-delay", delay+"s");
});



// DISABLE MOUSEWHEEL MOVEMENT WHEN ON SCROLLED ON NEWS
//var news = document.querySelector(".news");
//news.addEventListener("mouseenter", () => {
//    homeSwiper.mousewheel.disable();
//});
//
//news.addEventListener("mouseleave", () => {
//    homeSwiper.mousewheel.enable();
//});
var newsSwiper = new Swiper(".newslist", {
    speed: 600,
    initialSlide:0,
    direction:"vertical",
    freeMode:true,
    spaceBetween: "-1px",
    slidesPerView: "auto",
    allowTouchMove:true,
    grab:false,
    mousewheel: {
        invert: false,
        forceToAxis: true,      // Enable forceToAxis for smoother scrolling
        releaseOnEdges: true,   // Allow releasing on edges for smoother bounce effect
        sensitivity:.1,
    },
    resistance:true,
    resistanceRatio:0,
    scrollbar: {
        el: ".news-scrollbar",
        hide:true,
        draggable:true,
    },
});


function openMenu() {
    menuButton.classList.toggle("cross");
    bioSwiper.slideTo(!bioSwiper.realIndex);
};


function backToBio(){
    bioSwiper.slideTo(0);
    menuButton.classList.remove("cross");
}



