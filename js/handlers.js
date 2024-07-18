import { playerSelectDiv, difficultyButtonSpan, onePlayerButton, startButton,
    twoPlayerButton, easyButton, mediumButton, hardButton } from './constants.js'

import { showScreen } from './utils.js'

import { Options } from './Options.js'


export const options = new Options()


console.log(options)
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

    options.onePlayer = true
    options.twoPlayer = false




}

export const handleTwoPlayerButton = () => {
    options.onePlayer = false
    options.twoPlayer = true

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
    options.easy = true
    options.medium = false
    options.hard = false
}

export const handleMediumButton = () => {
    startButton.classList.remove('hidden')
    easyButton.classList.remove('button-selected')
    mediumButton.classList.add('button-selected')
    hardButton.classList.remove('button-selected')
    options.easy = false
    options.medium = true
    options.hard = false
}

export const handleHardButton = () => {
    startButton.classList.remove('hidden')
    easyButton.classList.remove('button-selected')
    mediumButton.classList.remove('button-selected')
    hardButton.classList.add('button-selected')
    options.easy = false
    options.medium = false
    options.hard = true
}