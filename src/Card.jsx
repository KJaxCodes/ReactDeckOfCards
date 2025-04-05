const Card = ({ value = "", suit = "", image = "https://deckofcardsapi.com/static/img/back.png" }) => {
    return (
        <div className="card-display">
            {
                value && suit ?
                    <>

                        <p className="caption">"{value} OF {suit}"</p>


                    </>
                    :
                    null
            }

            {
                <img src={image} alt="a drawn card" />
            }
        </div>
    )
};

export default Card;