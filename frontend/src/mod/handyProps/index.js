import React from 'react';
import {connect} from 'react-redux';
import {
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    APPLY_TAG_FILTER
} from '../../constants/actionTypes';
import {at,Act} from './modconf'

import App from './App';

// importa componentes da pasta, mas não permite ser importado por nenhum script da pasta

export const routeshandyProps = [
    // (<Route path="/fmea2/print/@:id" key={window.keygen()} component={PrintFMEA}/>),
    // (<Route path="/fmea2/indices" key={window.keygen()} component={IndicesFMEA}/>),
    // (<Route path="/fmea2" key={window.keygen()} component={ModApp}/>),
    // (<Route path="/fmea2View/:slug" key={window.keygen()} component={ModAppView}/>),
    // (<Route path="/fmea2View" key={window.keygen()} component={ModAppView}/>),
];

export const menuitemshandyProps = [
    // ["Índices utilizados",icons.FormatListNumberedRtlIcon  ,'/fmea2'],
    // ["FMEA Visualizar",icons.CallSplitIcon  ,'/fmea2View'],
    // 'divider'
];


const Promise = global.Promise;

const mapStateToProps = state => ({
    ...state.home,
    appName: state.common.appName,
    token: state.common.token
});

const mapDispatchToProps = dispatch => ({
    onClickTag: (tag, pager, payload) =>
        dispatch({type: APPLY_TAG_FILTER, tag, pager, payload}),
    onLoad: (tab, pager, payload) =>
        dispatch({type: Act.HP_LOADED, tab, pager, payload}),
    onUnload: () =>
        dispatch({type: HOME_PAGE_UNLOADED})
});

// class Home extends React.Component {
//     render() {
//         return (
//
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-3">
//                         <div className="container-fluid">
//                             <Filtro/>
//                             <DataGrid/>
//                         </div>
//                     </div>
//                     <div className="col-9">
//                         <Chart/>
//                     </div>
//                 </div>
//             </div>
//
//         );
//     }
// }

 const expd = connect(mapStateToProps, mapDispatchToProps)(App);

export default expd;