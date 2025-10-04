const galleryImages = document.querySelectorAll(".gallery img");
let currentIndex = 0;
let currentScale = 1;
let isDragging = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

function openLightbox(imgElement) {
    currentIndex = Array.from(galleryImages).indexOf(imgElement);
    showImage(currentIndex);
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeLightbox(e) {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
}

function showImage(index) {
    currentIndex = index;
    lightboxImg.src = galleryImages[currentIndex].src;
    currentScale = 1;
    translateX = 0;
    translateY = 0;
    lightboxImg.style.transform = `scale(${currentScale}) translate(0px, 0px)`;

    if(currentIndex === 0) {
        leftArrow.style.opacity = "0.3";
        leftArrow.style.pointerEvents = "none";
    } else {
        leftArrow.style.opacity = "1";
        leftArrow.style.pointerEvents = "auto";
    }

    if(currentIndex === galleryImages.length - 1) {
        rightArrow.style.opacity = "0.3";
        rightArrow.style.pointerEvents = "none";
    } else {
        rightArrow.style.opacity = "1";
        rightArrow.style.pointerEvents = "auto";
    }
}

function nextImage(e) {
    e.stopPropagation();
    showImage(currentIndex + 1);
}

function prevImage(e) {
    e.stopPropagation();
    showImage(currentIndex - 1);
}

lightbox.addEventListener("wheel", function(e) {
    e.preventDefault();
    if (e.deltaY < 0) {
        currentScale += 0.1;
    } else if (currentScale > 1) {
        currentScale -= 0.1;
    }
    lightboxImg.style.transform = `scale(${currentScale})`;
});

lightboxImg.addEventListener("mousedown", (e) => {
    if(currentScale <= 1) return;
    e.preventDefault();
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    lightboxImg.style.cursor = "grabbing";
});

window.addEventListener("mouseup", () => {
    isDragging = false;
    lightboxImg.style.cursor = "grab";
});

window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    let deltaX = e.clientX - startX;
    let deltaY = e.clientY - startY;
    const rect = lightboxImg.getBoundingClientRect();
    const imgWidth = rect.width;
    const imgHeight = rect.height;
    const containerWidth = lightbox.clientWidth * 0.9;
    const containerHeight = lightbox.clientHeight * 0.9;
    const maxX = Math.max((imgWidth - containerWidth) / 2, 0);
    const maxY = Math.max((imgHeight - containerHeight) / 2, 0);
    translateX = Math.min(Math.max(deltaX, -maxX), maxX);
    translateY = Math.min(Math.max(deltaY, -maxY), maxY);
    lightboxImg.style.transform = `scale(${currentScale}) translate(${translateX / currentScale}px, ${translateY / currentScale}px)`;
});

function toggleMenu() {
    const navUl = document.querySelector('header nav ul');
    navUl.classList.toggle('show');
}
