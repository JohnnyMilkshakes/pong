import { Ball } from './Ball.js';
import { Paddle } from './Paddle.js';
import { State } from './State.js';
import { gameScreens, gameContainer, endButton, ballElement, playerOnePaddleElement, playerTwoPaddleElement } from './constants.js';

let playerOne, playerTwo, ball, state;

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
    playerOne = new Paddle(playerOnePaddleElement);
    playerTwo = new Paddle(playerTwoPaddleElement);
    ball = new Ball(ballElement);
    state = new State(playerOne, playerTwo, ball, gameScreens[1]);

    state.ball.direction.up = true;
    state.ball.direction.right = true;

    state.setGameScreenDimensions();
    console.log(playerOne);

    const gameLoop = () => {
        ballCollisionDetector()
        updateBallPosition();
        requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
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

// Update the position of the players
const updatePlayerPosition = () => {
    if (state.keysBeingPressed.w) {
        if (playerOne.topLeft.y <= state.gameplayArea.upperBound) return;
        console.log('upperbound : ' + state.gameplayArea.upperBound)
        console.log('top : ' + playerOne.topLeft.y)
        console.log('bottom : ' + playerOne.bottomRight.y)

        playerOne.moveUp();
    }

    if (state.keysBeingPressed.s) {
        if (playerOne.bottomRight.y >= state.gameplayArea.lowerBound) return;
        playerOne.moveDown();
    }

    if (state.keysBeingPressed.ArrowUp) {
        if (playerTwo.topLeft.y <= state.gameplayArea.upperBound) return;
        playerTwo.moveUp();
    }

    if (state.keysBeingPressed.ArrowDown) {
        if (playerTwo.bottomRight.y >= state.gameplayArea.lowerBound) return;
        playerTwo.moveDown();
    }
}



// Update the position of the ball
const updateBallPosition = () => {

    if (ball.direction.right) {
        ball.moveRight();
    } else if (ball.direction.left) {
        ball.moveLeft();
    }

    if (ball.direction.up) {
        ball.moveUp();
    } else if (ball.direction.down) {
        ball.moveDown();
    }
}

const ballCollisionDetector = () => {
    if (ball.topLeft.x <= playerOne.bottomRight.x &&
        ball.topLeft.y <= playerOne.bottomRight.y &&
        ball.bottomRight.y >= playerOne.topLeft.y) {
            // if true player 1 paddle was touched, switch directions
        ball.direction.right = true
        ball.direction.left = false
    }

    if (ball.bottomRight.x >= playerTwo.topLeft.x &&
        ball.bottomRight.y >= playerTwo.topLeft.y &&
        ball.topLeft.y <= playerTwo.bottomRight.y) {
            // if true player 2 paddle was touched, switch directions
        ball.direction.right = false
        ball.direction.left = true
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
        ball.resetPosition()        
        
    // if the ball touches the left side net
    } else if (ball.topLeft.x <= state.gameplayArea.leftBound) {
        ball.resetPosition()        
    }
}




// Handle key down events
const handleKeyDown = (event) => {
    console.log(event);
    state.setKeyPress(event);

    if (!state.playerSpeedLoopInterval) {  // Prevent starting multiple intervals
        state.playerSpeedLoopInterval = setInterval(() => {
            // console.log('Loop running');
            updatePlayerPosition();
            // Your loop logic here
        }, 1); // Adjust the interval time as needed
    }
}

// Handle key up events
const handleKeyUp = (event) => {
    state.removeKeyPress(event)
    if (state.playerSpeedLoopInterval) {
        clearInterval(state.playerSpeedLoopInterval);
        state.playerSpeedLoopInterval = null;
        console.log('Loop stopped');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    gameContainer.addEventListener('click', handleClick);
    endButton.addEventListener('click', () => {
        showScreen('end-screen');
    });
});
