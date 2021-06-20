import React from 'react';
import {connect} from 'react-redux';
import {
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    APPLY_TAG_FILTER
} from '../../constants/actionTypes';

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
        dispatch({type: HOME_PAGE_LOADED, tab, pager, payload}),
    onUnload: () =>
        dispatch({type: HOME_PAGE_UNLOADED})
});

class Home extends React.Component {
    render() {
        return (

            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">

                        <div className="container-fluid">
                            <div className="row" style={{width: "100%", backgroundColor: 'lightgreen'}}>
                                <div className="col">

                                    <div className="">
                                        Filtro
                                    </div>

                                    <div className="">
                                        <input/>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{width: "100%", backgroundColor: 'yellow'}}>
                                <div className="col">
                                    <div className="">
                                        Materiais Selecionados
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="" style={{width: "100%", backgroundColor: 'red'}}>
                            Gráfico
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

const expd = connect(mapStateToProps, mapDispatchToProps)(Home);

export default expd;