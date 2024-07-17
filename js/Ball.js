import { GameElement } from './GameElement.js'

// Class representing the ball
export class Ball extends GameElement {
    constructor(htmlElement, speed, direction) {
        super(htmlElement)

        this.speed = speed || 2
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
}
