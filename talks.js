const playButton = document.querySelector(".media-button");
const autoplay = document.querySelector(".autoplay-progress");
autoplay.addEventListener("click", function () {
    playButton.classList.toggle("pause");
});

