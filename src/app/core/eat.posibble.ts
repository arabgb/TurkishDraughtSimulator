import { SquireInterface } from "./interfaces/square.interface"


// To check if the given wood can eat in next play
const eatPossibble = (wood: SquireInterface, squares: SquireInterface[][]) : boolean => {

    let behindSquare : SquireInterface|null = null;
    let nextSquare : SquireInterface| null = null;
    
    if (!wood.king) {
        // check in x direction
        if (wood.column <= 5) { // check right move
            behindSquare = squares[wood.row][wood.column+1];
            nextSquare = squares[wood.row][wood.column+2];
            if (canEat(wood, nextSquare, behindSquare)) {
                return true;
            }
        }
        // check in x direction
        if (wood.column >= 2) { // check left moving
            behindSquare = squares[wood.row][wood.column-1];
            nextSquare = squares[wood.row][wood.column-2];
            if (canEat(wood, nextSquare, behindSquare)) {
                return true;
            }
        }
        // check in y direction
        if (wood.player == 1 && wood.row >= 2) { // player 1 move up
            behindSquare = squares[wood.row-1][wood.column];
            nextSquare = squares[wood.row-2][wood.column];
            if (canEat(wood, nextSquare, behindSquare)) {
                return true;
            }
        }

        // check in y direction
        if (wood.player == 2 && wood.row <= 5) { // player 1 move up
            behindSquare = squares[wood.row+1][wood.column];
            nextSquare = squares[wood.row+2][wood.column];
            if (canEat(wood, nextSquare, behindSquare)) {
                return true;
            }
        }
    }
   

    return false

}

const canEat = (from: SquireInterface, to: SquireInterface, behindSquare: SquireInterface) : boolean => {

    if (!from.king) {
        if (behindSquare.player != -1 && behindSquare.player != from.player) { // the behind square must be not empty and diffrent player
            if (to.player == -1) {
                return true;
            }
        }
    }

    return false;

}

export { eatPossibble }