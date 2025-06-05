// Joke Generator V2 - Updated with clean code and comments

// ====== DOM Elements ======
const jokeText = document.getElementById("joke-text");
const newJokeBtn = document.getElementById("new-joke-btn");
const copyJokeBtn = document.getElementById("copy-joke-btn");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// ====== API Configuration ======
const API_URL = "https://icanhazdadjoke.com/";
const HEADERS = { headers: { Accept: "application/json" } };

// ====== State ======
let currentJoke = "";
let isDarkMode = false;

// Load saved theme preference from localStorage
if (localStorage.getItem("darkMode") === "true") {
  isDarkMode = true;
  updateTheme();
}

// ====== Functions ======

// Fetch a new joke from the API
async function fetchJoke() {
  try {
    jokeText.innerHTML = '<div class="loader"></div>';
    const response = await fetch(API_URL, HEADERS);
    const data = await response.json();
    currentJoke = data.joke;
    jokeText.textContent = currentJoke;
  } catch (error) {
    console.error("Error fetching joke:", error);
    currentJoke = "Oops! Something went wrong. Try again later.";
    jokeText.textContent = currentJoke;
  }
}

// Copy the current joke to clipboard
function copyJokeToClipboard() {
  if (!currentJoke) return;

  navigator.clipboard.writeText(currentJoke).then(() => {
    const original = copyJokeBtn.innerHTML;
    copyJokeBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => (copyJokeBtn.innerHTML = original), 2000);
  });
}

// Toggle between light and dark themes
function toggleTheme() {
  isDarkMode = !isDarkMode;
  updateTheme();
  localStorage.setItem("darkMode", isDarkMode);
}

// Update the UI based on theme mode
function updateTheme() {
  document.body.classList.toggle("dark", isDarkMode);
  themeIcon.classList.replace(
    isDarkMode ? "fa-moon" : "fa-sun",
    isDarkMode ? "fa-sun" : "fa-moon"
  );
}

// ====== Event Listeners ======
newJokeBtn.addEventListener("click", fetchJoke);
copyJokeBtn.addEventListener("click", copyJokeToClipboard);
themeToggle.addEventListener("click", toggleTheme);

// ====== Initialize ======
fetchJoke();
