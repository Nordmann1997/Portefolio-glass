document.addEventListener('DOMContentLoaded', function() {
    const threeImagesContainer = document.querySelector('.three-images');
    const images = threeImagesContainer.querySelectorAll('img');
    const dotsContainer = document.createElement('div');
    let currentIndex = 0;
    let startX = 0;
    let endX = 0;

    // Create dots for navigation
    dotsContainer.classList.add('dots-container');
    images.forEach((img, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlide();
        });
        dotsContainer.appendChild(dot);
    });
    threeImagesContainer.appendChild(dotsContainer);

    function updateSlide() {
        images.forEach((img, index) => {
            img.style.transform = `translateX(-${currentIndex * 100}%)`;
        });
        updateDots();
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function enableSlider() {
        threeImagesContainer.addEventListener('touchstart', handleTouchStart);
        threeImagesContainer.addEventListener('touchmove', handleTouchMove);
        threeImagesContainer.addEventListener('touchend', handleTouchEnd);

        updateSlide();
    }

    function disableSlider() {
        dotsContainer.remove();
        threeImagesContainer.removeEventListener('touchstart', handleTouchStart);
        threeImagesContainer.removeEventListener('touchmove', handleTouchMove);
        threeImagesContainer.removeEventListener('touchend', handleTouchEnd);
        images.forEach((img) => {
            img.style.transform = 'translateX(0)';
        });
    }

    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
    }

    function handleTouchMove(e) {
        endX = e.touches[0].clientX;
    }

    function handleTouchEnd() {
        if (startX > endX + 50) {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        } else if (startX < endX - 50) {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        }
        updateSlide();
    }

    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            enableSlider();
        } else {
            disableSlider();
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
});
