import React from "react";
import style from "./Card.module.css";

const Card = ({ image, name, temperament, weight }) => {
  return (
    <div className={style.card}>
      <div className={style.detail}>
        <h2>{name}</h2>
        <p>Temperamentos: {temperament}</p>
        <p>Peso Promedio: {weight} kg</p>
      </div>
      <img
        src={image}
        className={style.imgCard}
        alt="img"
        width="250px"
        height="175px"
      />
    </div>
  );
};

export default Card;
