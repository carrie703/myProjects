import React from "react";

//rendering single card
const Card = ({ card, index, isFlipped, clickhandler }) => {


  return (
    <div className={`card ${isFlipped ? 'active' : ''}`} onClick={() => clickhandler(index)}>
      <img src={card.img} alt={card.id} />
    </div>
  );
};

export default Card;
