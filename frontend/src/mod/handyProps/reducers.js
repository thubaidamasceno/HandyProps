import produce from "immer"
import {ASYNC_START} from '../../constants/actionTypes';
import reduceReducers from 'reduce-reducers';
import agent, {rh, rt} from "../../agent";
import {act} from './modconf';
import * as op from 'object-path';
import * as im from 'object-path-immutable';
import * as db from './db';
import {call, put, takeEvery} from 'redux-saga/effects'
import {defaultFieldList,defaultColumns} from './fields';

export const apiActs = {
    list: p => {
        return rt(rh('get', `/handyProps/v1/materials/list`));
    },
    get: p => {
        return rt(rh('get', p.url));
    },
};

export const handyPropsCommon = (state = {}, action) => {
    switch (action.type) {
        case act.HP_WAITING:
            return {...state};
        default:
            return null;
    }
};

export const defaultState = (() => {
    let getHandyPropsDataSource = db.getHandyPropsDataSource();
    let ds = {
        DS: {
            urlDSListDefault: getHandyPropsDataSource,
            urlDSList: getHandyPropsDataSource,
        },
        data: [],
        defaultProperties: defaultFieldList(),
        customProperties: [],
        columnsAG:[],
        gridColumns:defaultColumns(),
        processing: false,
        loading: false,
        loaded: false,
        clicks: 0,
        dataSize: 0,
    };
    return ds;
})();

// carrega dados das DSs selecionadas
function* loadData(action) {
    try {
        yield put({
            type: act.hpSetState, toSet: {
                processing: true,
            }
        });
        const data = yield call(db.listMaterials(), data => data);
        yield put({
            type: act.hpSetState, toSet: {
                processing: false,
                loaded: true,
                dataSize: (data && data.length) || 0,
                data
            }
        });
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
        yield put({
            type: act.hpSetState, toSet: {
                processing: true,
                dataSize: 0, data: []
            }
        });
    }
}

// // Carerega lista de DS
// function* loadDataSources(action) {
//     try {
//         yield put({
//             type: act.hpSetState, toSet: {
//                 processing: true,
//             }
//         });
//         const data = yield call(db.listMaterials(), data => data);
//         yield put({
//             type: act.hpSetState, toSet: {
//                 processing: false,
//                 loaded: true,
//                 dataSize: data && data.length || 0,
//                 data
//             }
//         });
//     } catch (e) {
//         yield put({type: "USER_FETCH_FAILED", message: e.message});
//         yield put({
//             type: act.hpSetState, toSet: {
//                 processing: true,
//                 dataSize: 0, data: []
//             }
//         });
//     }
// }

// Careerga DS espcífica, via lista de URLs
function* getDataSource(action) {
    try {
        yield put({
            type: act.hpSetState, toSet: {
                processing: true,
            }
        });
        const RemoteData = yield call(apiActs.get, {url: action.url});
        const sucess = yield call(
            db.loadMaterials(),
            {
                dataSourceName: 'materials',
                data: RemoteData,
            }
        );
        if (sucess) {

            yield put({
                type: act.hp.loadData
            });
            return;
        }
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
        yield put({
            type: act.hpSetState, toSet: {
                processing: true,
                loaded: true,
                data: [],
            }
        });
    }
}

// Careerga DS espcífica, via lista de URLs
function* HP_LOADED(action) {
    try {
        yield put({
            type: act.hp.loadData
        });
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
        yield put({
            type: act.hpSetState, toSet: {
                processing: false, data: []
            }
        });
    }
}

export const sagas = [
    (function* () {
        yield takeEvery(act.hp.loadData, loadData);
    })(),
    // (function* () {
    //     yield takeEvery(act.hp.loadDataSources, loadDataSources);
    // })(),
    (function* () {
        yield takeEvery(act.hp.getDataSource, getDataSource);
    })(),
    (function* () {
        yield takeEvery(act.HP_LOADED, HP_LOADED);
    })(),
];

const toSetTraps = ({state, action}) => {
    //
    let handyPropsDataSource = op.get(action.toSet, 'DS.urlDSList')
    if (handyPropsDataSource) {
        db.setHandyPropsDataSource(handyPropsDataSource);
    }

    let data = op.get(action.toSet, 'data')
    if (data) {
        state = im.set(state, 'chartData', data.map(m => ({x: m.Density, y: m.TensileStrength})));
    }

    //
    return im.merge(state, '', op.get(action, 'toSet', {}));
}

const reducerBase = (state = defaultState, action) => {
    let v = {};
    switch (action.type) {
        // case   act.HP_LOADED:
        //     return {
        //         ...state,
        //         // data: db.get,
        //     };
        case   act.hpSetState:
            return toSetTraps({state, action});
        case   act.hp.setProcessing:
            return {
                ...state,
                processing: true,
            };
        case   act.hp.unSetProcessing:
            return {
                ...state,
                processing: false,
            };
        case   act.HP_NODECHANGE:
            console.log(action.xxx);
            return {
                ...state,
                clicks: state.clicks + 1,
            };
        case   act.HP_ACT:
            let pAct = action.p ? action.p.act : '';
            switch (pAct) {
                case 'get':
                    return {
                        ...state,
                    };
                default:
                    return state;
            }
        case   act.HP_ACT.createDB:
            let xAct = action.p ? action.p.act : '';
            switch (xAct) {
                case 'get':
                    return {
                        ...state,
                    };
                default:
                    return state;
            }
        case  ASYNC_START:
            if (action.subtype === act.HP_WAITING) {
                return {...state, inProgress: true};
            }
            return state;
        default:
            return state;
    }
};

const Reducers1 = produce((draft, action) => {
        switch (action.type) {
            case act.HP_ACT:
                let v = {};
                v.act = action.p ? action.p.act : '';
                switch (act) {
                    case 'restoreCrumb':
                        // v.viewKey = im.get(action, 'p.viewKey');
                        // if (v.viewKey) {
                        //     op.set(draft, 'app.activeView', v.viewKey);
                        //     op.set(draft, 'app.crumbList',
                        //         im.get(draft, `app.crumbs.${v.viewKey}.restore`));
                        // }
                        return;
                    case 'dlgRename':
                        // let name = op.get(draft.data, (im.get(action, 'p.path__', '') + '/name').split(/[.:\/#]/));
                        // draft = im.merge(draft, 'app.renameDialog', {
                        //     renaming: true,
                        //     //invalidRename: true,
                        //     renameText: name,
                        //     type: im.get(action, 'p.type'),
                        //     path__: im.get(action, 'p.path__'),
                        //     id: im.get(action, 'p.id'),
                        //     txt: `Renomear '${name}' como`,
                        //     clickYes: im.get(action, 'p.clickYes')
                        // });
                        return draft;

                    default:
                        // window.alert(`ação desconhecida ${act}`);
                        return draft;
                }
            default:
                // window.alert(`ação desconhecida ${act}`);
                return draft;
        }
    },
    defaultState
    )
;

export const handyProps = reduceReducers(defaultState,
    (state = defaultState, action) => {
        let stt = reducerBase(state, action);
        return stt;
    },
    Reducers1,
);
const reducers = {sagas, reducer: handyProps, commonReducer: handyPropsCommon}
export default reducers;