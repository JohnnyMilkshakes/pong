import { GameElement } from './GameElement.js'
import { state } from './app.js'


export class Ball extends GameElement {
    constructor(htmlElement, speed, direction) {
        super(htmlElement)

        this.direction = direction || {
            right: false,
            left: false,
            up: false,
            down: false
        };
    }

    resetBall() {
        this.resetPosition()
        this.speed = 2
    }

    flipVerticalDirection() {
        if (this.direction.up) {
            this.setDirectionDown()
        } else {
            this.setDirectionUp() 
        }
    }

    flipHorizontalDirection() {

        console.log('this running too often?')

        if (this.direction.right && state.lastTouch === 'Player One') {
            console.log('set Left')
            this.setDirectionLeft()
        } else if (this.direction.left && state.lastTouch === 'Player Two') {
            console.log('set Right')
            this.setDirectionRight()
        }
    }

    setDirectionUp() {
        console.log('set UP')
        this.direction.up = true
        this.direction.down = false
    }

    setDirectionDown() {
        console.log('set Down')

        this.direction.up = false
        this.direction.down = true
    }

    setDirectionRight() {
        this.direction.right = true
        this.direction.left = false
    }

    setDirectionLeft() {
        this.direction.right = false
        this.direction.left = true
    }

    leftPaddleCollision(paddle) {

        console.log(state.lastTouch)

        if (state.lastTouch === "Player Two") {
            paddle.getCenterY()
            this.getCenterY()
            this.flipHorizontalDirection()

            if (this.centerY < (paddle.centerY - 25)) {
                this.setDirectionUp()
                this.speed = this.speed + 2

            } else if (this.centerY > (paddle.centerY + 25)) {
                this.setDirectionDown()
                this.speed = this.speed + 2

            } else if (this.speed > 5){
                this.speed = this.speed - 1
            }
        }
    }

    rightPaddleCollision(paddle) {

        if (state.lastTouch === "Player One") {

            paddle.getCenterY()
            this.getCenterY()

            this.flipHorizontalDirection()
            
            if (this.centerY < (paddle.centerY - 25)) {
                this.setDirectionUp()
                this.speed = this.speed + 2

            } else if (this.centerY > (paddle.centerY + 25)) {
                this.setDirectionDown()
                this.speed = this.speed + 2

            } else if (this.speed > 5) {
                this.speed = this.speed - 1
            }
        }
    }
}
