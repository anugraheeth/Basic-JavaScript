# Infinite Circular Carousel

A smooth, infinite circular carousel implementation using vanilla JavaScript, HTML, and CSS. The carousel features continuous scrolling in both directions, touch support, auto-play functionality, and dot indicators.

![Carousel Preview](/assets/Carousel.png)


### Installation

1. Clone the repository:
```bash
git clone https://github.com/anugraheeth/infinite-circular-carousel.git
```

2. Navigate to the project directory:
```bash
cd infinite-circular-carousel
```

3. Open `index.html` in your browser or serve it using a local server.

## Code Structure

### HTML Structure

The basic HTML structure consists of a container with navigation buttons and a space for cards:

```html
<div class="carousel-container">
    <button class="nav-button prev">←</button>
    <div class="carousel" id="carousel">
        <!-- Cards are dynamically inserted here -->
    </div>
    <button class="nav-button next">→</button>
    <div class="dots-container" id="dots"></div>
</div>
```

### JavaScript Implementation Details

Let's break down the key components of the JavaScript implementation:

#### 1. Card Initialization

```javascript
const cardData = ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5', 'Card 6'];
const totalCards = cardData.length;
const displayMultiplier = 3; // Number of times to repeat the cards

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
}
```
This section creates multiple sets of cards to ensure smooth scrolling. The `displayMultiplier` determines how many times the card set is repeated to create the illusion of infinite scrolling.

#### 2. Navigation Logic

```javascript
function navigate(direction) {
    currentIndex += direction;
    currentTranslate -= direction * 320;
    
    carousel.style.transform = `translateX(${currentTranslate}px)`;

    // Reset position when necessary
    const totalWidth = 320 * totalCards;
    if (currentTranslate <= -totalWidth * 2) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentTranslate += totalWidth;
            carousel.style.transform = `translateX(${currentTranslate}px)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease';
            }, 10);
        }, 500);
    }
    // Similar logic for left direction...
}
```
The navigation function handles:
- Updating the current position
- Smooth transitions between cards
- Behind-the-scenes position resets
- Maintaining the illusion of infinite scrolling

#### 3. Dot Navigation

```javascript
function createDots() {
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToPage(i);
        dotsContainer.appendChild(dot);
    }
}

function updateDots() {
    const activeDotIndex = getCurrentPage();
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = 'dot' + (i === activeDotIndex ? ' active' : '');
    }
}
```
The dot navigation system:
- Creates interactive dot indicators
- Updates active state based on current position
- Provides direct navigation to specific cards

#### 4. Touch Support

```javascript
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
```
Touch support includes:
- Swipe detection in both directions
- Automatic pause of auto-play during touch interaction
- Swipe threshold for better user experience

#### 5. Auto-play Functionality

```javascript
let autoplayInterval = setInterval(() => navigate(1), 3000);

carousel.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

carousel.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => navigate(1), 3000);
});
```
Auto-play features:
- Automatic advancement every 3 seconds
- Pause on hover
- Pause on touch interaction
- Auto-resume when interaction ends

## Customization

### Adjusting Card Width
Change the card width in both the CSS `.card` class and the JavaScript navigation calculations:

```css
.card {
    min-width: 300px;
    /* other styles */
}
```

```javascript
currentTranslate -= direction * 320; // 320 = card width + gap
```

### Changing Transition Speed
Modify the transition duration in the CSS:

```css
.carousel {
    transition: transform 0.5s ease;
}
```

### Auto-play Interval
Adjust the auto-play timing by changing the interval value:

```javascript
setInterval(() => navigate(1), 3000); // 3000ms = 3 seconds
```

## Browser Support

The carousel works in all modern browsers that support:
- CSS Transforms
- CSS Transitions
- ES6 JavaScript

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by modern UI/UX design patterns
- Built with accessibility in mind
- Optimized for performance

