// State.js

// Class representing the game state
export class State {
    constructor(playerOne, playerTwo, ball, gameScreen) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.ball = ball;
        this.gameScreen = gameScreen;

        this.gameplayArea = {
            leftBound: '',
            rightBound: '',
            upperBound: '',
            lowerBound: ''
        };

        this.score = {
            playerOne: 0,
            playerTwo: 0
        };
    
        this.keysBeingPressed = {};
        this.playerOneSpeedLoopInterval = null;
        this.playerTwoSpeedLoopInterval = null;
        this.winner = ''

    }

    // Get the dimensions of the game screen
    getGameScreenDimensions() {
        return this.gameScreen.getBoundingClientRect();
    }

    // Set the dimensions of the game screen
    setGameScreenDimensions() {
        const data = this.getGameScreenDimensions();
        this.gameplayArea.leftBound = data.left;
        this.gameplayArea.rightBound = data.right;
        this.gameplayArea.upperBound = data.top;
        this.gameplayArea.lowerBound = data.bottom;
        console.log(this.gameplayArea);
    }

    setKeyPress(event) {
        this.keysBeingPressed[event.key] = true
    }

    removeKeyPress(event) {
        this.keysBeingPressed[event.key] = false
    }

    setWinner() {
        if (this.score.playerOne >= 10) {
            this.winner = 'Player One'
        } else if (this.score.playerTwo >= 10) {
            this.winner = 'Player Two'
        }
    }
}
