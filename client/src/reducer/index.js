import {
    GET_DOGS,
    GET_TEMPERAMENTS,
    FILTER_BY_TEMPS,
    FILTER_BY_API,
    ORDER_WEIGHT,
    ORDER_ALFAB,
    GET_NAME_DOGS,
    GET_DETAIL,
    CLEAN_DOG
} from "../actions";

const initialState = {
    allDogs: [],
    copyAllDogs: [],
    temperaments: [],
    detail: [],
    errors: false,
};


const rootReducer = (state = initialState, action) => {
    const dogs = state.copyAllDogs;

    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                copyAllDogs: action.payload,
            };
        case GET_NAME_DOGS:
            return {
                ...state,
                allDogs: action.payload//lo hacemos en el allDogs porque es el arreglo que estoy mostrando
            };
        case CLEAN_DOG:
            return {
                ...state,
                detail: []
            }

        case 'POST_DOG':
            return {
                ...state,
                allDogs: action.payload
            };

        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload,
            };

        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }

        case FILTER_BY_TEMPS:
            const dogsTemp = action.payload === 'all'
                ? dogs//state.copyAllDogs
                : dogs.filter((elem) => elem.temperament?.includes(action.payload)) //uso la copia de todos los perros, porque este filtro se va a asignar a allDogs 
            return {                                                                //así que si elijo otra opción va a filtrar en un allDogs ya filtrado
                ...state,
                allDogs: dogsTemp,
            };
        case FILTER_BY_API:
            const apiFilt = action.payload === 'api'
                ? dogs.filter(elem => !elem.createInDb)
                : dogs.filter(elem => elem.createInDb)
            return {
                ...state,
                allDogs: action.payload === 'all' ? dogs : apiFilt,
            };
        case ORDER_WEIGHT:
            const arrWei = action.payload === 'asc'
                ? dogs.sort((a, b) => { //compara dos valores, en este caso los dos pesos
                    if (isNaN(a.weight) || isNaN(b.weight)) return -1;
                    if (parseInt(a.weight) > parseInt(b.weight)) return 1; //los va posicionando a la derecha
                    if (parseInt(a.weight) < parseInt(b.weight)) return -1;//o a la izquierda
                    return 0;//o si son iguales los deja así
                })
                : dogs.sort((a, b) => {
                    if (isNaN(a.weight) || isNaN(b.weight)) return -1;
                    if (parseInt(a.weight) > parseInt(b.weight)) return -1;
                    if (parseInt(a.weight) < parseInt(b.weight)) return 1;
                    return 0;
                })
            return {
                ...state,
                allDogs: arrWei,
            };
        case ORDER_ALFAB:
            const arrAlfab = action.payload === 'AZ'
                ? dogs.sort((a, b) => {
                    let prim = a.name[0].toUpperCase() + a.name.slice(1);
                    let seg = b.name[0].toUpperCase() + b.name.slice(1);
                    if (prim > seg) return 1;
                    if (prim < seg) return -1;
                    return 0;
                })
                : dogs.sort((a, b) => {
                    let prim = a.name[0].toUpperCase() + a.name.slice(1);
                    let seg = b.name[0].toUpperCase() + b.name.slice(1);
                    if (prim > seg) return -1;
                    if (prim < seg) return 1;
                    return 0;
                })
            return {
                ...state,
                allDogs: arrAlfab,
            };

        default:
            return { ...state };
    }
}
export default rootReducer;