(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
@author Jackson Visser
 */

//grab nodes up top
const red = document.getElementById("redSq");
const blue = document.getElementById("blueSq");
const yellow = document.getElementById("yellowSq");
const green = document.getElementById("greenSq");
const btns = document.querySelectorAll(".colors");
const play = document.getElementById("play");
const roundsText = document.getElementById("rounds");
const status = document.getElementById("status");

//field to represent Simone game
let game;

//class to represent a game of Simone (might try a diff approach later)
class Simone {
  won = false;
  lost = false;
  currRound = 1;
  roundsTotal;
  solution;
  inputs = [];
  constructor(rounds = 10, solution) {
    this.roundsTotal = rounds;
    this.solution = solution;
  }
  async displayStart(seq) {
    for (let i = 0; i < seq.length; i++) {
      switch (seq[i]) {
        case "R":
          red.classList.add("lightred");
          new Audio("sounds/red.wav").play();
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve();
            }, 120)
          );
          red.classList.remove("lightred");
          break;
        case "B":
          blue.classList.add("lightblue");
          new Audio("sounds/blue.wav").play();
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve();
            }, 120)
          );
          blue.classList.remove("lightblue");
          break;
        case "Y":
          yellow.classList.add("lightyellow");
          new Audio("sounds/yellow.wav").play();
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve();
            }, 120)
          );
          yellow.classList.remove("lightyellow");
          break;
        case "G":
          green.classList.add("lightgreen");
          new Audio("sounds/green.wav").play();
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve();
            }, 120)
          );
          green.classList.remove("lightgreen");
          break;
      }
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 120)
      );
    }
  }

  async displaySoulution(seq) {
    for (let i = 0; i < this.currRound; i++) {
      switch (seq[i]) {
        case "R":
          red.classList.add("lightred");
          new Audio("sounds/red.wav").play();
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve();
            }, 400)
          );
          red.classList.remove("lightred");
          break;
        case "B":
          blue.classList.add("lightblue");
          new Audio("sounds/blue.wav").play();
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve();
            }, 400)
          );
          blue.classList.remove("lightblue");
          break;
        case "Y":
          yellow.classList.add("lightyellow");
          new Audio("sounds/yellow.wav").play();
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve();
            }, 400)
          );
          yellow.classList.remove("lightyellow");
          break;
        case "G":
          green.classList.add("lightgreen");
          new Audio("sounds/green.wav").play();
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve();
            }, 400)
          );
          green.classList.remove("lightgreen");
          break;
      }
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 400)
      );
    }
  }

  async displayStatus(msg) {
    status.innerHTML = msg;
  }

  async updateGame() {
    //should be called everytime a button is clicked. buttons add inputs
    //first, find out if user input is right or wrong
    let correct = true;
    for (let i = 0; i < this.inputs.length; i++) {
      if (this.inputs[i] != this.solution[i]) {
        correct = false;
      }
    }
    //if they're wrong, game is over
    if (!correct) {
      //play sounds
      new Audio("sounds/wrong.wav").play();
      new Audio("sounds/lose.wav").play();
      //change background to hot pink
      document.body.style.backgroundColor = "hotpink";
      //display "you lose" status
      this.displayStatus("Incorrect! You lose!");
    } else {
      //they are correct. figure out the scenario
      //1. game ends if last button in last round
      if (
        this.currRound == this.roundsTotal &&
        this.inputs.length == this.solution.length
      ) {
        //play sound
        new Audio("sounds/win.mp3").play();
        //change background to DeepSkyBlue
        document.body.style.backgroundColor = "deepSkyBlue";
        //display "you win" status
        this.displayStatus("Yay you win!");
      }
      //2. go to next round if last button of current round
      else if (this.inputs.length == this.currRound) {
        //update status
        this.displayStatus("Good job! Prepare for next round.");
        new Audio("sounds/nextRound.wav").play();
        //update round
        this.currRound++;
        //clear inputs
        this.inputs.splice(0, this.inputs.length);
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 800)
        );
        //update status again
        this.displayStatus(`Round ${this.currRound} of ${this.roundsTotal}.`);
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 800)
        );
        //display solution sequence for next round
        this.displaySoulution(this.solution);
      } else {
        //3. Wait for next button in sequence if still going
        this.displayStatus(
          `So far so good! ${this.currRound - this.inputs.length} more to go!`
        );
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

  getSolution() {
    return this.solution;
  }

  getTotalRounds() {
    return this.roundsTotal;
  }

  //setters
  addInput(input) {
    this.inputs.push(input);
  }
}

//clicking on the "Play Simone" button should instantiate a new Simone game with the correct number of rounds
play.addEventListener("click", async function () {
  if (roundsText.value == "") {
    game = new Simone(10, getSolution(10));
  } else {
    game = new Simone(roundsText.value, getSolution(roundsText.value));
  }
  game.displayStart(getStart().sequence);
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 4000)
  );
  game.displayStatus(`Round 1 of ${game.getTotalRounds()}`);
  game.displaySoulution(game.getSolution());
});

//game should only be triggered when user clicks. add event listeners to the four buttons that check
//for all game states and react appropriately
red.addEventListener("click", function () {
  game.addInput("R"); //specific action for red
  //function for all buttons
  game.updateGame();
});

blue.addEventListener("click", function () {
  game.addInput("B"); //specific action for blue
  //function for all buttons
  game.updateGame();
});

yellow.addEventListener("click", function () {
  game.addInput("Y"); //specific action for yellow
  //function for all buttons
  game.updateGame();
});

green.addEventListener("click", function () {
  game.addInput("G"); //specific action for green
  //function for all buttons
  game.updateGame();
});

//buttons light up on click down
red.addEventListener("mousedown", function () {
  red.classList.toggle("lightred");
});

blue.addEventListener("mousedown", function () {
  blue.classList.toggle("lightblue");
});

yellow.addEventListener("mousedown", function () {
  yellow.classList.toggle("lightyellow");
});

green.addEventListener("mousedown", function () {
  green.classList.toggle("lightgreen");
});

//buttons are no longer lit when mouse moved away
red.addEventListener("mouseleave", function () {
  red.classList.remove("lightred");
});

blue.addEventListener("mouseleave", function () {
  blue.classList.remove("lightblue");
});

yellow.addEventListener("mouseleave", function () {
  yellow.classList.remove("lightyellow");
});

green.addEventListener("mouseleave", function () {
  green.classList.remove("lightgreen");
});

//play sound when mouse is lifted and remove light color
red.addEventListener("mouseup", function () {
  red.classList.remove("lightred");
  new Audio("sounds/red.wav").play();
});

blue.addEventListener("mouseup", function () {
  blue.classList.remove("lightblue");
  new Audio("sounds/blue.wav").play();
});

yellow.addEventListener("mouseup", function () {
  yellow.classList.remove("lightyellow");
  new Audio("sounds/yellow.wav").play();
});

green.addEventListener("mouseup", function () {
  green.classList.remove("lightgreen");
  new Audio("sounds/green.wav").play();
});

//add event listeners needed for all buttons
for (let b of btns) {
  //light up on hover
  b.addEventListener("mouseenter", function () {
    b.classList.toggle("hover");
  });
  b.addEventListener("mouseleave", function () {
    b.classList.toggle("hover");
  });
}

//generate start sequence offline for now
function getStart() {
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
  return solutionObj.key;
}

},{}]},{},[1]);
