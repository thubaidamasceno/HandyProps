import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import React from "react";
import {ConnectedRouter} from 'connected-react-router';
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";
import store, {history} from './store';
import App from "./components/App";
import * as op from "object-path";

window._history = history;
window.pefcnt = {ListPanel: {render: 0, load: 0, update: 0, unload: 0, list: 0}};

window.setAPI_ROOT = (def = ':48655/api') => {
    let {protocol, hostname} = window.location;
    return window.API_ROOT = op.get(
        window, 'handypropsConf.apiURL', `${protocol}//${hostname}${def}`)
        .replace('$protocol', protocol).replace('$hostname', hostname);
};
window.apploading = true;
window.xxx = {onsubmit: 0};


const startApp = () => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        </Provider>
        ,
        document.getElementById('root')
    );
    registerServiceWorker();
};
const inicia = () => {
    if (window.cordova) {
        document.addEventListener("deviceready", startApp, false);
    } else {
        startApp();
    }
};

// todo: login não deve re-conduzir à start-page
Promise.resolve(axios
    .get(window.location.origin + "/configs.json")
    .then((response) => {
        try {
            if (response.data && !window.handypropsConf) {
                window.handypropsConf = response.data;
            }
            window.setAPI_ROOT();
        } catch (e) {
            console.log(e);
        }
    })
    .catch((e) => console.log(e))).then(x => inicia());

// todo: tooltip nos nomes de colunas