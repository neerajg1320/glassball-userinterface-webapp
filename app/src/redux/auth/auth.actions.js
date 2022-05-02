import { SET_TOKEN, CLEAR_TOKEN } from "./authAction.types";

const setToken = (token) => {
    return {
        type: SET_TOKEN,
        payload: {
            token
        }
    }
}

const clearToken = () => {
    return {
        type: CLEAR_TOKEN,
        payload: {}
    }
}

export const setTokenAsync = (token) => {
    return (dispatch) => {
        dispatch(setToken(token))
    }
}

export const clearTokenAsync = () => {
    return (dispatch) => {
        dispatch(clearToken())
    }
}
