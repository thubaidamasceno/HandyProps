import React from "react";

//§§§_begin_modulos_import
import handyProps from "./mod/handyProps/reducers";
import {routeshandyProps, menuitemshandyProps} from "./mod/handyProps";
//§§§_end_modulos_import

const prefix = "";
var red = {};
let rot = [];
let sagas = [];//sagas
//rot = [...rot,(<Route path="/mapapp" component={()=>(<MyComponent/>)} />),];
let men = [];
let hea = [];
let rc = [];
let sty = [];

//§§§_begin_modulos_modules

//¬¬¬_begin_handyProps
red = {...red, handyProps: handyProps.reducer};
rc = [...rc, handyProps.commonReducer];
sagas = [...sagas, ...handyProps.sagas];
// rot = [...rot, ...routesusuario];
// men = [...men, ...menuitemsusuario];
//¬¬¬_end_handyProps

//§§§_end_modulos_modules

sty.map((val) => {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = val;
    document.getElementsByTagName("HEAD")[0].appendChild(link);
    return null;
});


export const rootSagas = sagas;
export const reducers = red;
export const approutes = rot;
export const menuitems = men;
export const headers = hea;
export const redcommon = rc;
