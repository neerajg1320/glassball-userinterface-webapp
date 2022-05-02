import {combineReducers} from 'redux'
import resourceReducer from './resource/resource.reducer'
import configReducer from './config/config.reducer'
import authReducer from './auth/auth.reducer'

const rootReducer = combineReducers({
    resourceReducer: resourceReducer,
    configReducer: configReducer,
    authReducer: authReducer
})

export default rootReducer