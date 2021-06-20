import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as op from "object-path";
import {act} from "./modconf";
import fields from './fields';
import {Scatter, Chart, defaults} from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);
defaults.animation = false;

const optionsx = {
    // scales: {
    //     yAxes: [
    //         {
    //             ticks: {
    //                 beginAtZero: true,
    //             },
    //         },
    //     ],
    // },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        zoom: {
            zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true
                },
                mode: 'xy',
            }
        }
    },
};


function _ScatterChart() {
    const chartData = useSelector(state => op.get(state, `handyProps.chartData`));
    // const dispatch = useDispatch();

    let data =  {
        datasets: [
            {
                label: 'Materiais',
                data: chartData,
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };;

    return (
        <Scatter
            data={data}
            options={optionsx}
        />
    );
}

export default _ScatterChart;