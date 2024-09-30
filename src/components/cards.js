import React, { useEffect, useState } from "react";
import { CARDDATA } from "./cardInfo";
import Card from "./card";

//redering the collection of cards by mapping over the card data
function Game() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  useEffect(() => {
    const shuffledCards = CARDDATA.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, []);

  const clickhandler = (index) => {
    // Prevent clicking if two cards are already flipped
    if (flipped.length >= 2) return;

    // Allow flipping if the card is not already flipped
    if (!flipped.includes(index)) {
      setFlipped((prev) => [...prev, index]);
    }

    // If one card is already flipped, check for a match
    if (flipped.length === 1) {
      const firstCard = flipped[0];
      const secondCard = index;

      if (cards[firstCard].id === cards[secondCard].id) {
        console.log("Matched found!");
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="cardsContainer">
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          index={index}
          isFlipped={flipped.includes(index)} // Pass whether the card is flipped
          clickhandler={clickhandler}
        />
      ))}
    </div>
  );
}

export default Game;
