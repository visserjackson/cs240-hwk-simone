/*
@author Jackson Visser
 */

const START_LEGNTH = 12;

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
