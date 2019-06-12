# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)
* [Description](#description)
* [Game] (#game)
* [Dependencies] (#dependencies)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Description

The Memory Game Project is a game that consists of 8 matching cards with a total of 16 cards. The player is allowed to click on each cards. A timer is displayed on the top right corner to monitor the time the player spent to finish the game. Also, a star rating is displayed on the top left corner which will depend on the player's number of moves. The 'Moves' counter can be seen just beside the star rating section. 

## Game

    * When the player clicks a card, the card will flip as an open card. 
    * If two cards are flipped and has the same symbol, the cards will stay open.
    * If two cards are flipped and does not have the same symbol, the cards will be flipped back and display nothing.
    * At the begining of the game, the player has 3-star rating. When the player took greater than or equal to 12 moves the rating will be set to 2-star, and if greater than or equal to 24 moves the rating will be set to 1-star.
    * When the player have matched all the cards, a congratulations message will appear stating the total time the player took to finish the game and the star rating.
    * The player is allowed to restart the game anytime he wishes to.

## Dependencies
    **Styles**
        * stylesheet - css/app.css
        * icons - https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css
        * font - https://fonts.googleapis.com/css?family=Coda
        * background image - ../img/geometry2.png

    **Javascript File**
        * js/app.js

