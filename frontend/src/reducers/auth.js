import {
    LOGIN,
    REGISTER,
    LOGIN_PAGE_UNLOADED,
    REGISTER_PAGE_UNLOADED,
    ASYNC_START,
    UPDATE_FIELD_AUTH
} from '../constants/actionTypes';

const expd = (state = {typed: 0}, action) => {
    switch (action.type) {
        case LOGIN:
        case REGISTER:
            return {
                ...state,
                inProgress: false,
                errors: (action.error && action.payload) ? action.payload.errors : null
            };
        case LOGIN_PAGE_UNLOADED:
        case REGISTER_PAGE_UNLOADED:
            return {};
        case ASYNC_START:
            if (action.subtype === LOGIN || action.subtype === REGISTER) {
                let typed = state.typed + 1
                console.log(typed);
                return {
                    ...state,
                    inProgress: true
                };
            }
            break;
        case UPDATE_FIELD_AUTH:
            return {
                ...state,
                // typed,
                [action.key]: action.value
            };
        default:
            return state;
    }

    return state;
};


export default expd;