import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.divLand}>
      <h1>¡Bienvenidos a la WikiDogs de HENRY!</h1>
      <div className={style.p}>
        <h3>
          Una página diseñada para consultar la existencia de distintas razas
          caninas! Con la posibilidad de filtrar por sus temperamentos, ordenar
          por su peso o alfabéticamente, crear tus propias razas con distintas
          cualidades y averiguar todo lo que necesites sobre tus animales
          favoritos!
        </h3>
      </div>
      <div>
        <Link to="/home">
          <button className={style.button}>Ingresar</button>
        </Link>
      </div>
    </div>
  );
}
