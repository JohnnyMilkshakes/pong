# My game proposal 
Choice of game: Pong

Pseudocode:

create html and css scaffolding
    html should start with three sections, one to display game start screen, second to display game board, third to display end screen. When the user presses start use JS to change css classes to hide the starting html and show the game html, when the game ends hide the game board and show the end screen.

Javascript:
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



        



    
    



Additional requirements: 


# Idea



# MVP user stories 



# Stretch goals 



# Ideation area
