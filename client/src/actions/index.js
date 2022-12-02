import axios from 'axios'

export const GET_DOGS = 'GET_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const FILTER_BY_TEMPS = 'FILTER_BY_TEMPS';
export const FILTER_BY_API = 'FILTER_BY_API';
export const ORDER_WEIGHT = 'ORDER_WEIGHT';
export const ORDER_ALFAB = 'ORDER_ALFAB';
export const GET_NAME_DOGS = 'GET_NAME_DOGS';
export const GET_DETAIL = 'GET_DETAIL';
export const CLEAN_DOG = 'CLEAN_DOG';
export const ERROR = 'ERROR';

export function getDogs() {
    return async function (dispatch) {
        const response = await axios.get('/dogs');
        return dispatch({
            type: GET_DOGS,
            payload: response.data
        })
    }
}

export function getNameDogs(name) {
    return async function (dispatch) {
        let response = await axios.get(`/dogs?name=${name}`)
        return dispatch({
            type: GET_NAME_DOGS,
            payload: response.data//devuelve lo de la ruta cuando le asigno un 'name'
        })
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        const response = await axios.get('/temperaments');
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: response.data
        })
    }
}

export function postDog(payload) {
    return async function () {
        const response = await axios.post('/dog', payload) //payload es todo lo que carga el usuario
        return response
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        let response = await axios.get(`/dogs/${id}`)
        return dispatch({
            type: GET_DETAIL,
            payload: response.data
        })
    }
}

export const cleanDog = () => {
    return { type: "CLEAN_DOG" }
}

export function filterDogsByTemps(payload) {
    console.log(payload);
    return {
        type: FILTER_BY_TEMPS,
        payload: payload,
    }
}

export function filterApi(payload) {
    return {
        type: FILTER_BY_API,
        payload: payload,
    }
}

export function orderWeight(payload) {
    return {
        type: ORDER_WEIGHT,
        payload: payload,
    }
}

export function orderAlfab(payload) {
    return {
        type: ORDER_ALFAB,
        payload: payload
    }
}

export function error(){
    return{
        type: ERROR
    }
}