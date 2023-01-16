import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cleanDog, getDetail } from "../../actions";
import style from "./Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id)); //accedo al id de ese perro
    return function () {
      dispatch(cleanDog()); //cuando sale del detail limpia el mismo
    };
  }, [props.match.params.id, dispatch]);

  const dogDetail = useSelector((state) => state.detail); //traigo el estado detail del reducer
  return (
    <div className={style.divDet}>
      <div>
        <Link to="/home">
          <button className={style.button}>Volver</button>
        </Link>
      </div>
      {dogDetail.length > 0 ? (
        <div className={style.detailText}>
          <h1>{dogDetail[0].name}</h1>
          <div className={style.info}>
            <p>
              Altura Promedio:
              <br />
              {dogDetail[0].height} cm
            </p>
            <p>
              Peso Promedio:
              <br /> {dogDetail[0].weight} kg
            </p>
            <p>
              Años de vida:
              <br />
              {dogDetail[0].life_span}
            </p>
          </div>
          <h3>Temperamentos: {dogDetail[0].temperament}</h3>
          <img
            src={dogDetail[0].image}
            alt="img"
            className={style.detailPhoto}
          ></img>
        </div>
      ) : (
        <div className={style.loadingDet}>
          <h3>Loading...</h3>
          <p>¡Estamos trabajando para encontrar la raza!</p>
          <p>En caso de no cargar, corrobore que exista.</p>
          <img
            src="https://media.tenor.com/nsf75akuSc4AAAAC/cat-laptop.gif"
            alt="loading"
            width="500px"
          ></img>
        </div>
      )}
    </div>
  );
}
