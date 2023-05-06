
const initialState = {
    messageRegister: false,
    messageLogin: false,
    messages: [],
    statusPostMessage: true
}


const rootReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (action.type) {
        case "REGISTER_STATUS":
            return {
            ...state,
            messageRegister: action.payload,
            }
        case "LOGIN_STATUS":
            return {
            ...state,
            messageLogin: action.payload,
            }
        case "GET_ALL_MESSAGES":
            return {
            ...state,
            messages: action.payload
            }
        case "NEW_MESSAGE":
            return {
            ...state,
            statusPostMessage: action.payload
            }
        case "SET_STATUS":
            return {
            ...state,
            statusPostMessage: false
            }
        case "DELETE_CHAT":
            return{
            ...state,
            statusPostMessage: true
            }
        default:
            return state;
            }
        }


export default rootReducer