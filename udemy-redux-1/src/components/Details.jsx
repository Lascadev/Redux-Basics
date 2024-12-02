import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getPokeDeatils } from '../redux/pokeDucks'
const Details = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = () => {
            dispatch(getPokeDeatils())
        }
        fetchData()
    }, [dispatch])

    const pokemon = useSelector(store => store.pokemons)
    console.log(pokemon)
  return pokemon ? (
    <div className='card mt-5 text-center'>
      <div className="card-body">
        <img src={pokemon.img} className="img-fluid"/>
        <div className="card-title text-uppercase">{pokemon.name}</div>
        <div className="card-text">Ancho:{pokemon.weight} | Alto:{pokemon.height}</div>
      </div>
    </div>
  ) : null
}

export default Details
