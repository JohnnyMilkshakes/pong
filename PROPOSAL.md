# Game Description
## Pong:
The game of Pong is a classic arcade video game that simulates table tennis. Here’s a detailed description of how it works:

### Basic Elements 

#### Paddles:

* There are two paddles, one on the left side and one on the right side of the screen.
Each paddle is controlled by a player. In a single-player mode, one paddle is controlled by the player and the other by the computer.
Paddles move up and down to intercept the ball.

#### Ball:

* The ball is a small square that moves across the screen.
It bounces off the top and bottom edges of the screen.
The ball changes direction when it hits a paddle.

#### Playing Field:

* The field is a rectangular area bounded by the screen edges.
There is a vertical center line dividing the field into two halves.

#### Score:

* Points are scored when the opponent fails to return the ball.
The game keeps track of each player's score.

### Game Mechanics

#### Starting the Game:

* The game begins with the ball placed in the center of the screen.
The ball moves in a random direction at the start.

#### Movement:

* The player moves their paddle up or down using keyboard keys (e.g., W/S or Arrow keys) or a joystick.
The computer-controlled paddle moves automatically, often programmed to follow the ball with varying difficulty.

#### Ball Dynamics:

* The ball moves at a constant speed but changes direction upon collision.
When the ball hits a paddle, it reflects and continues moving in the opposite direction.
If the ball hits the top or bottom of the screen, it bounces back.

#### Scoring:

* If the ball passes a paddle and touches the edge of the screen behind it, the opponent scores a point.
After a point is scored, the ball is reset to the center and the game resumes.

#### Winning the Game:

* The game continues until a player reaches a predetermined score.
The first player to reach the score limit wins the game.

### Additional Features

#### Speed Variation:

* The ball speed can increase over time or after each hit to make the game more challenging.

#### Angle Variation:

* The angle at which the ball bounces off the paddle can vary depending on where it hits the paddle. For example, hitting the paddle closer to the edge might reflect the ball at a sharper angle.

#### Player Interface:

* A simple interface shows the score, player names.
Pong is a straightforward yet engaging game that emphasizes quick reflexes and simple mechanics. Its simplicity has made it a timeless classic in the history of video games.




## Technologies Used

Vanilla HTML, CSS, Javascript

Avoid using canvas if possible



## MVP User Stories

* As a user, I want to see the game instructions so that I understand how to play and what the rules are.

* As a user, I want to start a new game of Pong with a delay timer so I am ready when it starts.

* As a user, I want to control the paddle with my keyboard so that I can move it up and down to hit the ball.

* As a user, I want the ball to bounce off the paddles and walls so that the game feels realistic and challenging.

* As a user, I want the game to keep score so that I can see who is winning.

* As a user, I want the ball to reset after a point is scored so that the game can continue smoothly.

* As a user, I want to see a game over screen with my score so that I know when the game has ended.

* As a user, I want to restart the game easily after it ends so that I can play again quickly.

# Stretch goals 
* As a user, I want to hear sound effects when the ball hits a paddle or the walls so that the game is more engaging.

* As a user, I want to adjust the difficulty level of the computer opponent so that the game can match my skill level.

* As a user, I want to pause and resume the game so that I can take breaks when needed.

* As a user, I want to view my highest score so that I can track my progress over time.


## Pseudocode:
```
create html and css scaffolding
    html should start with three sections, one to display game start screen, second to display game board, third to display end screen. When the user presses start use JS to change css classes to hide the starting html and show the game html, when the game ends hide the game board and show the end screen.

Javascript
    define the necessary variables
        create classes that represent necessary data and methods for the paddles and ball
        will need to get the position and size of each item (or position of upper and lower bounds)
        write methods to set and get necessary data

    get the necessary html elements that will be interacted with or updated 
        gamespace = html container for entire game
        userPaddle = html element for the user paddle
        computerPaddle = html element for the computer paddle
        ball = html element for ball

    register handleClick to be run after the DOM content loads 
        click event required to handle game start and restart/options
        paddle control can be several options:
            1. mouse position on screen
            2. any key mapping
            3. buttons on screen (dislike)

        for this game handleClick will be registered on the game container which will contain a start button, once the start button is clicked it will change the display -removing start button- to ask for the difficulty -easy,medium,hard<-buttons  , once a difficulty is selected it runs init which starts a 3 second countdown timer and starts the game, 

    init()
        create objects from classes (new ball, new userPaddle, new computerPaddle)
        initialize state variables maybe state should be a class too

        start a loop that moves the ball
            ball position moves right and up to begin
            if ball y position touches the upper or lower limits of the gamespace flip directions
            if ball x position touches the right or left paddle flip directions
            if ball x touches user paddle speed up
            if either paddle position moved repaint paddle with new position
            if ball touches right or left limit of gamespace add point to correct player and reset ball position and speed
            if either players points equal the score limit end the game by hiding the game html and showing a win or lose message and a play again button
```
