import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { getNameDogs } from "../../actions";
import style from "./SearchBar.module.css"


export default function SearchBar({ setCurrentPage, allDogs }) {
    const dispatch = useDispatch();//trae del reducer el state dogs con todas las razas a allDogs

    const [name, setName] = useState('')


    const handlerInputChange = (e) => {
        e.preventDefault()
        setName(e.target.value)//agarro el value del input y lo seteo en el useState
    }

    const handlerButton = (e) => {
        e.preventDefault()
        dispatch(getNameDogs(name))//el name va a ser mi estado local y se lo mando a la acción, para que se lo pase al back
        setCurrentPage(1);
    }

    return (
        <div>  {allDogs.length > 0
            ? <div>
                < input type='text' name="search" placeholder='Buscar...' onChange={e => handlerInputChange(e)} />
                <button type='submit' onClick={e => handlerButton(e)} className={style.b}>Buscar</button>
            </div>
            : <div className={style.loading}>
                <h3>Loading...</h3>
                <p>¡Estamos trabajando para cargar las razas!</p>
                <p>Si no se le redirige vuelva al inicio y verifique que se hayan cargado los datos.</p>
                <img src='https://media.tenor.com/nsf75akuSc4AAAAC/cat-laptop.gif' alt='loading' width='500px'></img>
            </div>
        }
        </div>
    )
}