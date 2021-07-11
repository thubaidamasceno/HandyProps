import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-bootstrap.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useSelector, useDispatch} from 'react-redux';
import * as op from "object-path";
import {act} from "./modconf";
import fields from './fields';
import CustomTooltip from './customTooltip';

const formatterEng_ = (new Intl.NumberFormat('pt-BR',
    {style: 'decimal', maximumFractionDigits: 3, maximumSignificantDigits: 4, notation: 'engineering'})).format;
const formatter = (new Intl.NumberFormat('pt-BR',
    {style: 'decimal', maximumFractionDigits: 3, maximumSignificantDigits: 4})).format;
const formatterEng = v => (!(v >= 1e3 || v <= (-1e3) ||
    (v > (-1e-1) && v < (1e-1))) ? formatter(v).toLowerCase() : formatterEng_(v).toLowerCase());//
const numberFormatter = (params) => {
    if (params.value) {
        return formatterEng(params.value);
    }
    return '';
};


function _DataGrid() {
    const processing = useSelector(state => op.get(state, `handyProps.processing`));
    const loaded = useSelector(state => op.get(state, `handyProps.loaded`));
    const dataSize = useSelector(state => op.get(state, `handyProps.dataSize`));
    const data = useSelector(state => op.get(state, `handyProps.data`));
    const gridColumns = useSelector(state => op.get(state, `handyProps.gridColumns`));

    const dispatch = useDispatch();
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    useEffect(() => {
        // let p = {
        //     type: act.hp.loadDataSources,
        //     // payload: apiActs.list({}),
        // };
        // dispatch(p);
    }, []);

    const columns = (f => {
        let r = [];
        for (let k in f) {
            if (f[k].g) {
                let vf = undefined, tp = undefined;
                if (f[k].n) {
                    vf = numberFormatter;
                    tp = 'numericColumn'
                }
                r.push(
                    <AgGridColumn
                        field={k}
                        sortable={true}
                        headerName={f[k].pt}
                        headerTooltip={f[k].pt}
                        hide={!gridColumns[k].visible}
                        // tooltipComponent="customTooltip"
                        tooltipField={k}
                        key={k}
                        type={tp}
                        valueFormatter={vf}
                    />);
            }
        }
        return r;
    })(fields);

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    const saveState = () => {
        window.colState = gridColumnApi.getColumnState();
        console.log('column state saved');
    };
    const restoreState = () => {
        if (!window.colState) {
            console.log('no columns state to restore by, you must save state first');
            return;
        }
        gridColumnApi.applyColumnState({
            state: window.colState,
            applyOrder: true,
        });
        console.log('column state restored');
    };

    const resetState = () => {
        gridColumnApi.resetColumnState();
        console.log('column state reset');
    };

    return <div className="test-container">
        <div
            id="myGrid"
            style={{
                height: '100%',
                width: '100%',
            }}
            className="ag-theme-bootstrap"
        >
            <AgGridReact
                rowData={data}
                frameworkComponents={{customTooltip: CustomTooltip}}
                defaultColDef={{
                    sortable: true,
                    resizable: true,
                    width: 100,
                    //enableRowGroup: true,
                    //enablePivot: true,
                    //enableValue: true,
                }}
                sideBar={{toolPanels: ['columns']}}
                rowGroupPanelShow='always'
                pivotPanelShow='always'
                onGridReady={onGridReady}
                // applyColumnDefOrder={true}
            >
                {columns}
            </AgGridReact>
        </div>
    </div>;
}

export default _DataGrid;
