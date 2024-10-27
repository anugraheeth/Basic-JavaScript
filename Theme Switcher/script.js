class ThemeSwitcher {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'system';
        this.button = document.querySelector('.theme-switch');
        this.sunIcon = document.querySelector('.sun-icon');
        this.moonIcon = document.querySelector('.moon-icon');
        this.statusText = document.querySelector('.theme-status');
        
        this.initialize();
        this.setupEventListeners();
    }

    initialize() {
        if (this.theme === 'system') {
            this.applySystemTheme();
        } else {
            this.applyTheme(this.theme);
        }
    }

    setupEventListeners() {

        this.button.addEventListener('click', () => this.toggleTheme());


        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (this.theme === 'system') {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    applySystemTheme() {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.applyTheme(isDarkMode ? 'dark' : 'light');
        this.statusText.textContent = 'system';
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateIcon(theme === 'dark');
        this.statusText.textContent = this.theme === 'system' ? 'system' : theme;
    }

    toggleTheme() {

        const themes = ['light', 'dark', 'system'];
        const currentIndex = themes.indexOf(this.theme);
        this.theme = themes[(currentIndex + 1) % themes.length];
        
        localStorage.setItem('theme', this.theme);

        if (this.theme === 'system') {
            this.applySystemTheme();
        } else {
            this.applyTheme(this.theme);
        }


        this.button.classList.add('animate');
        setTimeout(() => this.button.classList.remove('animate'), 500);
    }

    updateIcon(isDark) {
        this.sunIcon.style.display = isDark ? 'none' : 'block';
        this.moonIcon.style.display = isDark ? 'block' : 'none';
    }
}

const themeSwitcher = new ThemeSwitcher();