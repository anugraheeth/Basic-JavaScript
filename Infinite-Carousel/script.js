const carousel = document.getElementById('carousel');
const dotsContainer = document.getElementById('dots');
let currentIndex = 0;

// Initial cards data
const cardData = ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5', 'Card 6'];
const totalCards = cardData.length;
const displayMultiplier = 3; // Number of times to repeat the cards
let currentTranslate = 0;

// Create the initial set of cards (repeated several times)
function initializeCards() {
    // Create multiple sets of cards for smooth infinite scroll
    for (let i = 0; i < displayMultiplier; i++) {
        cardData.forEach(text => {
            const card = document.createElement('div');
            card.className = 'card';
            card.textContent = text;
            carousel.appendChild(card);
        });
    }

    // Position carousel in the middle set
    currentIndex = totalCards;
    updateCarousel(false);
}

// Create dots
function createDots() {
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToPage(i);
        dotsContainer.appendChild(dot);
    }
}

function navigate(direction) {
    currentIndex += direction;
    currentTranslate -= direction * 320;
    
    // Update the transform
    carousel.style.transform = `translateX(${currentTranslate}px)`;

    // Check if we need to reset position
    const totalWidth = 320 * totalCards;
    if (currentTranslate <= -totalWidth * 2) {
        // If we've gone too far right
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentTranslate += totalWidth;
            carousel.style.transform = `translateX(${currentTranslate}px)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease';
            }, 10);
        }, 500);
    } else if (currentTranslate >= -totalWidth) {
        // If we've gone too far left
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentTranslate -= totalWidth;
            carousel.style.transform = `translateX(${currentTranslate}px)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease';
            }, 10);
        }, 500);
    }

    updateDots();
}

function goToPage(pageIndex) {
    const currentPage = getCurrentPage();
    const difference = pageIndex - currentPage;
    navigate(difference);
}

function getCurrentPage() {
    return Math.abs(currentIndex) % totalCards;
}

function updateDots() {
    const activeDotIndex = getCurrentPage();
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = 'dot' + (i === activeDotIndex ? ' active' : '');
    }
}

function updateCarousel(animate = true) {
    if (!animate) {
        carousel.style.transition = 'none';
    }
    currentTranslate = -currentIndex * 320;
    carousel.style.transform = `translateX(${currentTranslate}px)`;
    if (!animate) {
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease';
        }, 10);
    }
    updateDots();
}

// Initialize the carousel
initializeCards();
createDots();

// Auto-play functionality
let autoplayInterval = setInterval(() => navigate(1), 3000);

carousel.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

carousel.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => navigate(1), 3000);
});

// Touch support
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoplayInterval);
});

carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
        navigate(1);
    } else if (touchEndX - touchStartX > 50) {
        navigate(-1);
    }
    autoplayInterval = setInterval(() => navigate(1), 3000);
});