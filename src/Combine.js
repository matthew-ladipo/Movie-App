import {combineReducers} from 'redux'
import { ProductReducer } from './redux/Reducer'

export const reducers = combineReducers({
    allProducts: ProductReducer,
})