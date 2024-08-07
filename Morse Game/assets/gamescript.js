const morseCode = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/'
};

const theword = document.getElementById("theword");
const guess1 = document.getElementById("guess1");
const btn = document.getElementById("send-btn");
const easybox = document.getElementById("easybox");
const timebox = document.getElementById("timebox");
const easy = document.getElementById("easy");
let score = document.getElementById("score");
let num = parseInt(score.textContent);
let currentWord = ''; // Variable to store the current word


document.addEventListener("DOMContentLoaded", () => {
  // Loop through all items in localStorage and display them
  for(let i = 0; i < localStorage.length; i++) {
    let myname = localStorage.key(i); // Get the key (username)
    let myscore = localStorage.getItem(myname); // Get the value (score)
    addScore(myname, myscore); // Display the score
  }
});

function handleSubmit(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkGuess();
  }
}

function checkGuess() {
  const guessMorse = guess1.value.toUpperCase();
  const correctMorse = convertToMorse(currentWord);

  if (guessMorse === correctMorse || correctMorse === "") {
    easy.classList.remove("red");
    num += 10;
    score.textContent = num;
    guess1.value = ""; // Clear the input field
    fetchRandomWord(); // Fetch a new word if the guess is correct
  } else {
    easy.classList.add("red");
    console.log(convertToMorse(currentWord));
  }
}

function fetchRandomWord() {
  fetch("https://random-word-api.herokuapp.com/word?number=1")
    .then(response => response.json())
    .then(data => {
      currentWord = data[0];
      theword.textContent = currentWord;
      console.log(convertToMorse(currentWord));
    })
    .catch(error => console.error("Unlucky", error));
}

// Initialize with a random word
fetchRandomWord();

btn.addEventListener("click", checkGuess);
guess1.addEventListener("keydown", handleSubmit);

function convertToMorse(text) {
  return text.toUpperCase().split('').map(char => morseCode[char] || '').join(' ');
}

// Timer variables
let CountDownTime = 30;
let x = null;
let minutes = 1;
let isRunning = false;
const time = document.getElementById("time");
const scoreboard = document.getElementById("listofscore");

function startTimer() {
  x = setInterval(function() {
    time.textContent = `${minutes}:${CountDownTime < 10 ? '0' : ''}${CountDownTime}`;
    if (CountDownTime === 0 && minutes > 0) {
      minutes--;
      CountDownTime = 59; // Set to 59 instead of adding 60
    } 
    if (CountDownTime === 0 && minutes === 0) {
      let UserNickname = prompt("Enter your nickname");
      let UserJson = {
        UserNickname: UserNickname,
        score: score.textContent
      } 
      localStorage.setItem(UserJson.UserNickname, UserJson.score)
      let myname = UserJson.UserNickname
      let myscore = localStorage.getItem(myname)
      clearInterval(x);
      addScore(myname, myscore);
      isRunning = false;
    }
    CountDownTime--;
  }, 1000); // Adjusted to 1000 for accurate 1-second intervals
}

function addScore(nickname, score) {
  let listItem = document.createElement("li");
  listItem.textContent = `${nickname}: ${score}`;
  scoreboard.appendChild(listItem);
  sortScores();
}

function sortScores() {
  let listItems = Array.from(scoreboard.children);
  listItems.sort((a, b) => {
    let scoreA = parseInt(a.textContent.split(': ')[1]);
    let scoreB = parseInt(b.textContent.split(': ')[1]);
    return scoreB - scoreA; // Descending order
  });
  listItems.forEach(item => scoreboard.appendChild(item));
}

const appearEasy = document.getElementById("presstoeasy");
let ClickCount = 0;
appearEasy.addEventListener("click", function() {
  ClickCount++;
  if (ClickCount % 2 === 1) {
    easybox.style.display = "block";
    if (!isRunning || CountDownTime > 0) {
      startTimer();
      isRunning = true;
    }
  } else {
    easybox.style.display = "none";
    clearInterval(x);
    isRunning = false;
  }
});

const restart = document.querySelector(".restart");
restart.addEventListener("click", function() {
  // Reset score
  num = 0;
  score.textContent = num;
  
  // Reset timer values
  minutes = 1;
  CountDownTime = 30;
  clearInterval(x); // Clear the previous timer if running
  time.textContent = `${minutes}:${CountDownTime < 10 ? '0' : ''}${CountDownTime}`;
  startTimer();

  // Clear input field and set new word
  guess1.value = "";
  fetchRandomWord(); // Fetch a new random word
});
