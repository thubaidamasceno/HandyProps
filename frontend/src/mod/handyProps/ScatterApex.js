import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as op from "object-path";
import {act} from "./modconf";
import fields from './fields';

import Chart from 'react-apexcharts';

function _ScatterChart() {
    const data = useSelector(state => op.get(state, `handyProps.data`));
    const chartSelected = useSelector(state => op.get(state, `handyProps.chartSelected`));
    const chartDef = useSelector(state => op.get(state, `handyProps.chartList.${chartSelected}`));
    let series = [{name: "", data: []}];


    let options = {
        chart: {
            // height: 150,
            type: 'scatter',
            animations: {
                enabled: false,
                animateGradually: {
                    enabled: false,
                },
                dynamicAnimation: {
                    enabled: false,
                }
            },
            zoom: {
                enabled: true,
                type: 'xy',
            }
        },
        responsive: [{
            breakpoint: undefined,
            options: {},
        }],
        xaxis: {
            tickAmount: 10,
            logarithmic: true,
            title: {
                text: "teste X",
            },
            labels: {
                formatter: function (val) {
                    return parseFloat(val).toExponential(1)
                }
            }
        },
        yaxis: {
            logarithmic: true,
            tickAmount: 7,
            labels: {
                formatter: function (val) {
                    return parseFloat(val).toExponential(1)
                }
            },
            title: {
                text: "teste Y",
            }
        },
        markers: {
            size: 3,
        },
    };


    if (data && chartDef) {
        series[0].data = data.map(m => ([op.get(m, chartDef.axisX), op.get(m, chartDef.axisY)]));
    }


    return (
        <Chart
            options={options}
            series={series}
            type="scatter"
            height={320}
        />
    );
}

export default _ScatterChart;

// todo: exportar gráfico como .svg
