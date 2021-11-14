/*
@author Jackson Visser
 */

const START_LEGNTH = 12;

//grab nodes up top
const red = document.getElementById("redSq");
const blue = document.getElementById("blueSq");
const yellow = document.getElementById("yellowSq");
const green = document.getElementById("greenSq");
const play = document.getElementById("play");
const roundsText = document.getElementById("rounds");
const status = document.getElementById("status");

//field to represent Simone game
let game;

//class to represent a game of Simone (might try a diff approach later)
class Simone {
  won = false;
  lost = false;
  rounds;
  constructor(rounds) {
    this.rounds = rounds;
  }
  displayStartSequence(seq) {
    for (let i = 0; i < seq.length; i++) {
      switch (seq[i]) {
        case "R":
          //light up button
          //play audio
          new Audio("sounds/red.wav").play();
          break;
        case "B":
          //light up button
          //play audio
          new Audio("sounds/blue.wav").play();
          break;
        case "Y":
          //light up button
          //play audio
          new Audio("sounds/yellow.wav").play();
          break;
        case "G":
          //light up button
          //play audio
          new Audio("sounds/green.wav").play();
          break;
      }
    }
  }

  //getters
  hasWon() {
    return this.won;
  }
  hasLost() {
    return this.lost;
  }
}

//generate start sequence offline for now
function getStartSequence() {
  let startObj = { type: "start", sequence: [] };
  for (let i = 0; i < START_LEGNTH; i++) {
    let num = Math.floor(Math.random() * 4 + 1);
    switch (num) {
      case 1:
        startObj.sequence.push("R");
        break;
      case 2:
        startObj.sequence.push("B");
        break;
      case 3:
        startObj.sequence.push("Y");
        break;
      case 4:
        startObj.sequence.push("G");
        break;
    }
  }
  return startObj;
}

//also generate solution offline for now
function getSolution(rounds) {
  let solutionObj = { type: "solution", key: [] };
  for (let i = 0; i < rounds; i++) {
    let num = Math.floor(Math.random() * 4 + 1);
    switch (num) {
      case 1:
        solutionObj.key.push("R");
        break;
      case 2:
        solutionObj.key.push("B");
        break;
      case 3:
        solutionObj.key.push("Y");
        break;
      case 4:
        solutionObj.key.push("G");
        break;
    }
  }
  return solutionObj;
}

//clicking on the "Play Simone" button should instantiate a new Simone game with the correct number of rounds
play.addEventListener("click", function () {
  game = new Simone(roundsText.value);
  game.displayStartSequence();
});
