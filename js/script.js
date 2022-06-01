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
const guessedLetters = [];


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
    guess(input);
})

hiddenWord(word)


const guess = function(){
  const acceptedLetter = /[a-zA-Z]/
  if (guess.match === " "){
      console.log("You need to insert one character (A to Z)"){
  } if(guess.match >= 1){
    console.log("Please insert ")
  }
   if (guess.macth === guesses)){
      console.log ("Yay!")
  }

  }
}


const makeGuess = function(){
    

}






