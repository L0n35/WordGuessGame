//Australian artists array
var auArtists = [
  "Flume",
  "Gang of Youths",
  "Empire of the Sun",
  "The Jungle Giants"
];

var chosenWord = "";
var chosenWord2 = "";
var wordLength = 0;
var blankWord = [];
var spaceAt = [];
var indexes = [];
var guessedLetters = [];
var lives = 15;
var wins;
var losses;

function initialise() {
  //Chooses a random artist from the auArtists array
  chosenWord = auArtists[Math.floor(Math.random() * auArtists.length)];
  console.log(chosenWord);

  //Gets rid of the spaces inside the string and sets all characters to lowercase
  chosenWord2 = chosenWord.replace(/\s/g, "");
  chosenWord2 = chosenWord2.toLowerCase();
  console.log(chosenWord2);

  lives = 15;
  wins = 0;
  losses = 0;

  //Finds the length of the chosen word
  wordLength = chosenWord2.length;
  console.log(wordLength);

  //Defines the blankWord array
  blankWord = [];

  //Defines the spaceAt array
  spaceAt = [];

  //Defines the indexes array
  indexes = [];

  //Sets an array of underscores equal in length to the chosen word
  for (i = 0; i < wordLength; i++) {
    blankWord.push("_");
  }
  console.log(blankWord);

  //Defines the guessedLetters array
  guessedLetters = [];
  console.log(guessedLetters);

  document.getElementById("guessedLetters").innerHTML =
    "<p>Guessed Letters: " + guessedLetters.join(" ") + "</p>";
  document.getElementById("blankWord").innerHTML = blankWord.join(" ");
  document.getElementById("lives").innerHTML = "Guesses Remaining: " + lives;
  document.getElementById("wins").innerHTML = "Wins: " + wins;
  document.getElementById("losses").innerHTML = "Losses: " + losses;
}

initialise();
//Sets guess to a key press
document.onkeyup = function(event) {
  var guess = event.key;
  console.log(guess);

  //Checks if guessed letter is in the chosen word string
  if (chosenWord2.includes(guess)) {
    //Taken from --> https://stackoverflow.com/questions/16897772/looping-through-string-to-find-multiple-indexes
    $.each(chosenWord2.split(""), function(i, v) {
      if (v === guess) indexes.push(i);
    });

    var indexesLength = indexes.length;
    for (var i = 0; i < indexesLength; i++) {
      blankWord[indexes[i]] = guess;
    }
    document.getElementById("blankWord").innerHTML = blankWord.join(" ");
    indexes = [];
    if (!blankWord.includes("_")) {
      alert("You've won the game!");
      initialise();
      wins += 1;
    }
    document.getElementById("wins").innerHTML = "Wins: " + wins;
  }

  //Pushes inccorect guess to the guessedLetters array
  else {
    if (guessedLetters.includes(guess) == false) {
      guessedLetters.push(guess);
      document.getElementById("guessedLetters").innerHTML =
        "<p>Guessed Letters: " + guessedLetters.join(" ") + "</p>";
    }
  }

  lives = 15 - guessedLetters.length;
  document.getElementById("lives").innerHTML = "Guesses Remaining: " + lives;

  if (lives === 0) {
    alert("You have lost...");
    initialise();
    losses += 1;
  }
  document.getElementById("losses").innerHTML = "Losses: " + losses;
};

//chosenWord = auArtists[Math.floor(Math.random() * auArtists.length)];

// document.getElementById("blankWord").onkeypress = function (){
//     this.innerHTML = this.innerHTML.replace(blankWord, blankWord);
