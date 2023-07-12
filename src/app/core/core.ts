import { SquireInterface } from "./interfaces/square.interface";

// calculate number of steps
const numOfSteps = (from: SquireInterface, to: SquireInterface) : number => {
    if (from.column == to.column) {
      return Math.abs(from.row - to.row);
    }
    else {
      return Math.abs(from.column - to.column);
    }
  }


  // check if the given wood (from) is moving forward or not
  const isMovingForward = (from: SquireInterface, to: SquireInterface) : boolean => {
    if (from.player == 1) {
      console.log("Is Forward plaer 1: ", (from.row > to.row));
      
      return (from.row > to.row)
    }
    else {
      console.log("Is Forward player 2: ", (from.row < to.row));
      return (from.row < to.row)
    }
  }




  // get moving direction
  const moveDirection = (from: SquireInterface, to: SquireInterface) : string => {
    if (from.row == to.row || from.column == to.column) {
      if (from.row == to.row) {
        return "x";
      }
      else {
        return "y";
      }
    }
    else {
      return "Unknown"
    }
  }


  export { numOfSteps , isMovingForward , moveDirection}