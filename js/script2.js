"use strict"
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const restart = document.querySelector(".restart")

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 10;

const getWord = async function () {
  const response = await fetch ("https://gist.githubusercontent.com/yrpcfcp/0f119066ab7a2fc5ed9fb80bc8cb6733/raw/276175284aaa4f7f27bcba5026b6470164e1c6bd/br-sem-acentos.txt")
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};




getWord();
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    // console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
   message.innerText = "";
   const guess = letterInput.value;
   const goodGuess = validateInput(guess);

  if (goodGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Insira uma letra";
  } else if (input.length > 1) {
    message.innerText = "Coloque apenas uma letra por vez.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Coloque uma letra de A a Z";
  } else {
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "Essa já foi. Tente novamente.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    updateGuessesRemaining(guess);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

const showGuessedLetters = function () {
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  // console.log(revealWord);
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

function playSoundYes () {
  const yes = new Audio("../media/yes.mp3");;
  yes.play();
}

function playSoundNo () {
  const no = new Audio("../media/no.mp3");;
  no.play();
}

function playSoundWin () {
  const win = new Audio("../media/win.mp3");;
  win.play();
}





const updateGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
  
  if (!upperWord.includes(guess)) {
    message.innerText = `A palavra não possui a letra ${guess}.`;
    playSoundNo()
    remainingGuesses -= 1;
    } else {
    message.innerText = `Boa! A palavra possui ${guess}.`;
    playSoundYes()
  }

  

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! A palavra era <span class="highlight">${word}</span>.`;
    // startOver();
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} palpite`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} palpites`;
  }
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">Você acertou! Duas palavras para o campeão: PARA BÉNS!</p>`;
    message.style.color = "black"; 
    playSoundWin()
    
  
  }

}

restart.addEventListener("click", function(){
  window.location.reload() 
})



playAgainButton.addEventListener("click", function () {
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remainingGuessesSpan.innerText = `${remainingGuesses} palpites`;
  guessedLettersElement.innerHTML = "";
  message.innerText = "";
  getWord();

  guessLetterButton.classList.remove("hide");
  playAgainButton.classList.add("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
});






