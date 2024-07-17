import { GameElement } from './GameElement.js'

// Class representing the ball
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

    flipUpDown() {
        if (this.direction.up) {
            this.setDirectionDown()
        } else {
            this.setDirectionUp() 
        }
    }

    flipRightLeft() {
        if (this.direction.right) {
            this.setDirectionLeft()
        } else {
            this.setDirectionRight()
        }
    }

    setDirectionUp() {
        this.direction.up = true
        this.direction.down = false
    }

    setDirectionDown() {
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
}
