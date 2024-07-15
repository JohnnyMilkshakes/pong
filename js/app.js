// Render the game in the browser using the DOM manipulation techniques demonstrated in lecture.
// Include win/loss logic and render win/loss messages in HTML. The game you chose must have a win/lose condition.
// Include separate HTML, CSS, JavaScript, and JavaScript data files organized in an appropriate directory structure.
// Include all required features specific to your game. 
// Game-specific required features are defined in the Required Features column in the table in the Recommended Games document, or as discussed with your instructor. If you want to build a game that is not on this list, you will need to present and discuss your game’s features with the instructional team for approval.
// The game is deployed online so that the rest of the world can play it.


// define the necessary variables
// create classes that represent necessary data and methods for the paddles and ball
// will need to get the position and size of each item (or position of upper and lower bounds)
// write methods to set and get necessary data

// get the necessary html elements that will be interacted with or updated 
// gamespace = html container for entire game
// userPaddle = html element for the user paddle
// computerPaddle = html element for the computer paddle
// ball = html element for ball


class GameElement {
    constructor(htmlElement) {
        this.htmlElement = htmlElement

        const data = this.getElementData()

        this.topLeft = {
            x: data.left,
            y: data.top
        }

        this.bottomRight = {
            x: data.right,
            y: data.bottom
        }

        this.startPointTopLeft = {
            x: data.x,
            y: data.y
        }

        this.startPointBottomRight = {
            x: data.right,
            y: data.bottom
        }

        this.length = data.height
        this.width = data.width
    }

    moveUp() {
        this.topLeft.y = this.topLeft.y + this.speed
        this.bottomRight.y = this.bottomRight.y + this.speed
        this.updatePosition()

    }

    moveDown() {
        this.topLeft.y = this.topLeft.y - this.speed
        this.bottomRight.y = this.bottomRight.y - this.speed
        this.updatePosition()
    }

    moveLeft() {
        this.topLeft.x = this.topLeft.x - this.speed
        this.bottomRight.x = this.bottomRight.x - this.speed
        this.updatePosition()

    }

    moveRight() {
        this.topLeft.x = this.topLeft.x + this.speed
        this.bottomRight.x = this.bottomRight.x + this.speed
        this.updatePosition()
    }

    updatePosition() {
        this.htmlElement.style.transform = 
        `translate(${this.topLeft.x - this.startPointTopLeft.x}px, 
                   ${this.startPointTopLeft.y - this.topLeft.y}px)`
}

    getElementData() {
        return this.htmlElement.getBoundingClientRect()
    }
}



class Ball extends GameElement{
    constructor(htmlElement, speed, direction) {
        super(htmlElement)

        this.speed = speed || 1
        this.direction = {
            right: false,
            left: false,
            up: false,
            down: false
        }
    }
}

class Paddle extends GameElement {
    constructor(htmlElement, speed) {
        super(htmlElement)

        this.speed = speed || 15     
    }

}

class State {
    constructor(playerOne, playerTwo, ball) {
        this.playerOne = playerOne
        this.playerTwo = playerTwo
        this.ball = ball

        this.score = {
            playerOne: 0,
            playerTwo: 0
        }
    
        this.keysBeingPressed = {
 
        }

        // Bind event handlers to ensure 'this' context is correct
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }



     updatePlayerPosition() {
        if (this.keysBeingPressed.w) {
            this.playerOne.moveUp()
        }
    
        if (this.keysBeingPressed.s) {
            this.playerOne.moveDown()
        }
    
        if (this.keysBeingPressed.ArrowUp) {
            this.playerTwo.moveUp()
        }
    
        if (this.keysBeingPressed.ArrowDown) {
            this.playerTwo.moveDown()
        }
    }

    handleKeyDown(event) {
        console.log(event)
        this.keysBeingPressed[event.key] = true;
        this.updatePlayerPosition();
    }
    
    handleKeyUp(event) {
        this.keysBeingPressed[event.key] = false;
        this.updatePlayerPosition();
    }

    updateBallPosition() {

        if (this.ball.direction.right) {
            this.ball.moveRight();
        } else if (this.ball.direction.left) {
            this.ball.moveLeft();
        }
    
        if (this.ball.direction.up) {
            this.ball.moveUp();
        } else if (this.ball.direction.down) {
            this.ball.moveDown();
        }
    }
}



/*-------------------------------- Constants --------------------------------*/
const gameScreens = []
/*-------------------------------- Variables --------------------------------*/

/*------------------------ Cached Element References ------------------------*/
const gameContainer = document.querySelector('.game-container')


// Add screens to gameScreens array
gameScreens.push(document.querySelector('.start-screen'))
gameScreens.push(document.querySelector('.gameplay-screen'))
gameScreens.push(document.querySelector('.end-screen'))
gameScreens.push(document.querySelector('.how-to-play-screen'))

// Buttons
const startButton = document.querySelector('.start-button')
const gameButton = document.querySelector('.game')
const endButton = document.querySelector('.end')
const howToPlayButton = document.querySelector('.how-to-play-button')
const backButton = document.querySelector('.back-button')
const playAgainButton = document.querySelector('.play-again-button')

// Game Elements
const ballElement = document.querySelector('.ball')
const playerOnePaddleElement = document.querySelector('.player-1-paddle')
const playerTwoPaddleElement = document.querySelector('.player-2-paddle')
/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Functions --------------------------------*/

// I went back and forth a few times with chatGPT to come up with  
// Object.values(screen.classList).includes(screenClassNoDot)
const showScreen = (screenClassNoDot) => {
    gameScreens.forEach((screen) => {
        Object.values(screen.classList).includes(screenClassNoDot)?(
            screen.classList.remove('hidden')):(
                screen.classList.add('hidden'))
    })
}

const init = () => {
    const playerOne = new Paddle(playerOnePaddleElement)
    const playerTwo = new Paddle(playerTwoPaddleElement)
    const ball = new Ball(ballElement)
    const state = new State(playerOne, playerTwo, ball)

    state.ball.direction.up = true
    state.ball.direction.right = true

    const gameLoop = () => {
        state.updateBallPosition()
        requestAnimationFrame(gameLoop)
    }

    requestAnimationFrame(gameLoop)

    document.addEventListener('keydown', state.handleKeyDown)
    document.addEventListener('keyup', state.handleKeyUp)
}


const handleClick = (event) => {
    buttonClass = event.target.className
    if (buttonClass === 'start-button') {
        showScreen('gameplay-screen')
        init()
    }

    if (buttonClass === 'how-to-play-button') {
        showScreen(`how-to-play-screen`)
    }

    if (buttonClass === 'back-button') {
        showScreen(`start-screen`)
    }

    if (buttonClass === 'play-again-button') {
        showScreen(`start-screen`)
    }






    if (buttonClass === 'easy-button') {
        console.log('EZ')
    }
    if (buttonClass === 'medium-button') {
        console.log('MEDZ')
    }
    if (buttonClass === 'hard-button') {
        console.log('HARDZ')
    }
}


document.addEventListener('DOMContentLoaded', () => {
    gameContainer.addEventListener('click', handleClick)
    endButton.addEventListener('click', (event) => {
        showScreen('end-screen')
    })
})






















































// register handleClick to be run after the DOM content loads 
// click event required to handle game start and restart/options
// paddle control can be several options:
//     1. mouse position on screen
//     2. any key mapping
//     3. buttons on screen (dislike)

// for this game handleClick will be registered on the game container which will contain a 
// start button, once the start button is clicked it will change the display 
// -removing start button- to ask for the difficulty -easy,medium,hard<-buttons, once a difficulty 
//  is selected it runs init which starts a 3 second countdown timer and starts the game, 

// init()
// create objects from classes (new ball, new userPaddle, new computerPaddle)
// initialize state variables maybe state should be a class too

// start a loop that moves the ball
//     ball position moves right and up to begin
//     if ball y position touches the upper or lower limits of the gamespace flip directions
//     if ball x position touches the right or left paddle flip directions
//     if ball x touches user paddle speed up
//     if either paddle position moved repaint paddle with new position
//     if ball touches right or left limit of gamespace add point to correct player and reset ball position and speed
//     if either players points equal the score limit end the game by hiding the game html and showing a win or lose message and a play again button

