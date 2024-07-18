import { gameScreens,
        playerOneScore,
        playerTwoScore,
        endScreenPlayerOneScore,
        endScreenPlayerTwoScore, } from './constants.js'
import { playerOne, playerTwo, ball, state } from './app.js'

// Show specific screen based on the class name
export const showScreen = (screenClassNoDot) => {
    gameScreens.forEach((screen) => {
        // I went back and forth a few times with chatGPT to get this conditional
        // I made it the ternary operator bc it was too verbose
        Object.values(screen.classList).includes(screenClassNoDot)
        // screen.class.contains(screenClassNoDot)
            ? screen.classList.remove('hidden')
            : screen.classList.add('hidden')
    })
}

const checkUnpause = () => !state.pause

// ChatGPT wrote the function above and below (except for the setInterval part) 
// they are used to implement the pause ability inside the gameLoop
export const waitForUnpause = () => {
    return new Promise((resolve) => {
        const intervalId = setInterval(() => {
            if (checkUnpause()) {
                clearInterval(intervalId)
                resolve()
            }
        }, 100) // Check every 100 milliseconds
    })
}

// Update the position of player one
export const updatePlayerOnePosition = () => {
    if (state.keysBeingPressed.w) {
        if (playerOne.topLeft.y > state.gameplayArea.upperBound) {
            playerOne.moveUp()
        }
    }

    if (state.keysBeingPressed.s) {
        if (playerOne.bottomRight.y < state.gameplayArea.lowerBound) {
            playerOne.moveDown()
        }
    }
}

// Update the position of player two
export const updatePlayerTwoPosition = () => {
    if (state.keysBeingPressed.ArrowUp) {
        if (playerTwo.topLeft.y > state.gameplayArea.upperBound) {
            playerTwo.moveUp()
        }
    }

    if (state.keysBeingPressed.ArrowDown) {
        if (playerTwo.bottomRight.y < state.gameplayArea.lowerBound) {
            playerTwo.moveDown()
        }
    }
}

// Update the position of the ball
export const updateBallPosition = () => {

    if (ball.direction.right) {
        ball.moveRight()
    } else if (ball.direction.left) {
        ball.moveLeft()
    }

    if (ball.direction.up) {
        ball.moveUp()
    } else if (ball.direction.down) {
        ball.moveDown()
    }
}

export const ballCollisionDetector = () => {
    if (ball.topLeft.x <= playerOne.bottomRight.x &&
        ball.topLeft.y <= playerOne.bottomRight.y &&
        ball.bottomRight.y >= playerOne.topLeft.y) {
        // if true player 1 paddle was touched
        ball.leftPaddleCollision(playerOne)
        state.touch('Player One')
    }

    if (ball.bottomRight.x >= playerTwo.topLeft.x &&
        ball.bottomRight.y >= playerTwo.topLeft.y &&
        ball.topLeft.y <= playerTwo.bottomRight.y) {
        // if true player 2 paddle was touched
        ball.rightPaddleCollision(playerTwo)
        state.touch('Player Two')
    }

    // if the ball touches the top
    if (ball.topLeft.y <= state.gameplayArea.upperBound) {
        ball.flipVerticalDirection()
    // if the ball touches the bottom
    } else if (ball.bottomRight.y >= state.gameplayArea.lowerBound) {
        ball.flipVerticalDirection()
    }

    // if the ball touches the right side net
    if (ball.bottomRight.x >= state.gameplayArea.rightBound) {
        state.score.playerOne = state.score.playerOne + 1
        updateScore()
        ball.resetBall()
    // if the ball touches the left side net
    } else if (ball.topLeft.x <= state.gameplayArea.leftBound) {
        state.score.playerTwo = state.score.playerTwo + 1
        updateScore()
        ball.resetBall()
    }
}

const updateScore = () => {
    playerOneScore.innerText = state.score.playerOne
    playerTwoScore.innerText = state.score.playerTwo
    endScreenPlayerOneScore.innerText = state.score.playerOne
    endScreenPlayerTwoScore.innerText = state.score.playerTwo
}

export const checkWinner = () => {
    if (state.score.playerOne >= 10 || state.score.playerTwo >= 10) {
        return true
    }
}