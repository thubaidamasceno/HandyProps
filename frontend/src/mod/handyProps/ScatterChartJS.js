import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as op from "object-path";
import {act} from "./modconf";
import fields from './fields';
import {Scatter, Chart, defaults} from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import * as im from "object-path-immutable";

Chart.register(zoomPlugin);
defaults.animation = false;

const formatterEng_ = (new Intl.NumberFormat('pt-BR',
    {style: 'decimal', maximumFractionDigits: 3, maximumSignificantDigits: 4, notation: 'engineering'})).format;
const formatter = (new Intl.NumberFormat('pt-BR',
    {style: 'decimal', maximumFractionDigits: 3, maximumSignificantDigits: 4})).format;
const formatterEng = v => (!(v >= 1e3 || v <= (-1e3) ||
    (v > (-1e-1) && v < (1e-1))) ? formatter(v).toLowerCase() : formatterEng_(v).toLowerCase());

function _ScatterChart() {
    const data = useSelector(state => op.get(state, `handyProps.data`));
    const colors = useSelector(state => op.get(state, `handyProps.colors`));
    const colorLabels = useSelector(state => op.get(state, `handyProps.colorLabels`));
    const ref = useRef();
    const chartSelected = useSelector(state => op.get(state, `handyProps.chartSelected`));
    // const chartList = useSelector(state => op.get(state, `handyProps.chartList`));
    const chartDef = useSelector(state => op.get(state, `handyProps.chartList.${chartSelected}`));
    let chartData = [];
    // const dispatch = useDispatch();

    let datasets = {};
    if (data && chartDef) {
        data.forEach((m, idx) => {
            if (op.get(m, 'IsGroup') && op.get(m, 'HasData')) {
                let color = op.get(m, 'Color', '_');
                if (!datasets[color])
                    datasets[color] = {
                        label: colorLabels[color],
                        fill: false,
                        data: [],
                        backgroundColor: op.get(colors, color),
                    };
                datasets[color].data.push({
                    x: op.get(m, chartDef.axisX),
                    y: op.get(m, chartDef.axisY),
                    Name: op.get(m, chartDef.Name),
                    idx
                });
            }
        });
    }
    let data_ = {
        datasets: (() => {
            let dc = [];
            for (let k in datasets)
                dc.push(datasets[k]);
            return dc;
        })()
    };

    const footer = (tooltipItems) => {
        let sum = 0;

        tooltipItems.forEach(function (tooltipItem) {
            sum += tooltipItem.parsed.y;
        });
        return 'Sum: ' + sum;
    };
    const getOrCreateTooltip = (chart) => {
        let tooltipEl = chart.canvas.parentNode.querySelector('div');
        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.style.background = 'rgba(0, 0, 0, 0.9)';
            tooltipEl.style.borderRadius = '3px';
            tooltipEl.style.color = 'white';
            tooltipEl.style.opacity = 1;
            tooltipEl.style.pointerEvents = 'none';
            tooltipEl.style.position = 'absolute';
            // tooltipEl.style.transform = 'translate(-50%, 0)';
            tooltipEl.style.transform = 'translate(10px, 0)';
            tooltipEl.style.transition = 'all .1s ease';

            const table = document.createElement('table');
            table.style.margin = '0px';

            tooltipEl.appendChild(table);
            chart.canvas.parentNode.appendChild(tooltipEl);
        }
        return tooltipEl;
    };

    const externalTooltipHandler = (context) => {
        // Tooltip Element
        const {chart, tooltip} = context;
        const tooltipEl = getOrCreateTooltip(chart);

        // Hide if no tooltip
        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
        }

        const bodyLines = tooltip.dataPoints;
        // console.log(bodyLines)
        // Set Text
        if (tooltip.body) {
            const titleLines = tooltip.title || [];
            // const bodyLines = tooltip.body.map(b => b.lines);
            const tableHead = document.createElement('thead');

            titleLines.forEach(title => {
                const tr = document.createElement('tr');
                tr.style.borderWidth = 0;

                const th = document.createElement('th');
                th.style.borderWidth = 0;
                const text = document.createTextNode(title);

                th.appendChild(text);
                tr.appendChild(th);
                tableHead.appendChild(tr);
            });

            const tableBody = document.createElement('tbody');
            let itens = 0;
            const limit = 5;
            if (bodyLines)
                bodyLines.forEach((body, i) => {
                    if (itens < limit) {
                        itens++;
                        const colors = tooltip.labelColors[i];

                        const span = document.createElement('span');
                        span.style.background = colors.backgroundColor;
                        span.style.borderColor = colors.borderColor;
                        span.style.borderWidth = '1px';
                        span.style.marginRight = '5px';
                        span.style.height = '5px';
                        span.style.width = '5px';
                        span.style.display = 'inline-block';

                        const tr = document.createElement('tr');
                        tr.style.backgroundColor = 'inherit';
                        tr.style.borderWidth = 0;

                        const td = document.createElement('td');
                        td.style.borderWidth = 0;

                        const text = document.createTextNode(data[body.raw.idx].Name
                            + ' (' + formatterEng(body.raw.x) + ' / ' + formatterEng(body.raw.y) + ')'
                        );
                        // const text = document.createTextNode(data[body.raw.idx].Name);

                        td.appendChild(span);
                        td.appendChild(text);
                        tr.appendChild(td);
                        tableBody.appendChild(tr);
                    } else if (limit === itens && bodyLines.length > limit) {
                        itens++;
                        const tr = document.createElement('tr');
                        const td = document.createElement('td');
                        const text = document.createTextNode(`e outros ${bodyLines.length - limit}`);
                        td.appendChild(text);
                        tr.appendChild(td);
                        tableBody.appendChild(tr)

                    }
                });

            const tableRoot = tooltipEl.querySelector('table');

            // Remove old children
            while (tableRoot.firstChild) {
                tableRoot.firstChild.remove();
            }

            // Add new children
            tableRoot.appendChild(tableHead);
            tableRoot.appendChild(tableBody);
        }

        const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = positionX + tooltip.caretX + 'px';
        tooltipEl.style.top = positionY + tooltip.caretY + 'px';
        tooltipEl.style.font = tooltip.options.bodyFont.string;
        tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
    };

    const optionsx = {
        // limits: {
        //     x: {min: -200, max: 200, minRange: 50},
        //     y: {min: -200, max: 200, minRange: 50}
        // },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: op.get(fields, [op.get(chartDef, 'axisX'), 'pt'], op.get(chartDef, 'axisX')) +
                        (a => a ? ` (${a})` : '')(op.get(fields, [op.get(chartDef, 'axisX'), 'unid'])),
                },
                type: op.get(chartDef, 'isXlog') ? 'logarithmic' : 'linear',
                ticks: {
                    callback: (val, index, ticks) => formatterEng(val),
                },
                // grid: {
                //     borderColor: 'blue',
                //     color: 'rgba( 0, 0, 0, 0.1)',
                // },
                // position: 'top',
                // reverse: true,
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: op.get(fields, [op.get(chartDef, 'axisY'), 'pt'], op.get(chartDef, 'axisY')) +
                        (a => a ? ` (${a})` : '')(op.get(fields, [op.get(chartDef, 'axisY'), 'unid'])),
                },
                type: (op.get(chartDef, 'isYlog') ? 'logarithmic' : 'linear'),
                ticks: {
                    callback: (val, index, ticks) =>  formatterEng(val),
                },
                // grid: {
                //     borderColor: 'green',
                //     color: 'rgba( 0, 0, 0, 0.1)',
                // },
                // position: 'right',
                // reverse: true,
            }
        },
        interaction: {intersect: true, mode: 'point',},
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {display: true, text: op.get(chartDef, 'name'),},
            tooltip: {
                enabled: false,
                position: 'nearest',
                xAlign: 'right',
                yAlign: 'center',
                external: externalTooltipHandler
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    drag: {
                        enabled: true
                    },
                    mode: 'xy',
                    overScaleMode: '',
                },
                pan: {
                    enabled: true,
                    mode: 'xy',
                    overScaleMode: 'xy',
                },
            },
        },
        onClick(e) {
            const chart = e.chart;
            chart.resetZoom();
        }
    };

    return (
        <Scatter
            ref={ref}
            data={data_}
            options={optionsx}
        />
    );
}

export default _ScatterChart;

// todo: exportar gráfico como .svg
// // Exports the graph as embedded JS or PNG
// exportChart(asSVG) {
//
//     // A Recharts component is rendered as a div that contains namely an SVG
//     // which holds the chart. We can access this SVG by calling upon the first child/
//     let chartSVG = ReactDOM.findDOMNode(this.currentChart).children[0];
//
//     if (asSVG) {
//         let svgURL = new XMLSerializer().serializeToString(chartSVG);
//         let svgBlob = new Blob([svgURL], {type: "image/svg+xml;charset=utf-8"});
//         FileSaver.saveAs(svgBlob, this.state.uuid + ".svg");
//     } else {
//         let svgBlob = new Blob([chartSVG.outerHTML], {type: "text/html;charset=utf-8"});
//         FileSaver.saveAs(svgBlob, this.state.uuid + ".html");
//     }
// }