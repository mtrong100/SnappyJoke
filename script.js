// DOM Elements
const jokeText = document.getElementById("joke-text");
const newJokeBtn = document.getElementById("new-joke-btn");
const copyJokeBtn = document.getElementById("copy-joke-btn");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// API Configuration
const API_URL = "https://icanhazdadjoke.com/";
const HEADERS = {
  headers: {
    Accept: "application/json",
  },
};

// State
let currentJoke = "";
let isDarkMode = false;

// Check for saved theme preference
if (localStorage.getItem("darkMode") === "true") {
  isDarkMode = true;
  updateTheme();
}

// Functions
async function fetchJoke() {
  try {
    // Show loading state
    jokeText.innerHTML = '<div class="loader"></div>';

    const response = await fetch(API_URL, HEADERS);
    const data = await response.json();
    currentJoke = data.joke;
    jokeText.textContent = currentJoke;
  } catch (error) {
    console.error("Error fetching joke:", error);
    currentJoke =
      "Why don't skeletons fight each other? They don't have the guts!";
    jokeText.textContent = currentJoke;
  }
}

function copyJokeToClipboard() {
  if (!currentJoke) return;

  navigator.clipboard
    .writeText(currentJoke)
    .then(() => {
      // Visual feedback
      const originalText = copyJokeBtn.innerHTML;
      copyJokeBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';

      setTimeout(() => {
        copyJokeBtn.innerHTML = originalText;
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  updateTheme();
  localStorage.setItem("darkMode", isDarkMode);
}

function updateTheme() {
  if (isDarkMode) {
    document.body.classList.add("dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    document.body.classList.remove("dark");
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
}

// Event Listeners
newJokeBtn.addEventListener("click", fetchJoke);
copyJokeBtn.addEventListener("click", copyJokeToClipboard);
themeToggle.addEventListener("click", toggleTheme);

// Initialize
fetchJoke();
