const targetPoints =  [".5,.5", "3,3", "5.5,.5"].map(point => point.split(",").map(parseFloat));
const originalPoints = [".5,3", "3,.5", "5.5,3"].map(point => point.split(",").map(parseFloat));
const papersButton = document.querySelector(".papers-button");
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

