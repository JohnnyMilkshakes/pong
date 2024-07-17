import { Ball } from './Ball.js'
import { Paddle } from './Paddle.js'
import { State } from './State.js'

import { showScreen, waitForUnpause, updatePlayerOnePosition, updatePlayerTwoPosition,
        updateBallPosition, ballCollisionDetector, checkWinner } from './utils.js'

import { gameScreens, gameContainer, ballElement, playerOnePaddleElement, playerTwoPaddleElement,
        winMessage, playerSelectDiv, difficultySelectDiv, howToPlayButton, startButton,
        twoPlayerButton } from './constants.js'

let playerOne, playerTwo, ball, state

// Initialize the game
const init = () => {
    playerOne = new Paddle(playerOnePaddleElement)
    playerTwo = new Paddle(playerTwoPaddleElement)
    ball = new Ball(ballElement)
    state = new State(playerOne, playerTwo, ball, gameScreens[1])

    console.log(playerOne)
    console.log(playerTwo)


    state.ball.direction.up = true
    state.ball.direction.right = true

    state.setGameScreenDimensions()

    // ChatGPT wrote the four let statements below to prepare the fps counter
    let fpsContainer = document.getElementById('fps')
    let lastFrameTime = performance.now()
    let frameCount = 0
    let fps = 0

    const gameLoop = async () => {

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
    if (buttonClass === 'start-button') {
        showScreen('gameplay-screen')
        twoPlayerButton.classList.remove('button-selected')
        init()
    }

    if (buttonClass === 'how-to-play-button') {
        showScreen('how-to-play-screen')
    }

    if (buttonClass === 'one-player-button') {
       playerSelectDiv.classList.add('hidden')
       difficultySelectDiv.classList.remove('hidden')

       howToPlayButton.style.marginBottom = '0px'
       twoPlayerButton.classList.remove('button-selected')
    }

    if (buttonClass === 'two-player-button') {
        startButton.classList.remove('hidden')
        twoPlayerButton.classList.add('button-selected')
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

// Handle key down events
const handleKeyDown = (event) => {
    state.setKeyPress(event)

    if (event.key === 'p') {
        state.togglePause()
    }

    if (state.pause) return

    if (event.key === 'w' || event.key === 's') {
        if (!state.playerOneSpeedLoopInterval) {
            state.playerOneSpeedLoopInterval = setInterval(() => {
                updatePlayerOnePosition()
            }, 1) // Adjust the interval time as needed
        }
    }

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

document.addEventListener('DOMContentLoaded', () => {
    gameContainer.addEventListener('click', handleClick)
})

export {playerOne, playerTwo, ball, state}