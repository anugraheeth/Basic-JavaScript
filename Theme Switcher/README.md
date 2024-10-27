# Animated Theme Switcher

A lightweight, animated theme switcher component that supports light, dark, and system themes with smooth transitions and animations. This component provides an intuitive user interface for switching between different color schemes while maintaining user preferences across sessions.

![Theme Switcher Demo](theme-switcher-demo.gif)

- 🚫 Respects user's reduced motion preferences

## Installation

1. Copy the HTML, CSS, and JavaScript code into your project
2. Include the necessary files in your HTML document
3. Initialize the ThemeSwitcher class

```html
<script>
    const themeSwitcher = new ThemeSwitcher();
</script>
```

## Usage

The theme switcher provides a button that cycles through three states:
1. Light theme
2. Dark theme
3. System theme (follows OS preference)


## Core Class: `ThemeSwitcher`

A comprehensive JavaScript class that manages theme switching functionality with smooth animations and persistent storage.

### Class Properties

```javascript
this.theme          // Current theme state ('light', 'dark', or 'system')
this.button         // Reference to theme toggle button element
this.sunIcon        // Reference to sun icon SVG element
this.moonIcon       // Reference to moon icon SVG element
this.statusText     // Reference to theme status text element
```

### Method Breakdown

#### 1. Constructor
```javascript
constructor() {
    this.theme = localStorage.getItem('theme') || 'system';
    this.button = document.querySelector('.theme-switch');
    this.sunIcon = document.querySelector('.sun-icon');
    this.moonIcon = document.querySelector('.moon-icon');
    this.statusText = document.querySelector('.theme-status');
    
    this.initialize();
    this.setupEventListeners();
}
```
Purpose:
- Initializes the theme switcher instance
- Retrieves saved theme from localStorage (defaults to 'system' if none exists)
- Captures necessary DOM elements
- Triggers initial setup methods

#### 2. Initialize Method
```javascript
initialize() {
    if (this.theme === 'system') {
        this.applySystemTheme();
    } else {
        this.applyTheme(this.theme);
    }
}
```
Purpose:
- Handles initial theme application on page load
- Checks if user prefers system theme or has a saved preference
- Applies appropriate theme based on the condition

#### 3. Event Listeners Setup
```javascript
setupEventListeners() {
    // Theme toggle button click
    this.button.addEventListener('click', () => this.toggleTheme());

    // System theme change detection
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (this.theme === 'system') {
            this.applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}
```
Purpose:
- Sets up click handler for theme toggle button
- Monitors system theme changes using matchMedia
- Updates theme automatically when system preference changes

#### 4. System Theme Handler
```javascript
applySystemTheme() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.applyTheme(isDarkMode ? 'dark' : 'light');
    this.statusText.textContent = 'system';
}
```
Purpose:
- Detects system color scheme preference
- Applies appropriate theme based on system settings
- Updates status text to indicate system theme is active

#### 5. Theme Application Method
```javascript
applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.updateIcon(theme === 'dark');
    this.statusText.textContent = this.theme === 'system' ? 'system' : theme;
}
```
Purpose:
- Sets theme attribute on root element
- Updates icon display based on theme
- Updates status text to reflect current theme

#### 6. Theme Toggle Handler
```javascript
toggleTheme() {
    // Cycle through themes: light -> dark -> system
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(this.theme);
    this.theme = themes[(currentIndex + 1) % themes.length];
    
    localStorage.setItem('theme', this.theme);

    if (this.theme === 'system') {
        this.applySystemTheme();
    } else {
        this.applyTheme(this.theme);
    }

    // Add animation class
    this.button.classList.add('animate');
    setTimeout(() => this.button.classList.remove('animate'), 500);
}
```
Purpose:
- Manages theme cycling sequence (light → dark → system)
- Saves theme preference to localStorage
- Applies new theme
- Triggers button animation

#### 7. Icon Update Method
```javascript
updateIcon(isDark) {
    this.sunIcon.style.display = isDark ? 'none' : 'block';
    this.moonIcon.style.display = isDark ? 'block' : 'none';
}
```
Purpose:
- Toggles visibility of sun/moon icons based on current theme
- Ensures correct icon is displayed for current theme state

### Usage

Initialize the theme switcher by creating a new instance:
```javascript
const themeSwitcher = new ThemeSwitcher();
```

### Key Features

1. **Theme Persistence**: Uses localStorage to remember user's theme preference across sessions
2. **System Theme Detection**: Automatically detects and applies system theme preference
3. **Smooth Animations**: Includes rotation animation during theme switches
4. **Event Handling**: Responds to both manual toggles and system theme changes
5. **Cyclic Switching**: Implements a three-way toggle between light, dark, and system themes

### Technical Considerations

- Uses modern JavaScript class syntax
- Implements the singleton pattern for theme management
- Utilizes CSS custom properties for theme switching
- Handles system theme preferences via matchMedia API
- Implements animation using CSS classes and timeouts