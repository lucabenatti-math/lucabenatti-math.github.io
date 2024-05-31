var isAutoplaying = true;

// Add event listener to the toggle button
const playButton = document.querySelector(".playpause");
const autoplay = document.querySelector(".autoplay-progress");
autoplay.addEventListener("click", () => {
    playButton.classList.toggle("play");
    if (isAutoplaying) {
        window.talkSwiper.autoplay.stop(); // Stop the autoplay
        progressBar.style.transition ="opacity .4s ease";
        progressBar.style.opacity =0;
    } else {
        window.talkSwiper.autoplay.start(); // Start the autoplay
    }
    isAutoplaying = !isAutoplaying; // Toggle the state
});