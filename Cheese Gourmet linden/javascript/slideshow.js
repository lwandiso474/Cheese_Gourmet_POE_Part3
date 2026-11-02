// slideshow.js - image slideshow for the Gallery page

var slides = [
    { src: "images/image 11.jpg", caption: "Platters for parties and special occasions" },
    { src: "images/image 12.jpg", caption: "A selection of cheeses with crackers" },
    { src: "images/image 3.jpg",  caption: "Our cheese range" },
    { src: "images/image 4.jpg",  caption: "Freshly baked breads" },
    { src: "images/image 5.jpg",  caption: "Jams and preserves" },
    { src: "images/image 14.jpg", caption: "The full gourmet platter" }
];

var currentSlide = 0;
var slideTimer = null;

function showSlide(index) {
    // wrap around at both ends
    currentSlide = (index + slides.length) % slides.length;

    document.getElementById("slide-image").src = slides[currentSlide].src;
    document.getElementById("slide-image").alt = slides[currentSlide].caption;
    document.getElementById("slide-caption").textContent = slides[currentSlide].caption;
    document.getElementById("slide-counter").textContent =
        (currentSlide + 1) + " / " + slides.length;
}

function startAutoPlay() {
    stopAutoPlay();
    slideTimer = setInterval(function () {
        showSlide(currentSlide + 1);
    }, 4000);
}

function stopAutoPlay() {
    if (slideTimer !== null) {
        clearInterval(slideTimer);
        slideTimer = null;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var box = document.getElementById("slideshow");
    if (!box) {
        return;
    }

    document.getElementById("slide-prev").addEventListener("click", function () {
        showSlide(currentSlide - 1);
        startAutoPlay(); // restart the timer after a manual change
    });

    document.getElementById("slide-next").addEventListener("click", function () {
        showSlide(currentSlide + 1);
        startAutoPlay();
    });

    // pause while the mouse is over the slideshow
    box.addEventListener("mouseenter", stopAutoPlay);
    box.addEventListener("mouseleave", startAutoPlay);

    showSlide(0);
    startAutoPlay();
});
