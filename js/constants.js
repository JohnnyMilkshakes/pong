// Cached element references and constants
export const gameScreens = []
export const gameContainer = document.querySelector('.game-container')
export const playerOneScore = document.querySelector('.player-1-score-value')
export const playerTwoScore = document.querySelector('.player-2-score-value')
export const endScreenPlayerOneScore = document.querySelector('.final-player-1-score-value')
export const endScreenPlayerTwoScore = document.querySelector('.final-player-2-score-value')
export const winMessage = document.querySelector('.win-message')
export const playerSelectDiv = document.querySelector('.player-select')
export const difficultySelectDiv = document.querySelector('.difficulty-select')

// Buttons
export const howToPlayButton = document.querySelector('.how-to-play-button')
export const startButton = document.querySelector('.start-button')
export const twoPlayerButton = document.querySelector('.two-player-button')

// Add screens to gameScreens array
gameScreens.push(document.querySelector('.start-screen'))
gameScreens.push(document.querySelector('.gameplay-screen'))
gameScreens.push(document.querySelector('.end-screen'))
gameScreens.push(document.querySelector('.how-to-play-screen'))

// Game Elements
export const ballElement = document.querySelector('.ball')
export const playerOnePaddleElement = document.querySelector('.player-1-paddle')
export const playerTwoPaddleElement = document.querySelector('.player-2-paddle')