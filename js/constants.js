// constants.js

// Cached element references and constants
export const gameScreens = [];
export const gameContainer = document.querySelector('.game-container');

// Add screens to gameScreens array
gameScreens.push(document.querySelector('.start-screen'));
gameScreens.push(document.querySelector('.gameplay-screen'));
gameScreens.push(document.querySelector('.end-screen'));
gameScreens.push(document.querySelector('.how-to-play-screen'));

// Buttons
export const endButton = document.querySelector('.end');


// Game Elements
export const ballElement = document.querySelector('.ball');
export const playerOnePaddleElement = document.querySelector('.player-1-paddle');
export const playerTwoPaddleElement = document.querySelector('.player-2-paddle');
