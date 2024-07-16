import { Ball } from './Ball.js';
import { Paddle } from './Paddle.js';
import { State } from './State.js';
import { gameScreens, gameContainer, endButton, ballElement, playerOnePaddleElement, playerTwoPaddleElement } from './constants.js';

// Show specific screen based on the class name
const showScreen = (screenClassNoDot) => {
    gameScreens.forEach((screen) => {
        Object.values(screen.classList).includes(screenClassNoDot)
            ? screen.classList.remove('hidden')
            : screen.classList.add('hidden');
    });
};

// Initialize the game
const init = () => {
    const playerOne = new Paddle(playerOnePaddleElement);
    const playerTwo = new Paddle(playerTwoPaddleElement);
    const ball = new Ball(ballElement);
    const state = new State(playerOne, playerTwo, ball, gameScreens[1]);

    state.ball.direction.up = true;
    state.ball.direction.right = true;

    state.setGameScreenDimensions();
    console.log(playerOne);

    const gameLoop = () => {
        state.updateBallPosition();
        requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);

    document.addEventListener('keydown', state.handleKeyDown);
    document.addEventListener('keyup', state.handleKeyUp);
};

// Handle button clicks
const handleClick = (event) => {
    const buttonClass = event.target.className;
    if (buttonClass === 'start-button') {
        showScreen('gameplay-screen');
        init();
    }

    if (buttonClass === 'how-to-play-button') {
        showScreen('how-to-play-screen');
    }

    if (buttonClass === 'back-button') {
        showScreen('start-screen');
    }

    if (buttonClass === 'play-again-button') {
        showScreen('start-screen');
    }

    if (buttonClass === 'easy-button') {
        console.log('EZ');
    }
    if (buttonClass === 'medium-button') {
        console.log('MEDZ');
    }
    if (buttonClass === 'hard-button') {
        console.log('HARDZ');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    gameContainer.addEventListener('click', handleClick);
    endButton.addEventListener('click', () => {
        showScreen('end-screen');
    });
});
