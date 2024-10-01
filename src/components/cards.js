import React, { useEffect, useState } from "react";
import { CARDDATA } from "./cardInfo";
import Card from "./card";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

//redering the collection of cards by mapping over the card data
function Game() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    resetGame(); //shuffle card
  }, []);

  useEffect(() => {
    if (matched.length === CARDDATA.length) {
      console.log("Congratulations! You have completed the game.");
      setGameCompleted(true);
      setShowAlert(true);
    }
  }, [matched]);

  const clickhandler = (index) => {
    if (
      flipped.length === 2 ||
      matched.includes(index) ||
      flipped.includes(index)
    )
      return;

    setFlipped((prev) => [...prev, index]);

    // If one card is already flipped, check for a match
    if (flipped.length === 1) {
      const firstCard = flipped[0];
      const secondCard = index;

      if (cards[firstCard].id === cards[secondCard].id) {
        setMatched((prev) => [...prev, firstCard, secondCard]);
        setTimeout(() => {
          setFlipped([]);
        }, 300);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 500);
      }
    }
  };

  const resetGame = () => {
    const shuffledCards = CARDDATA.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setShowAlert(false);
  }

  const handlePlayAgain = () => {
    resetGame();
  }

  return (
    <div className="cardsContainer">
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          index={index}
          isFlipped={flipped.includes(index) || matched.includes(index)}
          clickhandler={clickhandler}
        />
      ))}

      {/* Bootstrap Alert for game completion */}
      {showAlert && (
        <Alert show={showAlert} variant="success">
          <Alert.Heading>Congratulations!</Alert.Heading>
          <p>You have matched all the cards!</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={handlePlayAgain} variant="outline-success">
              Play Again
            </Button>
          </div>
        </Alert>
      )}

    </div>
  );
}

export default Game;
