import {Layout, Model, TabNode, IJsonModel} from 'flexlayout-react';
import './App.css';
// import 'flexlayout-react/style/light.css';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as op from "object-path";
// import {apiActs} from "./reducers";
import EditDialog from './EditDialog';
import {act} from './modconf'

import Chart from './ScatterChartJS';
// import Chart from './ScatterApex';
//
import DataGrid from './DataGridAG';
import Filtro from './Filtro';
import DataSource from './DataSource';
import Properties from './Properties';
import ChartOpts from './ChartOpts';
import GridOpts from './GridOpts';
import Opts from './Opts';
import Tree from './Tree';


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
            size: 300,
            "children": [
                {
                    "type": "tab",
                    "enableClose": false,
                    "name": "Propriedades",
                    "component": "properties"
                },
                {
                    "type": "tab",
                    "enableClose": false,
                    "name": "Filtros",
                    "component": "filter"
                },
                // {
                //     "type": "tab",
                //     "enableClose": false,
                //     "name": "Tabelas",
                //     "component": "gridopts"
                // },
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
                    "component": "datasource"
                },
                // {
                //     "type": "tab",
                //     "enableClose": false,
                //     "name": "Agrupamento",
                //     "component": "tree"
                // },
            ]
        }
    ]
};

const model = Model.fromJson(json);

function App() {

    const data = useSelector(state => op.get(state, `handyProps.data`));
    // const clicks = useSelector(state => op.get(state, `handyProps.clicks`));
    const dispatch = useDispatch();

    useEffect(() => {
        let p = {
            type: act.HP_LOADED,
            //payload: apiActs.list({}),
        };
        dispatch(p);
    }, [dispatch]);

    const factory = (node: TabNode) => {
        var component = node.getComponent();
        if (component === "filter") {
            return <>
                <Filtro/>
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
        if (component === "properties") {
            return <Properties/>;
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
        if (component === "tree") {
            return <Tree/>;
        }
    };

    return (
        <>
            < Layout
                model={model}
                factory={factory}
            />
            <EditDialog
                // txt={`Editar Filtro`}
                // visibleP='renaming'
                // yesDisP='invalidRename'
                // closeAct='editClose'
                // inputP='renameText'
                // noAct='renameClose'
                // errorTxt='renameErrors'
            />
        </>)
        ;
}


export default App;