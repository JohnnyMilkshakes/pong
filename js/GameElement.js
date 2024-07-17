// GameElement.js

// Class representing a game element
export class GameElement {
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
        this.speed = 2
        this.centerY = this.getCenterY()
    }

    // Move the element up
    moveUp() {
        this.topLeft.y -= this.speed
        this.bottomRight.y -= this.speed
        this.updatePosition()
    }

    // Move the element down
    moveDown() {
        this.topLeft.y += this.speed
        this.bottomRight.y += this.speed
        this.updatePosition()
    }

    // Move the element left
    moveLeft() {
        this.topLeft.x -= this.speed
        this.bottomRight.x -= this.speed
        this.updatePosition()
    }

    // Move the element right
    moveRight() {
        this.topLeft.x += this.speed
        this.bottomRight.x += this.speed
        this.updatePosition()
    }

    // Update the element's position on the screen
    updatePosition() {
        this.htmlElement.style.transform = 
            `translate(${this.topLeft.x - this.startPointTopLeft.x}px, 
                       ${this.topLeft.y - this.startPointTopLeft.y}px)`
    }

    resetPosition() {
        this.topLeft.x = this.startPointTopLeft.x
        this.topLeft.y = this.startPointTopLeft.y
        this.bottomRight.x = this.startPointBottomRight.x
        this.bottomRight.y = this.startPointBottomRight.y
    }

    // Get the element's data
    getElementData() {
        return this.htmlElement.getBoundingClientRect()
    }

    getCenterY() {
        this.centerY = this.topLeft.y + (this.length / 2)
    }
}
