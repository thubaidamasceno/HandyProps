import React, {useState, useEffect, useRef} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useSelector, useDispatch} from 'react-redux';
import * as op from "object-path";
import {act} from "./modconf";


function DataSource() {
    // const processing = useSelector(state => op.get(state, `handyProps.processing`));
    // const dispatch = useDispatch();

    // useEffect(() => {}, []);

    return <>
        <div className="test-header">
            <div className="example-section">
                <button
                    // onClick={() => saveState()}
                >Salvar Perfil</button>
                <button
                    // onClick={() => restoreState()}
                >Carregar Perfil</button>
                <button
                    // onClick={() => resetState()}
                >Reiniciar Perfil</button>
            </div>
        </div>
    </>;
}

export default DataSource;