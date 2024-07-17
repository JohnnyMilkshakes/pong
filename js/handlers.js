import { playerSelectDiv, difficultySelectDiv, howToPlayButton, startButton,
    twoPlayerButton } from './constants.js'

import { showScreen } from './utils.js'

export const handleStartButton = () => {
    showScreen('gameplay-screen')
    twoPlayerButton.classList.remove('button-selected')
}

export const handleHowToPlayButton = () => {
    showScreen('how-to-play-screen')
}

export const handleOnePlayerButton = () => {
    playerSelectDiv.classList.add('hidden')
    difficultySelectDiv.classList.remove('hidden')

    howToPlayButton.style.marginBottom = '0px'
    twoPlayerButton.classList.remove('button-selected')
}

export const handleTwoPlayerButton = () => {
    startButton.classList.remove('hidden')
    twoPlayerButton.classList.add('button-selected')
}

export const handleDifficultyBackButton = () => {
    difficultySelectDiv.classList.add('hidden')
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
    console.log('EZ')
}

export const handleMediumButton = () => {
    startButton.classList.remove('hidden')
    console.log('MEDZ')
}

export const handleHardButton = () => {
    startButton.classList.remove('hidden')
    console.log('HARDZ')
}




