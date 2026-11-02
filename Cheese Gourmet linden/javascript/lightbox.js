// lightbox.js - full-screen image viewer (lightbox) for the Gallery page.
// Click any gallery picture to open it, then move through the pictures.

var lightboxItems = [];   // every picture the lightbox can show
var lightboxIndex = 0;
var lightboxOpener = null; // element to return focus to when closing

function showLightboxItem(index) {
    lightboxIndex = (index + lightboxItems.length) % lightboxItems.length;
    var item = lightboxItems[lightboxIndex];
    document.getElementById("lb-image").src = item.src;
    document.getElementById("lb-image").alt = item.caption;
    document.getElementById("lb-caption").textContent =
        item.caption + " (" + (lightboxIndex + 1) + " / " + lightboxItems.length + ")";
}

function openLightbox(index, opener) {
    lightboxOpener = opener;
    showLightboxItem(index);
    document.getElementById("lightbox").hidden = false;
    document.getElementById("lb-close").focus();
}

function closeLightbox() {
    document.getElementById("lightbox").hidden = true;
    if (lightboxOpener) {
        lightboxOpener.focus();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var box = document.getElementById("lightbox");
    if (!box) {
        return;
    }

    // 1. the slideshow pictures (the "slides" array comes from slideshow.js)
    if (typeof slides !== "undefined") {
        slides.forEach(function (slide) {
            lightboxItems.push({ src: slide.src, caption: slide.caption });
        });
    }

    // 2. the pictures in the gallery cards
    var cardImages = document.querySelectorAll("img.zoom");
    cardImages.forEach(function (img) {
        var position = lightboxItems.length;
        lightboxItems.push({ src: img.getAttribute("src"), caption: img.alt });
        img.tabIndex = 0;
        img.addEventListener("click", function () { openLightbox(position, img); });
        img.addEventListener("keydown", function (event) {
            if (event.key === "Enter") { openLightbox(position, img); }
        });
    });

    // clicking the big slideshow picture opens the lightbox on that slide
    var slideImage = document.getElementById("slide-image");
    slideImage.addEventListener("click", function () {
        openLightbox(currentSlide, slideImage);
    });

    document.getElementById("lb-close").addEventListener("click", closeLightbox);
    document.getElementById("lb-prev").addEventListener("click", function () { showLightboxItem(lightboxIndex - 1); });
    document.getElementById("lb-next").addEventListener("click", function () { showLightboxItem(lightboxIndex + 1); });

    // clicking the dark background closes it
    box.addEventListener("click", function (event) {
        if (event.target === box) { closeLightbox(); }
    });

    // keyboard: Escape closes, arrow keys move
    document.addEventListener("keydown", function (event) {
        if (box.hidden) { return; }
        if (event.key === "Escape") { closeLightbox(); }
        if (event.key === "ArrowLeft") { showLightboxItem(lightboxIndex - 1); }
        if (event.key === "ArrowRight") { showLightboxItem(lightboxIndex + 1); }
    });
});
