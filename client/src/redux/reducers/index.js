import authReducer from './authReducer'
import errorReducer from './errorReducer'
import recipeReducer from './recipeReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    authReducer,
    errorReducer,
    recipeReducer
})

export default rootReducer;