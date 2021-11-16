/*
@author Jackson Visser
 */
const axios = require("axios").default;

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

//class to represent a game of Simone
class Simone {
  currRound = 1;
  roundsTotal;
  solution;
  inputs = []; //an array to keep track of user inputs
  constructor(rounds = 10, solution) {
    this.roundsTotal = rounds;
    this.solution = solution;
  }
  /* 
  displays the opening sequence
  @param seq A vaild sequence array to display
  */
  async displayStart(seq) {
    for (let i = 0; i < seq.length; i++) {
      switch (
        seq[i] //find out which button to light up by adding, then removing light color class
      ) {
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
      //delay between each button lighting up
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 120)
      );
    }
  }
  /*
  displays a portion of the solution to the user. the portion displayed increases as the game goes on
  @param seq A vaild sequence array to display
  */
  async displaySoulution(seq) {
    for (let i = 0; i < this.currRound; i++) {
      switch (
        seq[i] //find out which button to light up by adding, then removing light color class
      ) {
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
      //delay between displaying each button
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 400)
      );
    }
  }
  /*
  displays a status message to the user
  @param msg the message to display
  */
  async displayStatus(msg) {
    status.innerHTML = msg;
  }
  /*
  main method responsible for a turn of gameplay. called whenever a button is pressed
  */
  async updateGame() {
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
      //they are correct. figure out what scenario it is
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
        //increment round
        this.currRound++;
        //clear inputs and delay between rounds
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
  /*
  adds a user input to the end of the input array
  @param input the input to add
  */
  addInput(input) {
    this.inputs.push(input);
  }
}

//clicking on the "Play Simone" button starts the game
play.addEventListener("click", async function () {
  if (roundsText.value == "") {
    //if no value, use default (10)
    let sol = await getSolutionAPI(10);
    game = new Simone(10, sol);
  } else {
    //otherwise, use the value from user
    if (roundsText.value <= 0) {
      //guard against values less than 1
      alert("You have to play at least one round..");
      return;
    } else {
      let sol = await getSolutionAPI(Math.floor(roundsText.value));
      game = new Simone(Math.floor(roundsText.value), sol);
    }
  }

  //get start sequence  and display
  let start = await getStartAPI();
  game.displayStart(start);
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 4000)
  );

  //display intial status and solution to the user
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

//these listeners make buttons light up on click down
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

//thse listeners make buttons no longer lit when mouse moved away
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

//thse listeners play appropriate sound when mouse is lifted and remove light color
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

//these two listeners get added to all buttons so they get white borders when hovered over
for (let b of btns) {
  //light up on hover
  b.addEventListener("mouseenter", function () {
    b.classList.toggle("hover");
  });
  b.addEventListener("mouseleave", function () {
    b.classList.toggle("hover");
  });
}

//grabs the start sequence from the api
async function getStartAPI() {
  try {
    let response = await axios.get(
      "http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start"
    );
    return response.data.sequence; //extract the array
  } catch (error) {
    console.error(error);
  }
}

/*
grabs the solution sequence from the api
@param rounds The number of rounds to play / length of solution sequence
*/
async function getSolutionAPI(rounds) {
  try {
    let response = await axios.get(
      `http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=getSolution&rounds=${rounds}`
    );
    return response.data.key; //extract the array
  } catch (error) {
    console.error(error);
  }
}
