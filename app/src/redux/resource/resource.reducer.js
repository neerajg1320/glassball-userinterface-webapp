import { ADD_RESOURCE, REMOVE_RESOURCE, SET_CURRENT_RESOURCE, SET_RESOURCES, UPDATE_RESOURCE } from "./resourceAction.types";

const initialState = {
    documents:[],
    files:[],
    transactions:[],
    positions:[],
    openpositions:[],
    invoices:[],
    finTransactions:[],
    docTypes:[],
    accounts:[],
    namespaces:[],
    
    currentLink: ''
}

const reducer = (state = initialState, action) => {
    // console.log('action.payload:', action.payload);
    var newState = {...state}
    var resType;
    if (action && action.payload && 'resType' in action.payload) {
        resType = action.payload.resType; 
    }

    switch(action.type) {
        case ADD_RESOURCE:
            newState[resType] = [...state[resType], action.payload.resource]
            return newState

        case UPDATE_RESOURCE:
            newState[resType] = state[resType].map(resource => resource.id === action.payload.id ?
                {...resource, ...action.payload.update} :
                resource
            )
            return newState;

        case REMOVE_RESOURCE:
            newState[resType] = state[resType].filter(resource => resource.id !== action.payload.id)
            return newState;

        case SET_RESOURCES:
            newState[resType] = action.payload.resources;
            return newState;

        case SET_CURRENT_RESOURCE:
            // console.log('resourcesReducer: ', action.payload)
            return {
                ...state,
                currentLink: action.payload.link
            }

        default:
            return state
    }
}

export default reducer