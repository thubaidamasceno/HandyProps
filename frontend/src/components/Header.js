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
                <a href="https://thubaidamasceno.github.io/HandyProps/" target="_blank" className="navbar-brand">
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
                </a>
                {/*<div width={"100%"}>*/}
                <span className="navbar-brand">
                   <a href="http://damasceno.pro" className="navbar-brand">© 2021 Thubaí Damasceno</a>
                   <br/>
                   <a href="https://thubaidamasceno.github.io/HandyProps/" target="_blank" className="navbar-brand"><center><span
                       style={{fontSize: 'small', textDecoration: 'underline', marginBottom: '10px'}}>saiba mais sobre esse projeto</span></center></a>
               </span>
                {/*Saiba mais*/}
                {/*<a href="https://thubaidamasceno.github.io/HandyProps/" className="">sobre o HandyProps</a>*/}
                {/*</div>*/}
            </header>
        );
    }
;

export default Expd;