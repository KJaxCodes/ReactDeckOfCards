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
    const [currentDeck, setCurrentDeck] = useState({ deckId: "", remaining: -1 }) //-1 used as placeholder because no remaining cards yet since no deck set
    const loadUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";


    const drawCard = async () => {
        try {
            console.log("Drawing a card");
            //build the drawUrl, grab the deck Id variable from currentDeck state
            const drawUrl = `https://deckofcardsapi.com/api/deck/${currentDeck.deckId}/draw/?count=1`;
            //send the request to get One card
            const { data } = await axios.get(drawUrl);
            //destructured
            const { remaining } = data;
            const { image, suit, value } = data.cards[0];
            //destructure the values in the api to use more succinctly 
            console.log(data.cards[0]);
            setCard({ image, suit, value });
            setCurrentDeck(state => {
                return { ...state, remaining }
                //copy over the previous state so the deckId remains, only update the remaining count
            })
        } catch (error) {
            alert("Error: no cards remaining! Shuffle or Get a New Deck!");
        }
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

    const handleShuffle = async () => {
        console.log("reshuffle");
        const reshuffleUrl = `https://deckofcardsapi.com/api/deck/${currentDeck.deckId}/shuffle/`

        const { data } = await axios.get(reshuffleUrl);
        const { deck_id: deckId, remaining } = data;
        setCard(null);
        setCurrentDeck({ deckId, remaining });
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
    //     console.log("This runs when the component initially loads")
    //     loadDeck(); // promise which will resovle, but will not block the execution of the next code
    // }, []);

    useEffect(() => {
        // console.log(currentDeck.remaining)
        console.log("This runs after the current deck state changes")
        console.log(currentDeck)
        // if (currentDeck.remaining === 0) {
        //     console.log("Error: no cards remaining!");
        //     alert("Error: no cards remaining!")
        // }
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
            <button onClick={handleShuffle}>Shuffle the Deck</button>
        </div>
    )
}

export default Deck;


