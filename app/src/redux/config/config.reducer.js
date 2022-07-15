import {ADD_CONFIG, UPDATE_CONFIG, REMOVE_CONFIG} from "./configAction.types"; 
import config from '../../config/default_config'


const initialState = {
    server: {
        documents: `${config.server.documents}`,
        files: `${config.server.files}`,
        transactions: `${config.server.transactions}`,
        positions: `${config.server.positions}`,
        openpositions: `${config.server.openpositions}`,
        invoices: `${config.server.invoices}`,
        finTransactions: `${config.server.finTransactions}`,
        docTypes: `${config.server.docTypes}`,
        accounts: `${config.server.accounts}`,
        namespaces: `${config.server.namespaces}`,
    }
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_CONFIG:
            if (!(action.payload.key in state)) {
                const newState = {...state};
                newState[action.payload.key] = action.payload.value;
                return newState;
            }
            return state;

        case UPDATE_CONFIG:
            if (action.payload.key in state) {
                const newState = {...state};
                newState[action.payload.key] = action.payload.value;
                return newState;
            }
            return state;

        case REMOVE_CONFIG:
            if (action.payload.key in state) {
                const newState = {...state};
                delete newState[action.payload.key];
                return newState;
            }
            return state;

        default:
            return state
    }
}

export default reducer
