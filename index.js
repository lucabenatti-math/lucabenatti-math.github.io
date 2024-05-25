window.addEventListener("scroll", function() {
    const parallaxBg = document.querySelector(".parallax-bg");
    let scrollPosition = window.pageYOffset;
    parallaxBg.style.top= -20 - scrollPosition * .5 + "px";
});