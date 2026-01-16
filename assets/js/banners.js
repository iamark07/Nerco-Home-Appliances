document.addEventListener('DOMContentLoaded', () => {
    // Hero Slider Logic
    const slides = document.querySelectorAll('.slider-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const slideInterval = 3000; // 3 seconds

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Start Slider
    setInterval(nextSlide, slideInterval);
});
