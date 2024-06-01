const targetPoints =  ["2,4", "5,7", "8,4"].map(point => point.split(",").map(parseFloat));
const originalPoints = ["2,6", "5,3", "8,6"].map(point => point.split(",").map(parseFloat));
const papersButton = document.querySelector(".papers-button");
const arrowPapers = papersButton.querySelector("polyline");
const listBox =document.querySelector(".paper-list-box");
                                               
const papersList = document.querySelector(".papers-list");
const papersWrapper = document.getElementById("wrapperPapersModel");

const animationDuration = 1000; // milliseconds
let animationStartTime = null;
let isTransformed = false;

function transformPolyline(timestamp) {
    if (!animationStartTime) {
        animationStartTime = timestamp;
    }

    const progress = Math.min(1, (timestamp - animationStartTime) / animationDuration);
    const newPoints = [];
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
        if(isTransformed){
            papersList.style.height = "auto";   
        }
    }
}

papersButton.addEventListener("click", function () {
    listBox.classList.toggle("paper-list-open");
    papersList.style.height = "calc("+papersWrapper.clientHeight+"px)";
    if(papersList.clientHeight){
        papersList.style.height=0;
        requestAnimationFrame((timestamp) => transformPolyline(timestamp));
    } else {
        papersList.style.height = "calc("+papersWrapper.clientHeight+"px)";
        requestAnimationFrame((timestamp) => transformPolyline(timestamp));
    }
});

