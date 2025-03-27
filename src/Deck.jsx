import { useState, useEffect } from "react";
import axios from "axios";

//function called Deck that encapsulates the logic for fetching 
//and displaying the cards from the card deck api.

//state hold data, so it will hold the card to be displayed?

//side effect of this is fetching from an API so useEffect will
//perform the fetch to get the data to put into state and display
//empty dependency array? because re-rendering should be handled
//by clicking the button?

//button to click to display card, then click same or other button for next card
//until the deck is done, then display a "that's all the cards" message

//how do I add try/catch for error handling? I need to practice using that.


const Deck = () => {
    const [card, setCard] = useState(null);
    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

    const drawCard = () => {
        console.log("Drawing a card");
    }

    useEffect(() => {

    })

    async function loadDeck() {
        const res = await axios.get(url);
    }
    loadDeck();
    //call the function?

    //how do I set the state with the card data?

    return (
        <div>
            {card}
            <button onClick={drawCard}>Draw a Card</button>
        </div>
    )
}

export default Deck;