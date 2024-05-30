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


const svg5 = document.querySelector(".svg5");
const svg5Path = document.querySelector(".svg5 path");
svg5.addEventListener("click", function () {
    svg5Path.setAttribute("d", "M3,3 L8,3 L2,5 L8,5 L3,7 L7,7");
});
