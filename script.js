/**
 * Joke Generator v2
 * A web application that fetches and displays random dad jokes
 * Features: Dark/Light theme, Copy to clipboard, Download joke
 */

// DOM Elements
const jokeText = document.getElementById('joke-text');
const getJokeBtn = document.getElementById('get-joke');
const copyJokeBtn = document.getElementById('copy-joke');
const downloadJokeBtn = document.getElementById('download-joke');
const themeToggle = document.getElementById('theme-toggle');

/**
 * Theme Management
 * Handles dark/light theme switching and persistence
 */
const themeManager = {
    // Toggle theme and save preference
    toggleTheme: () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    },

    // Load saved theme preference
    loadTheme: () => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        }
    }
};

/**
 * Joke Management
 * Handles fetching and displaying jokes
 */
const jokeManager = {
    // Fetch joke from API
    async fetchJoke() {
        try {
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            return data.joke;
        } catch (error) {
            console.error('Error fetching joke:', error);
            return 'Oops! Failed to fetch a joke. Please try again!';
        }
    },

    // Display new joke with loading animation
    async displayNewJoke() {
        getJokeBtn.disabled = true;
        jokeText.classList.add('loading');
        jokeText.textContent = 'Loading...';
        
        const joke = await this.fetchJoke();
        
        jokeText.textContent = joke;
        jokeText.classList.remove('loading');
        getJokeBtn.disabled = false;
    }
};

/**
 * Utility Functions
 * Handle copying and downloading jokes
 */
const utils = {
    // Copy joke to clipboard
    async copyJoke() {
        const joke = jokeText.textContent;
        try {
            await navigator.clipboard.writeText(joke);
            this.showCopyFeedback();
        } catch (err) {
            console.error('Failed to copy text:', err);
            alert('Failed to copy joke to clipboard');
        }
    },

    // Show visual feedback for copy action
    showCopyFeedback() {
        const originalText = copyJokeBtn.innerHTML;
        copyJokeBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyJokeBtn.innerHTML = originalText;
        }, 2000);
    },

    // Download joke as text file
    downloadJoke() {
        const joke = jokeText.textContent;
        const blob = new Blob([joke], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'joke.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
};

// Event Listeners
themeToggle.addEventListener('change', themeManager.toggleTheme);
window.addEventListener('load', themeManager.loadTheme);
getJokeBtn.addEventListener('click', () => jokeManager.displayNewJoke());
copyJokeBtn.addEventListener('click', () => utils.copyJoke());
downloadJokeBtn.addEventListener('click', () => utils.downloadJoke());
