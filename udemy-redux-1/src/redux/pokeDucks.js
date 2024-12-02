import { type } from '@testing-library/user-event/dist/type'
import axios from 'axios'

//constantes
const dataInit = {
    count: 0,
    next: null,
    previous:null,
    results:[]
}

//los types van en mayusculas y los declaramos
//types
const GET_POKEMONS_SUCCESS = "GET_POKEMONS_SUCCESS"
const GET_NEXT_POKEMONS = "GET_NEXT_POKEMONS"
const GET_PREVIOUS_POKEMONS = "GET_PREVIOUS_POKEMONS"
const GET_POKEMONS_DETAILS_SUCCESS = "GET_POKEMONS_DETAILS_SUCCESS"
//reducer -> acepta y envia a la constante

//el state que parta con la data inicial
export default function pokeReducer(state = dataInit, action) {
    switch(action.type){
        case GET_POKEMONS_SUCCESS:
            return {...state, ...action.payload}
        case GET_NEXT_POKEMONS:
            return {...state, ...action.payload}
        case GET_PREVIOUS_POKEMONS:
            return {...state, ...action.payload, }
        case GET_POKEMONS_DETAILS_SUCCESS:
            return {...state, ...action.payload, }
        default:
            return state
    }
}

//dispatch -> activamos el reducer
//getstate -> obtenemos la data inicial o la info que se este almacenando en el state
//payload envia la respuesta
//actions -> consume la api

export const getPokeDeatils = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async(dispatch, getState) => {

    if (localStorage.getItem(url)){
        
        dispatch({
            type: GET_POKEMONS_DETAILS_SUCCESS,
            payload: JSON.parse(localStorage.getItem(url))
        })
        return
    }
    try {
        const res = await axios.get(url)
        dispatch({
            type: GET_POKEMONS_DETAILS_SUCCESS,
            payload: {
                name: res.data.name,
                weight: res.data.weight,
                height: res.data.height,
                img: res.data.sprites.front_default
            }
        })
        localStorage.setItem(url, JSON.stringify({
            name: res.data.name,
            weight: res.data.weight,
            height: res.data.height,
            img: res.data.sprites.front_default
        }))
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}

export const getPokemonsAction = () => async(dispatch, getState) => {
    //console.log('get state', getState().pokemons.offset)
    //const {offset} = getState().pokemons
    if (localStorage.getItem('offset=0')){
        dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
        console.log('datos guardados')
        return
    }
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)
        dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: res.data
        })
        console.log('datos desde la api')
        localStorage.setItem('offset=0', JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}


export const nextPokemonAction = () => async(dispatch, getState) => {
    const next = getState().pokemons.next

    if (localStorage.getItem(next)){
        console.log('datos guardados')
        dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: JSON.parse(localStorage.getItem(next))
        })
        return
    }
    try {
        const res = await axios.get(next)
        dispatch({
            type:GET_POKEMONS_SUCCESS,
            payload: res.data
        })
        localStorage.setItem(next, JSON.stringify(res.data))
        console.log('datos desde la api')
    } catch (error) {
        console.log(error)
    }
}

export const previousPokemonAction = () => async(dispatch, getState) => {
    const {previous} = getState().pokemons
    if (localStorage.getItem(previous)){
        console.log('datos guardados')
        dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: JSON.parse(localStorage.getItem(previous))
        })
        return
    }
    try {
        const res = await axios.get(previous)
        dispatch({
            type:GET_PREVIOUS_POKEMONS,
            payload: res.data
        })
        localStorage.setItem(previous, JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}