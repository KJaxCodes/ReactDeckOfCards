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
    const [currentDeck, setCurrentDeck] = useState({ deckId: "", remaining: 0 })
    const loadUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";


    const drawCard = async () => {
        console.log("Drawing a card");
        //build the drawUrl, grab the deck Id variable from currentDeck state
        const drawUrl = `https://deckofcardsapi.com/api/deck/${currentDeck.deckId}/draw/?count=1`;
        //send the request to get One card
        const { data } = await axios.get(drawUrl);
        //destructured
        const { image, suit, value } = data.cards[0]
        //destructure the values in the api to use more succinctly 
        console.log(data.cards[0]);
        setCard({ image, suit, value });
    }



    const loadDeck = async () => {
        console.log("Getting a brand new deck");
        const { data } = await axios.get(loadUrl);
        //destructured
        const { deck_id: deckId, remaining } = data;
        //destructure the deck_id key and reassign it to deckID
        setCurrentDeck({ deckId, remaining })
        //using shorthand notation in lieu of deckId: deckId, remaining: remaining
        console.log(deckId);
    }

    //how do I set the state with the card data?

    //    useEffect(() => {})

    // useEffect(() => {
    //     if (card) {
    //         console.log("new card")
    //         console.log(card);
    //     }
    // }, [card])

    // useEffect(() => {
    //     loadDeck();
    // }, []);

    useEffect(() => {
        // console.log(currentDeck.remaining)
        if (currentDeck.remaining === 0) {
            console.log("Error: no cards remaining!");
            alert("Error: no cards remaining!")
        }
    }, [currentDeck]);

    return (
        <div>
            {
                card ?
                    <div className="card-display">
                        <p>{card.value}</p>
                        <p>{card.suit}</p>
                        {
                            <img src={card.image} alt="" />
                        }
                    </div>
                    :
                    null
            }

            <button onClick={loadDeck}>Get a Deck</button>
            <button onClick={drawCard}>Draw a Card</button>
        </div>
    )
}

export default Deck;


