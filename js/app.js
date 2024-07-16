import { Ball } from './Ball.js'
import { Paddle } from './Paddle.js'
import { State } from './State.js'
import { gameScreens, 
        gameContainer, 
        ballElement, 
        playerOnePaddleElement, 
        playerTwoPaddleElement,
        playerOneScore,
        playerTwoScore,
        endScreenPlayerOneScore,
        endScreenPlayerTwoScore,
        winMessage,
        playerSelectDiv,
        difficultySelectDiv,
        howToPlayButton,
        startButton } from './constants.js'

let playerOne, playerTwo, ball, state

// Show specific screen based on the class name
const showScreen = (screenClassNoDot) => {
    gameScreens.forEach((screen) => {
        Object.values(screen.classList).includes(screenClassNoDot)
            ? screen.classList.remove('hidden')
            : screen.classList.add('hidden')
    })
}

// Initialize the game
const init = () => {
    playerOne = new Paddle(playerOnePaddleElement)
    playerTwo = new Paddle(playerTwoPaddleElement)
    ball = new Ball(ballElement)
    state = new State(playerOne, playerTwo, ball, gameScreens[1])

    state.ball.direction.up = true
    state.ball.direction.right = true

    state.setGameScreenDimensions()
    console.log(playerOne)


    let fpsContainer = document.getElementById('fps')
    let lastFrameTime = performance.now()
    let frameCount = 0
    let fps = 0


    const gameLoop = () => {

        let now = performance.now()
        frameCount++
        let deltaTime = now - lastFrameTime

        if (deltaTime >= 1000) {
            fps = frameCount
            frameCount = 0
            lastFrameTime = now
            fpsContainer.textContent = `FPS: ${fps}`
        }

        ballCollisionDetector()
        updateBallPosition()
        if(checkWinner()) {
            state.setWinner()
            winMessage.innerText = `${state.winner} Wins!`
            showScreen('end-screen')
            return
        }
        requestAnimationFrame(gameLoop)
    }

    requestAnimationFrame(gameLoop)

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
}

// Handle button clicks
const handleClick = (event) => {
    const buttonClass = event.target.className
    if (buttonClass === 'start-button') {
        showScreen('gameplay-screen')
        init()
    }

    if (buttonClass === 'how-to-play-button') {
        showScreen('how-to-play-screen')
    }

    if (buttonClass === 'one-player-button') {
       playerSelectDiv.classList.add('hidden')
       difficultySelectDiv.classList.remove('hidden')

       howToPlayButton.style.marginBottom = '0px'

    }

    if (buttonClass === 'two-player-button') {
        startButton.classList.remove('hidden')
    }

    if (buttonClass === 'difficulty-back-button') {
        difficultySelectDiv.classList.add('hidden')
        playerSelectDiv.classList.remove('hidden')
        startButton.classList.add('hidden')

    }

    if (buttonClass === 'play-again-button') {
        showScreen('start-screen')
    }

    if (buttonClass === 'back-button') {
        showScreen('start-screen')
    }

    if (buttonClass === 'easy-button') {
        startButton.classList.remove('hidden')
        console.log('EZ')
    }
    if (buttonClass === 'medium-button') {
        startButton.classList.remove('hidden')

        console.log('MEDZ')
    }
    if (buttonClass === 'hard-button') {
        startButton.classList.remove('hidden')

        console.log('HARDZ')
    }
}

// Update the position of the players
// Update the position of player one
const updatePlayerOnePosition = () => {
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
const updatePlayerTwoPosition = () => {
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
const updateBallPosition = () => {

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

const ballCollisionDetector = () => {
    if (ball.topLeft.x <= playerOne.bottomRight.x &&
        ball.topLeft.y <= playerOne.bottomRight.y &&
        ball.bottomRight.y >= playerOne.topLeft.y) {
        // if true player 1 paddle was touched, switch directions
        ball.direction.right = true
        ball.direction.left = false
        ball.speed = ball.speed + 0.5
    }

    if (ball.bottomRight.x >= playerTwo.topLeft.x &&
        ball.bottomRight.y >= playerTwo.topLeft.y &&
        ball.topLeft.y <= playerTwo.bottomRight.y) {
        // if true player 2 paddle was touched, switch directions
        ball.direction.right = false
        ball.direction.left = true
        ball.speed = ball.speed + 0.5

    }

    // if the ball touches the top
    if (ball.topLeft.y <= state.gameplayArea.upperBound) {
        ball.direction.up = false
        ball.direction.down = true
    // if the ball touches the bottom
    } else if (ball.bottomRight.y >= state.gameplayArea.lowerBound) {
        ball.direction.up = true
        ball.direction.down = false
    }

    // if the ball touches the right side net
    if (ball.bottomRight.x >= state.gameplayArea.rightBound) {
        state.score.playerOne = state.score.playerOne + 1
        updateScore()
        ball.resetPosition()
        ball.speed = 2
    // if the ball touches the left side net
    } else if (ball.topLeft.x <= state.gameplayArea.leftBound) {
        state.score.playerTwo = state.score.playerTwo + 1
        updateScore()
        ball.resetPosition()
        ball.speed = 2

    }
}

const updateScore = () => {
    console.log(endScreenPlayerOneScore)
    console.log(endScreenPlayerTwoScore)
    playerOneScore.innerText = state.score.playerOne
    playerTwoScore.innerText = state.score.playerTwo
    endScreenPlayerOneScore.innerText = state.score.playerOne
    endScreenPlayerTwoScore.innerText = state.score.playerTwo

}

const checkWinner = () => {
    if (state.score.playerOne >= 10 || state.score.playerTwo >= 10) {
        return true
    }
}

// Handle key down events
const handleKeyDown = (event) => {
    state.setKeyPress(event)

    if (event.key === 'w' || event.key === 's') {
        if (!state.playerOneSpeedLoopInterval) {
            state.playerOneSpeedLoopInterval = setInterval(() => {
                updatePlayerOnePosition()
            }, 0.1) // Adjust the interval time as needed
        }
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        if (!state.playerTwoSpeedLoopInterval) {
            state.playerTwoSpeedLoopInterval = setInterval(() => {
                updatePlayerTwoPosition()
            }, 0.1) // Adjust the interval time as needed
        }
    }
}

// Handle key up events
const handleKeyUp = (event) => {
    state.removeKeyPress(event)

    if (event.key === 'w' || event.key === 's') {
        clearInterval(state.playerOneSpeedLoopInterval)
        state.playerOneSpeedLoopInterval = null
        console.log('Player 1 Loop stopped')
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        clearInterval(state.playerTwoSpeedLoopInterval)
        state.playerTwoSpeedLoopInterval = null
        console.log('Player 2 Loop stopped')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    gameContainer.addEventListener('click', handleClick)
})
