# My game proposal 
Your choice of game.

Pseudocode for the overall gameplay. This pseudocode does not need to go into exhaustive detail but should demonstrate that you understand some of the unique challenges you will encounter while building your game.

Any additional project planning requirements specific to the game you have chosen as defined in the in the Additional Planning Requirements column of the table in the Recommended games document or as discussed with your instructor.

Choice of game: Pong

Pseudocode:

create html and css scaffolding
    html should start with a greeting message and a button to start the game
    when the user presses start use JS to change css classes to hide the starting html and show the game html.

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
        



    
    



Additional requirements: 


# Idea



# MVP user stories 



# Stretch goals 



# Ideation area
