import {Layout, Model, TabNode, IJsonModel} from 'flexlayout-react';
import './App.css';
// import 'flexlayout-react/style/light.css';
import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as op from "object-path";
import {apiActs} from "./reducers";

import {act} from './modconf'

import Chart from './ScatterChartJS';
import DataGrid from './DataGridAG';
import Filtro from './Filtro';
import DataSource from './DataSource';
import ChartOpts from './ChartOpts';
import GridOpts from './GridOpts';
import Opts from './Opts';


var json: IJsonModel = {
    global: {
        "tabSetEnableMaximize": true,
        "tabEnableClose": false,
        "tabSetEnableTabStrip": true,
        tabEnableRename: false
    },
    layout: {
        "type": "row",
        "weight": 100,
        "children": [{
            "type": "row",
            "weight": 100,
            "children": [
                {
                    "type": "tabset",
                    "weight": 60,
                    "selected": 0,
                    enableMaximize: true,
                    "children": [
                        {
                            "type": "tab",
                            "name": "Gráfico",
                            enableRename: false,
                            "component": "chart"
                        }
                    ]
                },
                {
                    "type": "tabset",
                    "weight": 40,
                    "selected": 0,
                    enableMaximize: true,
                    "children": [
                        {
                            "type": "tab",
                            "name": "Materiais Selecionados",
                            "component": "datagrid"
                        }
                    ]
                },
            ]
        }
        ]
    },
    "borders": [
        {
            "type": "border",
            "location": "left",
            show: true,
            selected: 0,
            "children": [
                {
                    "type": "tab",
                    "enableClose": false,
                    "name": "Bases de Dados",
                    "component": "datasource"
                },
                {
                    "type": "tab",
                    "enableClose": false,
                    "name": "Filtros",
                    "component": "filter"
                },
                {
                    "type": "tab",
                    "enableClose": false,
                    "name": "Tabelas",
                    "component": "gridopts"
                },
                {
                    "type": "tab",
                    "enableClose": false,
                    "name": "Gráficos",
                    "component": "chartopts"
                },
                {
                    "type": "tab",
                    "enableClose": false,
                    "name": "Opções",
                    "component": "opts"
                }
            ]
        }
    ]
};

const model = Model.fromJson(json);

function App() {

    const data = useSelector(state => op.get(state, `handyProps.data`));
    // const clicks = useSelector(state => op.get(state, `handyProps.clicks`));
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     let p = {
    //         type: act.HP_LOADED,
    //         //payload: apiActs.list({}),
    //     };
    //     dispatch(p);
    // }, []);

    const factory = (node: TabNode) => {
        var component = node.getComponent();
        if (component === "filter") {
            return <>
                <Filtro/>
                {data.length}
            </>;
        }
        if (component === "chart") {
            return <Chart/>;
        }
        if (component === "datagrid") {
            return <DataGrid/>;
        }
        if (component === "datasource") {
            return <DataSource/>;
        }
        if (component === "chartopts") {
            return <ChartOpts/>;
        }
        if (component === "gridopts") {
            return <GridOpts/>;
        }
        if (component === "opts") {
            return <Opts/>;
        }
    };

    return (
        <Layout
            model={model}
            factory={factory}/>
    );
}


export default App;