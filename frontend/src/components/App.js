import agent from '../agent';
import Header from './Header';
import React from 'react';
import {connect} from 'react-redux';
import {APP_LOAD, LOGOUT, REDIRECT, APP_MENU} from '../constants/actionTypes';
import {Link, Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {push} from 'connected-react-router';

import clsx from 'clsx';
import {withStyles} from "@material-ui/core";

import Home from "../mod/handyProps";

import {approutes} from '../modules';

const drawerWidth=48;
const styles = theme => {
    return {
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
        root: {
            // backgroundColor: "red",
            display: 'flex',
        },
        toolbar: {
            textAlign: "center",
            height: 48,
            minHeight: 24,
        },
        heading: {
            margin: "auto"
        },
        appBar: {
            // backgroundColor: "white",
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            direction: theme.direction,
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            minHeight: '48px!important',
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            //marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    };
};

const mapStateToProps = state => {
    return {
        appLoaded: state.common.appLoaded,
        appName: state.common.appName,
        inProgress: state.common.inProgress,
        currentUser: state.common.currentUser,
        role: state.common.role,
        redirectTo: state.common.redirectTo,
        //menuLeftOpen: state.common.menuLeftOpen,
    }
};

const mapDispatchToProps = dispatch => ({
    onClickLogout: () => dispatch({type: LOGOUT}),
    onLoad: (payload, token) =>
        dispatch({type: APP_LOAD, payload, token, skipTracking: true}),
    onRedirect: () => dispatch({type: REDIRECT}),
    onPreRedirect: (o) => dispatch(o),
});

class App extends React.Component {

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            //this.context.router.replace(nextProps.redirectTo);
            this.props.onPreRedirect(push(nextProps.redirectTo));
            this.props.onRedirect();
        }
    }

    UNSAFE_componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        if (token) {
            agent.setToken(token);
        }
        if (!this.props.inProgress)
            this.props.onLoad(token ? agent.Auth.current() : null, token);
    }

    render() {
        const {classes} = this.props;

        if (true
            // this.props.appLoaded && this.props.currentUser
        ) {

            return (
                <div
                    // className={classes.root}
                    style={{
                        display: 'flex',
                    }}
                >
                    <Header/>
                    <main
                        className={clsx(classes.content, {
                            [classes.contentShift]: this.props.menuLeftOpen,
                        })}

                        style={{}}
                    >
                        <div
                            className={classes.drawerHeader}

                            style={{}}

                        />
                        <Switch>
                            <Route exact path="/" key={window.keygen()}
                                   component={() => (<Home/>)}/>,

                            <Redirect from="/login" to="/"/>
                            {approutes}
                        </Switch>
                    </main>
                </div>
            );
        }
    }
}

const expd = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(withRouter(App)));
export default expd;


// WEBPACK FOOTER //
// src/components/App.js