
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

const targetPoints =  [".5,.5", "3,3.5", "5.5,.5"].map(point => point.split(",").map(parseFloat));
const originalPoints = [".5,3.5", "3,.5", "5.5,3.5"].map(point => point.split(",").map(parseFloat));
const arrowPapers = papersButton.querySelector("polyline");

const animationDuration = 1000; // milliseconds
let animationStartTime = null;
let isTransformed = false;

function transformPolyline(timestamp) {
    if (!animationStartTime) {
        animationStartTime = timestamp;
    }

    const progress = Math.min(1, (timestamp - animationStartTime) / animationDuration);
    const newPoints = [];
    console.log(progress);
    for (let i = 0; i < originalPoints.length; i++) {
        const x = isTransformed ? originalPoints[i][0] + (targetPoints[i][0] - originalPoints[i][0]) * progress : targetPoints[i][0] + (originalPoints[i][0] - targetPoints[i][0]) * progress;
        const y = isTransformed ? originalPoints[i][1] + (targetPoints[i][1] - originalPoints[i][1]) * progress : targetPoints[i][1] + (originalPoints[i][1] - targetPoints[i][1]) * progress;
        newPoints.push(`${x},${y}`);
    }
    arrowPapers.setAttribute("points", newPoints);

    if (progress < 1) {
        requestAnimationFrame((timestamp) => transformPolyline(timestamp));
    } else {
        animationStartTime = null;
        isTransformed = !isTransformed;
    }
}


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
                    arrowPapers.setAttribute("points", ".5,.5 3,3.5 5.5,.5");
                    isTransformed=false;
                }
            });
        }
    });
});



papersButton.addEventListener("click", function () {
    const papersList = document.querySelector(".papers-list");
    if(papersList.clientHeight){
        papersList.style.height=0;
        requestAnimationFrame((timestamp) => transformPolyline(timestamp));
    } else {
        const papersWrapper = document.getElementById("wrapperPapers");
        papersList.style.height = "calc("+papersWrapper.clientHeight+"px + 1rem)";
        requestAnimationFrame((timestamp) => transformPolyline(timestamp));
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
