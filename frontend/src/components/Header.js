import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import cn from "classnames";
//import BrowserHistory from 'react-router/lib/BrowserHistory';
import {push, goBack} from 'connected-react-router';
import {REDIRECT, SET_SEARCHTXT, SET_PRESEARCHTXT} from "../constants/actionTypes";
import * as op from "object-path";
import classNamesPrefix from "classnames-prefix";

const Expd = () => {
        return (
            <header className="headerbar">
                <Link to="/" className="navbar-brand">
                    <div>
                        <ul className="nav navbar-nav navbar-naver">
                            <li className="nav-item">
                                <img
                                    className="logoimg"
                                    src="/logo_wide.svg"
                                    alt=""
                                />
                            </li>
                        </ul>
                    </div>
                </Link>
                <a href="http://damasceno.pro" className="navbar-brand">© 2021 Thubaí Damasceno</a>
            </header>
        );
    }
;

export default Expd;