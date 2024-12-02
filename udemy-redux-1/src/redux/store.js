import {createStore, combineReducers, applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import pokeReducer from './pokeDucks' 

//combine reducers toma un objeto y lo lee en nuestro componente(se usa donde se va a utilizar)
const rootReducer = combineReducers({
    pokemons: pokeReducer,
})
 
//crear el store con middleware de thunk y devtools
export default function generateStore() {
    const store = createStore(
        rootReducer, 
        composeWithDevTools( 
            applyMiddleware(thunk) 
        )
    )
    return store
}