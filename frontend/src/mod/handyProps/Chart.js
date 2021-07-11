import React from 'react';
import {connect} from 'react-redux';
import {
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    APPLY_TAG_FILTER
} from '../../constants/actionTypes';
import ScatterChart from './ScatterChart';
import ScatterApex from './ScatterApex';
import Button from "@material-ui/core/Button";

'@material-ui/core/Button';

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
            <div className="">
                <Button
                    // className={classes.buttonLink}
                    onClick={() => {
                    }}
                >Exportar Gráfico</Button>
                < ScatterApex />
            </div>
        );
    }
}

const expd = connect(mapStateToProps, mapDispatchToProps)(Home);

export default expd;