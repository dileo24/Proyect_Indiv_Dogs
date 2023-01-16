import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments, getDogs } from "../../actions";
import style from "./DogCreate.module.css";

const validate = (input, dogs) => {
  let errors = {};
  if (!/^[ a-zA-Z]+$/.test(input.name)) {
    errors.name =
      "Este dato es incorrecto... Es obligatorio, no se permiten caracteres especiales, números o espacios";
  }
  if (dogs.some((e) => e.name.toUpperCase() === input.name.toUpperCase())) {
    errors.name = "Esta raza de perro ya existe!";
  }
  if (!/^[0-9]+$/.test(input.height)) {
    errors.height =
      "Este dato es incorrecto... Es obligatorio, solo números decimales, positivos, sin caracteres especiales o LETRAS";
  }
  if (!/^[0-9]+$/.test(input.weight)) {
    errors.weight =
      "Este dato es incorrecto... Es obligatorio, solo números decimales, positivos, sin caracteres especiales o LETRAS";
  }
  if (!/^[ 0-9-]+$/.test(input.life_span)) {
    errors.life_span =
      "Este dato es incorrecto... No se permiten caracteres especiales o letras";
  }
  if (!/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(input.image)) {
    errors.image =
      "Solo se permiten URL's. En caso de estar vacío se pondrá una imagen predeterminada.";
  }
  return errors;
};

export default function DogCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const dogs = useSelector((state) => state.allDogs);

  const history = useHistory();
  const [errors, setErrors] = useState({
    /* name: '',
        height: '',
        weight: '',
        life_span: '',
        image: '',
        temperament: [] */
  });

  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handlerChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value, //al 'name' de los input se los modifico con los 'value' que pase el usuario
    });
    setErrors(
      validate(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        dogs
      )
    );
  };

  const handlerSelectTemp = (e) => {
    if (!input.temperament.includes(e.target.value)) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value], //le paso lo que ya había y concateno lo que agrego del select
      });
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(postDog(input));
    alert("Raza creada con éxito! Se te redirigirá al inicio...");
    setInput({
      name: "",
      weight: "",
      height: "",
      life_span: "",
      image: "",
      temperament: [],
    });
    history.push("/home"); //me manda al home
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== e), //deja todo lo que no sea el elemento clickeado apra eliminar
    });
  };

  return (
    <div className={style.divProd}>
      <div>
        <Link to="/home">
          <button className={style.button}>Volver al inicio</button>
        </Link>
      </div>
      <div className={style.form}>
        <h1>Crea una Raza</h1>
        <form onSubmit={(e) => handlerSubmit(e)}>
          <div className={style.info}>
            <label>Nombre: </label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={(e) => handlerChange(e)}
            ></input>
            {errors.name && <p className={style.errors}>{errors.name}</p>}
          </div>

          <div className={style.info}>
            <label>Altura Promedio (cm): </label>
            <input
              type="number"
              value={input.height}
              name="height"
              onChange={(e) => handlerChange(e)}
              disabled={!input.name || errors.name}
            ></input>
            {errors.height && !errors.name && (
              <p className={style.errors}>{errors.height}</p>
            )}
          </div>

          <div className={style.info}>
            <label>Peso Promedio (kg): </label>
            <input
              type="number"
              value={input.weight}
              name="weight"
              onChange={(e) => handlerChange(e)}
              disabled={!input.name || errors.height}
            ></input>
            {errors.weight && !errors.height && (
              <p className={style.errors}>{errors.weight}</p>
            )}
          </div>

          <div className={style.info}>
            <label>Años de Vida: </label>
            <input
              type="text"
              value={input.life_span}
              name="life_span"
              onChange={(e) => handlerChange(e)}
              disabled={!input.name || errors.weight}
            ></input>
            {errors.life_span && !errors.weight && (
              <p className={style.errors}>{errors.life_span}</p>
            )}
          </div>

          <div className={style.info}>
            <label>Imagen: </label>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handlerChange(e)}
              disabled={!input.name || errors.weight}
            ></input>
            {errors.image && !errors.weight && (
              <p className={style.errors}>{errors.image}</p>
            )}
          </div>

          <select onChange={(e) => handlerSelectTemp(e)} className={style.b}>
            {temperaments.map((temp) => (
              <option value={temp.name} key={temp.id}>
                {temp.name}
              </option>
            ))}
          </select>
          <div>
            <button
              type="create"
              className={style.button}
              disabled={
                !input.name || errors.name || errors.height || errors.weight
              }
            >
              Crear raza!
            </button>
          </div>
        </form>
        <div className={style.temps}>
          {input.temperament.map(
            (
              temp //mapeo mi estado local con todas las ocupaciones que le está mandando el usuario
            ) => (
              <div key={temp} className={style.temp}>
                <p>{temp}</p>
                <button onClick={() => handleDelete(temp)} className={style.x}>
                  x
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
