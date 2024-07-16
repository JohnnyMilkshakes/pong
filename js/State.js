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

        this.playerSpeedLoopInterval = null;

        // // Bind event handlers to ensure 'this' context is correct
        // this.handleKeyDown = this.handleKeyDown.bind(this);
        // this.handleKeyUp = this.handleKeyUp.bind(this);
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
}
