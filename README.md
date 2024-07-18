
## Pong:
The game of Pong is a classic arcade video game that simulates table tennis. This is a vanilla JS implementation without using the canvas API.


#### Features:

* Single player mode 
* Two player mode
* Pause by pressing "p"

#### How To Play:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Visit: https://main--pong-shakes.netlify.app/

* Use W and S to move the left paddle up and down
* Use the arrow keys to move the right paddle up and down
* If the ball touches the left or right edge of the playing board,
a point is awarded to the opposite side.
* Ball will reset and game continues until score limit is reached

![Pong Start Screen](./assets/main-menu.png)

```
.
├── README.md
├── css
│   └── style.css
├── index.html
└── js
    ├── Ball.js
    ├── GameElement.js
    ├── Paddle.js
    ├── State.js
    ├── app.js
    ├── constants.js
    ├── handlers.js
    └── utils.js
```

