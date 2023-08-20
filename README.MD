## the following project is the memory card project for the Odin Project website.

![screen Shot Of the game](Game.jpg)


### Created a game that's accessible at

https://zingy-rugelach-5bb99e.netlify.app/

I implemented some basic functionality that includes

Getting objects with images  from an API.

https://rickandmortyapi.com/

I'm using this array of objects in a **Deck** component that displays 6 cards using the images from the objects.

Clicking on the cards shuffles them using the Fisher-Yates algorithm (I  found this algorithm on free code camp). That is located in the helpers folder.

Clicking the same card twice shows a Modal with a  **Game-over message** This modal has a restart button.

When you restart, a new API request is made and the array of objects is shuffled.

If all the cards are clicked without repetition, a Modal appears. The Modal displays a congratulatory message and a button to proceed to the next level. The app then generates a new set of cards.

 The API call accepts an array of numbers representing character IDs for data retrieval. I use a function to generate a random array of numbers, which I then employ while fetching data to get random characters for each fetch request. The 'randomNumbersArray' function is found in the helpers folder.

 I display the level, current and maximum scores on the header component.

UI is responsive.

I used the use-sound hook to add sounds for card clicks and shuffling, as well as a main theme to play during the game. 

The main music is intended to stop when the modal is shown, but if it plays for a while, it does not stop.

I’m using the react-card-flip hook to flip cards on click
