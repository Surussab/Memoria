//Class to manage board actions

//class to manage board actions
class BoardManager {

    //Dependencies
    cardManager; //object to manipulate cards inside the board

    //DOM elements
    node; //The DOM element refering to the board

    //Numbers
    numImgs; //Number of different images in the library
    curNumCards; //Current number of cards in the board

    // Constructor
    constructor(id, numImgs, cardManager) {
        //get the board node using the received id
        this.node = document.getElementById(id);
        //Set the other properties
        this.numImgs = numImgs;
        this.cardManager = cardManager;
    }

    //Add the received number of cards to the board
    fill(numberCards) {
        // Test if there isn't enough images
        if (numberCards > 2 * this.numImgs) {
            // Show error message
            console.error('Error: Not enough images for ${numberCards}Cards.');
            // Adjust the number of cards and continue the game
            numberCards = 2 * this.numImgs;
        }

        // numberCards should be an integer
        numberCards=parseInt(numberCards);
        // Setting curNumber
        this.curNumCards = numberCards;

        this.clear(); // Reset the board
        this.genRamdonList(numberCards).forEach((number)=>
        // Place one card in the board based in the card number
        this.addCard(this.cardManager.gen(number))
        )

        this.adjustCSS();
    }



    //Add one card to the board
    addCard(card) {
        this.node.appendChild(card); // Append card to the board

    }

    //Add the received number of cards to the board
    // Adjust the CSS to fit all cards in the board
    adjustCSS(){
        // Calculating the number of columns
        let cols = Math.sqrt(this.curNumCards);
        // Calculating the card size
        let size = (100/cols - 1);
        // Turning the size into CSS a string
        size+='vmin';


        //Setting the Css properties
        document.documentElement.style.setProperty("--numCols", cols);
        document.documentElement.style.setProperty("--size", size);
    }

    //Add one card to the board
    // Clear the board removing all cards
    clear() {
        this.node.innerHTML = "";
    }
    
    // Generate random list
    genRamdonList(size){
        const list = Array(size/2).fill().map((_,i)=>i+1);
        return [...list,...list].sort(()=>Math.random()-.5);
    }
    // Check if all cards are found
    check(){
        // Get all found cards
        let flipped = document.getElementsByClassName('matched');
        // Return if it is equal the expected number of cards
        return flipped.length >= this.curNumCards;
    }

}