window.addEventListener("scroll", function() {
    const parallaxBg = document.querySelector(".parallax-bg");
    let scrollPosition = window.pageYOffset;
    parallaxBg.style.top= -20 - scrollPosition * .5 + "px";
});


//FORMAT OF DATE IN TALKS

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


const pathElement = document.getElementById("mypath");
const animationElement = document.getElementById("pathAnimation");

// Add click event listener to the path element
pathElement.addEventListener("click", () => {
    // Begin the animation
    animationElement.beginElement();
});

