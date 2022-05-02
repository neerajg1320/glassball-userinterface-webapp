import { ADD_CONFIG, UPDATE_CONFIG, REMOVE_CONFIG } from "./configAction.types"; 

const addConfig = (key, value) => {
    return {
        type: ADD_CONFIG,
        payload: {
            key,
            value
        }
    }
}

const updateConfig = (key, value) => {
    return {
        type: UPDATE_CONFIG,
        payload: {
            key,
            value
        }
    }
}

const removeConfig = (key) => {
    return {
        type: REMOVE_CONFIG,
        payload: {
            key
        }
    }
}

export const addConfigAsync = (key, value) => {
    return (dispatch) => {
        dispatch(addConfig(key, value))
    }
}


export const updateConfigAsync = (key, value) => {
    return (dispatch) => {
        dispatch(updateConfig(key, value))
    }
}


export const removeConfigAsync = (key, value) => {
    return (dispatch) => {
        dispatch(removeConfig(key, value))
    }
}

