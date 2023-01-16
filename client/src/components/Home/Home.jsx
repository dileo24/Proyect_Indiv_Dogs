import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDogs,
  filterDogsByTemps,
  getTemperaments,
  filterApi,
  orderWeight,
  orderAlfab,
} from "../../actions";
import Card from "../Card/Card";
import Paginated from "../Paginated/Paginated";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs); //trae del reducer el state dogs con todas las razas a allDogs
  const temperaments = useSelector((state) => state.temperaments);

  const [order, setOrder] = useState(""); //estado local vacío para el ordenamiento del peso
  const [currentPage, setCurrentPage] = useState(1); //guardar en un estado local la página actual y una cte que me setee la misma(arranca en 1, la 1ra)
  const [dogsPerPage, setDogsPerPage] = useState(8); //quiero 8 razas por página
  const indexOfLastDog = currentPage * dogsPerPage; //en un principio va a ser 8
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 0
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); //toma solamente entre el índice del prim y el ult

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handlerClick = (e) => {
    e.preventDefault();
    dispatch(getDogs());
  };

  const handlerFilterByTemps = (e) => {
    e.preventDefault();
    dispatch(filterDogsByTemps(e.target.value)); //e.target.value es lo que viene del select, el payload
    setCurrentPage(1);
  };

  const handlerFilterApi = (e) => {
    e.preventDefault();
    dispatch(filterApi(e.target.value));
    setCurrentPage(1);
  };

  const handlerOrderWeight = (e) => {
    e.preventDefault();
    dispatch(orderWeight(e.target.value));
    setCurrentPage(1); //cuando hago el ordenamiento seteo para que arranque en la prim página
    setOrder(`Ordenado ${e.target.value}`); //cuando seteo esta página, me modifica el estado local y lo modifica
  };

  const handlerOrderAlfab = (e) => {
    e.preventDefault();
    dispatch(orderAlfab(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };

  return (
    <div className={style.div}>
      <button onClick={(e) => handlerClick(e)} className={style.b}>
        Volver a cargar TODOS los perros
      </button>
      {allDogs.length > 0 ? (
        <div>
          <div className={style.SearchLink}>
            <SearchBar setCurrentPage={setCurrentPage} allDogs={allDogs} />
            <Link to="/dog">
              {" "}
              <button className={style.b}>Crear raza de perros</button>
            </Link>
          </div>
          <div className={style.filtros}>
            <select onChange={(e) => handlerOrderAlfab(e)} className={style.b}>
              <option hidden>Ordenar alfabéticamente...</option>
              <option value="AZ">Orden Alfabético A-Z</option>
              <option value="ZA">Orden Alfabético Z-A</option>
            </select>
            <select onChange={(e) => handlerOrderWeight(e)} className={style.b}>
              <option hidden>Orden por peso...</option>
              <option value="asc">Peso(menor a mayor)</option>
              <option value="desc">Peso(mayor a menor)</option>
            </select>
            <select
              onChange={(e) => handlerFilterByTemps(e)}
              className={style.b}
            >
              <option hidden>Filtrar por temperamento...</option>
              <option value="all">Todos</option>
              {temperaments?.map((temp) => {
                //muestro todos los temperamentos como opciones
                return (
                  <option value={temp.name} key={temp.id}>
                    {temp.name}
                  </option>
                );
              })}
            </select>
            <select onChange={(e) => handlerFilterApi(e)} className={style.b}>
              <option hidden>Filtrar por origen...</option>
              <option value="all">Todos</option>
              <option value="created">Creados</option>
              <option value="api">Existente en la api</option>
            </select>
          </div>
          <Paginated
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginated={paginated}
          />

          <div className={style.cards}>
            {currentDogs?.map((elem) => {
              //tomo unicamente los dogs que me devuelve el paginado para mostrar
              return (
                <div className={style.cardH} key={elem.id}>
                  <Link to={"/home/" + elem.id} id={style.link}>
                    <button className={style.button}>DETAIL</button>
                  </Link>
                  <Card
                    name={elem.name}
                    image={
                      elem.image
                        ? elem.image
                        : "https://st3.depositphotos.com/29384342/35239/v/450/depositphotos_352397770-stock-illustration-vector-image-dog-silhouette-default.jpg"
                    }
                    temperament={elem.temperament}
                    weight={elem.weight}
                    key={elem.id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={style.loadingHome}>
          <h3>Loading...</h3>
          <p>¡Estamos trabajando para cargar las razas!</p>
          <p>
            Si no se le redirige vuelva al inicio y<br></br> verifique que se
            hayan cargado los datos.
          </p>
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
