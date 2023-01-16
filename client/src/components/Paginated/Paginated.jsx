import React from "react";
import style from "./Paginated.module.css";

export default function Paginated({ dogsPerPage, allDogs, paginated }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    //recorro el arreglo redondeando la división de dogs/dogsPorPagina
    pageNumber.push(i);
  }
  return (
    <nav className={style.navbar}>
      <ul className={style.paginated}>
        {pageNumber?.map((number) => {
          return (
            <li
              className={style.num}
              key={number}
              onClick={() => paginated(number)}
            >
              <a className={style.click}>{number}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
