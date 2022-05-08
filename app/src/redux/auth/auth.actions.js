import { SET_TOKEN, CLEAR_TOKEN } from "./authAction.types";
import axios from "axios";

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

export const createTokenAsync = (email, password) => {
    // We are accessing state in action creater to get server url
    return (dispatch, getState) => {
        const url = `${getState().authReducer.create_token_url}/`
        console.log('create_token_url:', url)
        const data = {
            email,
            password
        }

        axios.post(
            url,
            {
                ...data,
            }
        )
            .then(response => {
                // console.log(response);
                const tokens = response.data;

                console.log("Access Token=", tokens.access)
                // Set the token
                dispatch(setToken(tokens.access))
            })
            .catch(error => {
                console.log(error)
            })
    }
}



