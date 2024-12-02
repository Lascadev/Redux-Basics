import React, { useEffect } from 'react'
//hooks para redux
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonsAction, nextPokemonAction, getPokeDeatils, previousPokemonAction } from '../redux/pokeDucks'
import Details from './Details'
//useDispatch nos permite consumir la action
//useSelector nos permite leer el state principal

const Pokemons = () => {
    const dispatch = useDispatch()
    const pokemones = useSelector(store => store.pokemons.results)
    const next = useSelector(store => store.pokemons.next)
    const previous = useSelector(store => store.pokemons.previous)

    useEffect(() => {
        const fetchData = () => {
            dispatch(getPokemonsAction())
        }
        fetchData()
    }, [dispatch])

    return (
        <div className='row'>
            <div className="col-md-6">
           <h3>Lista de pokemones</h3>
           <br/>
            <div className="d-flex justify-content-between">

            {/* {
                pokemones.length === 0 && <button className='btn btn-dark' onClick={() => dispatch(getPokemonsAction())}>Get Pokemons</button>
            } */}

            {
                next && <button className='btn btn-dark' onClick={() => dispatch(nextPokemonAction())}>Continue Pokemons</button>
            }

            {
                previous && <button className='btn btn-dark' onClick={() => dispatch(previousPokemonAction())}>Previous Pokemons</button>
            }
           
            </div>
            <ul className='list-group mt-3'>
                {
                    pokemones.map(item => <li className='list-group-item text-uppercase' key={item.name}>
                        {item.name}
                        <button onClick={() => dispatch(getPokeDeatils(item.url))} className="btn btn-dark btn-sm float-end">Info</button>
                        </li>)
                }
            </ul>
            </div>
            <div className="col-md-6">
                <h3>Detalle Pokemon</h3>
                <Details/>
            </div>
        </div> 
    )
}

export default Pokemons
