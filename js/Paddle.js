// Paddle.js

import { GameElement } from './GameElement.js';

// Class representing the paddle
export class Paddle extends GameElement {
    constructor(htmlElement, speed) {
        super(htmlElement);

        this.speed = speed || 1;
    }
}
