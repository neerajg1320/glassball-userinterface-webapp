import { SET_TOKEN, CLEAR_TOKEN } from "./authAction.types";
import config from '../../config/default_config';

const initialState = {
    isLoggedIn: false,
    token_title: 'Bearer',
    token: config.auth.token,
    create_token_url: `${config.auth.create_token_url}`
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_TOKEN:
            console.log('SET_TOKEN:', action.payload.token)
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token
            }

        case CLEAR_TOKEN:
            return {
                ...state,
                isLoggedIn: false,
                token: undefined
            }

        default:
            return state
    }
}

export default reducer