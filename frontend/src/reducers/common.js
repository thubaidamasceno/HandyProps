import {
    APP_LOAD,
    APP_MENU,
    REDIRECT,
    LOGOUT,
    ARTICLE_SUBMITTED,
    SETTINGS_SAVED,
    LOGIN,
    REGISTER,
    DELETE_ARTICLE,
    ARTICLE_PAGE_UNLOADED,
    EDITOR_PAGE_UNLOADED,
    HOME_PAGE_UNLOADED,
    PROFILE_PAGE_UNLOADED,
    PROFILE_FAVORITES_PAGE_UNLOADED,
    SETTINGS_PAGE_UNLOADED,
    LOGIN_PAGE_UNLOADED,
    REGISTER_PAGE_UNLOADED,
    REDIRECT_TO,
    ASYNC_START,
    ASYNC_END,
    SET_SEARCHTXT,
    SET_PRESEARCHTXT,
} from '../constants/actionTypes';

import {redcommon} from '../modules';

export const defaultState = {
    appName: 'HandyProps',
    token: null,
    role: 'guest',
    viewChangeCounter: 0,
    menuLeftOpen: false,
    searchTxt: '',
    preSearchTxt: '',
};

const expd = (state = defaultState, action) => {
    let redirectUrl;
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                inProgress: false,
                token: action.token || null,
                appLoaded: true,
                currentUser: action.payload ? action.payload.user : null,
                role: action.payload ? (action.payload.user ? action.payload.user.role : 'guest') : 'guest',
            };
        case ASYNC_END:
            return {...state};
        case ASYNC_START:
            if (action.subtype === APP_LOAD) {
                //window.loading = false;
                return {...state, inProgress: true};
            }
            return {...state};
        case REDIRECT_TO:
            return {...state, redirectTo: action.url};
        case SET_SEARCHTXT:
            return {...state, searchTxt: action.txt || ''};
        case SET_PRESEARCHTXT:
            return {...state, preSearchTxt: action.txt || ''};
        case APP_MENU:
            return {...state, menuLeftOpen: action.open};
        case REDIRECT:
            return {...state, redirectTo: null};
        case LOGOUT:
            return {...state, redirectTo: '/', token: null, currentUser: null, role: 'guest'};
        case ARTICLE_SUBMITTED:
            redirectUrl = `/article/${action.payload.article.slug}`;
            return {...state, redirectTo: redirectUrl};
        case SETTINGS_SAVED:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                currentUser: action.error ? null : action.payload.user,
                role: action.error ? null : action.payload.user.role,
            };
        case LOGIN:
            return {
                ...state,
                token: action.error ? null : action.payload.user.token,
                currentUser: action.error ? null : action.payload.user,
                role: action.error ? null : action.payload.user.role,
            };
        case REGISTER:
            return {
                ...state,
                redirectTo: action.error ? null : '/register/ok',
                role: action.error ? null : action.payload.user.role,
                // token: action.error ? null : action.payload.user.token,
                // currentUser: action.error ? null : action.payload.user
            };
        case DELETE_ARTICLE:
            return {...state, redirectTo: '/'};
        case ARTICLE_PAGE_UNLOADED:
        case EDITOR_PAGE_UNLOADED:
        case HOME_PAGE_UNLOADED:
        case PROFILE_PAGE_UNLOADED:
        case PROFILE_FAVORITES_PAGE_UNLOADED:
        case SETTINGS_PAGE_UNLOADED:
        case LOGIN_PAGE_UNLOADED:
        case REGISTER_PAGE_UNLOADED:
            return {...state, viewChangeCounter: state.viewChangeCounter + 1};
        default:
            var statex = null;
            var i = 0;
            for (; i < redcommon.length; i++) {
                statex = redcommon[i](state, action);
                if (statex)
                    return statex;
            }
            return state;
    }
};


export default expd;