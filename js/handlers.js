import { playerSelectDiv, difficultyButtonSpan, onePlayerButton, startButton,
    twoPlayerButton, easyButton, mediumButton, hardButton } from './constants.js'

import { showScreen } from './utils.js'

export const handleStartButton = () => {
    showScreen('gameplay-screen')
    twoPlayerButton.classList.remove('button-selected')
}

export const handleHowToPlayButton = () => {
    showScreen('how-to-play-screen')
}

export const handleOnePlayerButton = () => {
    // playerSelectDiv.classList.add('hidden')
    startButton.classList.add('hidden')

    difficultyButtonSpan.classList.remove('hidden')
    onePlayerButton.classList.add('button-selected')

    twoPlayerButton.classList.remove('button-selected')
}

export const handleTwoPlayerButton = () => {
    startButton.classList.remove('hidden')
    twoPlayerButton.classList.add('button-selected')
    onePlayerButton.classList.remove('button-selected')
    difficultyButtonSpan.classList.add('hidden')


}

export const handleDifficultyBackButton = () => {
    difficultyButtonSpan.classList.add('hidden')
    playerSelectDiv.classList.remove('hidden')
    startButton.classList.add('hidden')
}

export const handlePlayAgainButton = () => {
    showScreen('start-screen')
}

export const handleBackButton = () => {
    showScreen('start-screen')
}

export const handleEasyButton = () => {
    startButton.classList.remove('hidden')

    easyButton.classList.add('button-selected')
    mediumButton.classList.remove('button-selected')
    hardButton.classList.remove('button-selected')
}

export const handleMediumButton = () => {
    startButton.classList.remove('hidden')
    easyButton.classList.remove('button-selected')
    mediumButton.classList.add('button-selected')
    hardButton.classList.remove('button-selected')
}

export const handleHardButton = () => {
    startButton.classList.remove('hidden')
    easyButton.classList.remove('button-selected')
    mediumButton.classList.remove('button-selected')
    hardButton.classList.add('button-selected')
}