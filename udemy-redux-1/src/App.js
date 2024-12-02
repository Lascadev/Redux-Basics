import React from 'react'
import Pokemons from './components/Pokemons'
import {Provider} from 'react-redux'
import generateStore from './redux/store'

export default function App() {

  const store = generateStore()

  return (
    <Provider store={store}>
      <div className='container mt-3'>
      <Pokemons/>
      </div>
    </Provider>
  )
}
