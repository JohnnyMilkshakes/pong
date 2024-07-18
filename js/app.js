import { Ball } from './Ball.js'
import { Paddle } from './Paddle.js'
import { State } from './State.js'

import { showScreen, waitForUnpause, updatePlayerOnePosition, updatePlayerTwoPosition,
        updateBallPosition, ballCollisionDetector, checkWinner } from './utils.js'

import { gameScreens, gameContainer, ballElement, playerOnePaddleElement, playerTwoPaddleElement,
        winMessage } from './constants.js'

import { handleStartButton, handleHowToPlayButton, handleOnePlayerButton,
        handleTwoPlayerButton, handleDifficultyBackButton, handlePlayAgainButton, 
        handleBackButton, handleEasyButton, handleMediumButton, handleHardButton
 } from './handlers.js'

 import { options } from './handlers.js'

let playerOne, playerTwo, ball, state

// Initialize the game
const init = () => {
    playerOne = new Paddle(playerOnePaddleElement)
    playerTwo = new Paddle(playerTwoPaddleElement)
    ball = new Ball(ballElement)
    state = new State(playerOne, playerTwo, ball, gameScreens[1])

    if (options.onePlayer) {
        playerTwo.isComputer = true
        if(options.easy) playerTwo.speed = 4
        if(options.medium) playerTwo.speed = 5
        if(options.hard) playerTwo.speed = 10

    }
    state.ball.direction.up = true
    state.ball.direction.right = true
    state.lastTouch = "Player One"

    state.setGameScreenDimensions()

    // ChatGPT wrote the four let statements below to prepare the fps counter
    let fpsContainer = document.getElementById('fps')
    let lastFrameTime = performance.now()
    let frameCount = 0
    let fps = 0

    const gameLoop = async () => {
        // state.setGameScreenDimensions()

        // ChatGPT wrote the code below to implement the fps counter
        let now = performance.now()
        frameCount++
        let deltaTime = now - lastFrameTime

        if (deltaTime >= 1000) {
            fps = frameCount
            frameCount = 0
            lastFrameTime = now
            fpsContainer.textContent = `FPS: ${fps}`
        }// ChatGPT wrote the code above, the rest below is me

        if (playerTwo.isComputer) aiBrain()

        ballCollisionDetector()
        updateBallPosition()
        if(checkWinner()) {
            state.setWinner()
            winMessage.innerText = `${state.winner} Wins!`
            showScreen('end-screen')
            return
        }

        if (state.pause) {

            await waitForUnpause() // ChatGPT helped me with async and await
            requestAnimationFrame(gameLoop)

        } else {
            requestAnimationFrame(gameLoop)
        }
    }

    requestAnimationFrame(gameLoop)

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
}

// Handle button clicks
const handleClick = (event) => {
    const buttonClass = event.target.className
    const handlers = {
        'start-button': () => { handleStartButton(); init() },
        'how-to-play-button': handleHowToPlayButton,
        'one-player-button': handleOnePlayerButton,
        'two-player-button': handleTwoPlayerButton,
        'difficulty-back-button': handleDifficultyBackButton,
        'play-again-button': handlePlayAgainButton,
        'back-button': handleBackButton,
        'easy-button': handleEasyButton,
        'medium-button': handleMediumButton,
        'hard-button': handleHardButton
    }

    if (handlers[buttonClass]) handlers[buttonClass]()

    console.log(options)
}

// Handle key down events
const handleKeyDown = (event) => {
    state.setKeyPress(event)

    if (event.key === 'p') state.togglePause()
    
    if (state.pause) return

    if (event.key === 'w' || event.key === 's') {
        if (!state.playerOneSpeedLoopInterval) {
            state.playerOneSpeedLoopInterval = setInterval(() => {
                updatePlayerOnePosition()
            }, 1) // Adjust the interval time as needed
        }
    }

    if (playerTwo.isComputer) return
    
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        if (!state.playerTwoSpeedLoopInterval) {
            state.playerTwoSpeedLoopInterval = setInterval(() => {
                updatePlayerTwoPosition()
            }, 1) // Adjust the interval time as needed
        }
    }
}

// Handle key up events
const handleKeyUp = (event) => {
    state.removeKeyPress(event)

    if (event.key === 'w' || event.key === 's') {
        clearInterval(state.playerOneSpeedLoopInterval)
        state.playerOneSpeedLoopInterval = null
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        clearInterval(state.playerTwoSpeedLoopInterval)
        state.playerTwoSpeedLoopInterval = null
    }
}


const aiBrain = () => {
    if(ball.getCenterY() < playerTwo.getCenterY()) {
        if (playerTwo.topLeft.y > state.gameplayArea.upperBound) {
            playerTwo.moveUp()
        }
    }


    if(ball.getCenterY() > playerTwo.getCenterY()) {
        if (playerTwo.bottomRight.y < state.gameplayArea.lowerBound) {
            playerTwo.moveDown()
        }

    }


}

document.addEventListener('DOMContentLoaded', () => {
    gameContainer.addEventListener('click', handleClick)
})

export {playerOne, playerTwo, ball, state}