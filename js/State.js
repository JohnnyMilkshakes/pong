export class State {
    constructor(playerOne, playerTwo, ball, gameScreen) {
        this.playerOne = playerOne
        this.playerTwo = playerTwo
        this.ball = ball
        this.gameScreen = gameScreen

        this.gameplayArea = {
            leftBound: '',
            rightBound: '',
            upperBound: '',
            lowerBound: ''
        }

        this.score = {
            playerOne: 0,
            playerTwo: 0
        }
    
        this.keysBeingPressed = {}
        this.playerOneSpeedLoopInterval = null
        this.playerTwoSpeedLoopInterval = null
        this.winner = ''
        this.pause = false
        this.lastTouch = ''
        this.onePlayer = false 
        this.twoPlayer = false
    }

    // Get the dimensions of the game screen
    getGameScreenDimensions() {
        return this.gameScreen.getBoundingClientRect()
    }

    // Set the dimensions of the game screen
    setGameScreenDimensions() {
        const data = this.getGameScreenDimensions()
        this.gameplayArea.leftBound = data.left
        this.gameplayArea.rightBound = data.right
        this.gameplayArea.upperBound = data.top
        this.gameplayArea.lowerBound = data.bottom
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

    togglePause() {
        this.pause ? this.pause = false : this.pause = true
    }

    touch(player) {
        this.lastTouch = player
    }
}
