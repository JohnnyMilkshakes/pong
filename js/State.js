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

        // Bind event handlers to ensure 'this' context is correct
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
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

    // Update the position of the players
    updatePlayerPosition() {
        if (this.keysBeingPressed.w) {
            if (this.playerOne.topLeft.y <= this.gameplayArea.upperBound) return;
            console.log('upperbound : ' +this.gameplayArea.upperBound)
            console.log('top : ' + this.playerOne.topLeft.y)
            console.log('bottom : ' + this.playerOne.bottomRight.y)

            this.playerOne.moveUp();
        }
    
        if (this.keysBeingPressed.s) {
            if (this.playerOne.bottomRight.y >= this.gameplayArea.lowerBound) return;
            this.playerOne.moveDown();
        }
    
        if (this.keysBeingPressed.ArrowUp) {
            if (this.playerTwo.topLeft.y <= this.gameplayArea.upperBound) return;
            this.playerTwo.moveUp();
        }
    
        if (this.keysBeingPressed.ArrowDown) {
            if (this.playerTwo.bottomRight.y >= this.gameplayArea.lowerBound) return;
            this.playerTwo.moveDown();
        }
    }

    // Update the position of the ball
    updateBallPosition() {

        console.log(this.ball.topLeft)
        console.log(this.ball.bottomRight)



        if (this.ball.topLeft.x <= this.playerOne.bottomRight.x &&
            this.ball.topLeft.y <= this.playerOne.bottomRight.y &&
            this.ball.bottomRight.y >= this.playerOne.topLeft.y) {
                // if true player 1 paddle was touched, switch directions
            this.ball.direction.right = true
            this.ball.direction.left = false
        }

        if (this.ball.bottomRight.x >= this.playerTwo.topLeft.x &&
            this.ball.bottomRight.y >= this.playerTwo.topLeft.y &&
            this.ball.topLeft.y <= this.playerTwo.bottomRight.y) {
                // if true player 2 paddle was touched, switch directions
            this.ball.direction.right = false
            this.ball.direction.left = true
        }

        // if the ball touches the top
        if (this.ball.topLeft.y <= this.gameplayArea.upperBound) {
            this.ball.direction.up = false
            this.ball.direction.down = true

        // if the ball touches the bottom
        } else if (this.ball.bottomRight.y >= this.gameplayArea.lowerBound) {
            this.ball.direction.up = true
            this.ball.direction.down = false
        }

        // if the ball touches the right side net
        if (this.ball.bottomRight.x >= this.gameplayArea.rightBound) {
            this.ball.resetPosition()        
            
        // if the ball touches the left side net
        } else if (this.ball.topLeft.x <= this.gameplayArea.leftBound) {
            this.ball.resetPosition()        
        }




        if (this.ball.direction.right) {
            this.ball.moveRight();
        } else if (this.ball.direction.left) {
            this.ball.moveLeft();
        }
    
        if (this.ball.direction.up) {
            this.ball.moveUp();
        } else if (this.ball.direction.down) {
            this.ball.moveDown();
        }
    }

    // Handle key down events
    handleKeyDown(event) {
        console.log(event);
        this.keysBeingPressed[event.key] = true;

        if (!this.playerSpeedLoopInterval) {  // Prevent starting multiple intervals
            this.playerSpeedLoopInterval = setInterval(() => {
                console.log('Loop running');
                this.updatePlayerPosition();
                // Your loop logic here
            }, 0.1); // Adjust the interval time as needed
        }
    }
    
    // Handle key up events
    handleKeyUp(event) {
        this.keysBeingPressed[event.key] = false;
        if (this.playerSpeedLoopInterval) {
            clearInterval(this.playerSpeedLoopInterval);
            this.playerSpeedLoopInterval = null;
            console.log('Loop stopped');
        }
    }
}
