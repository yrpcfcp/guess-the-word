"use strict"
const listItem = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector (".remaining");
const spanParagraph = document.querySelector ("span");
const guesses = document.querySelector (".guessed-letters");
const playAgain = document.querySelector(".play-again-hide");
const word = "magnolia";


const hiddenWord = function (word){
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
      }
      wordProgress.innerText = placeholderLetters.join("");
};


guessButton.addEventListener("click", function(e){
    e.preventDefault();
    const captureWord = letter.value;
    console.log(captureWord);
    letter.value = "";
})

hiddenWord(word)





