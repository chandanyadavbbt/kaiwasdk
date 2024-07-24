// src/components/GraphData.js

import React, { useState, useEffect } from 'react';
import 'chart.js/auto';
import {Bar,Doughnut,Line} from "react-chartjs-2"

const GraphData = ({ messageContent }) => {
    const [graphData, setGraphData] = useState([]);
    const [primaryKey, setPrimaryKey] = useState('');
    const [keys, setKeys] = useState([]);
    const [emptyGraph, setEmptyGraph] = useState(false);
    const [graphMessage, setGraphMessage] = useState("");

    useEffect(() => {
        if (messageContent.includes('JSONdata')) {
            const parts = messageContent.split('JSONdata');
            const afterJSONdata = parts[1].trim();
            const message = parts[0];
            setGraphMessage(message);
            try {
                const parseData = JSON.parse(afterJSONdata);
                setGraphData(parseData);

                if (parseData.length > 0) {
                    const keys = Object.keys(parseData[0]);
                    setPrimaryKey(keys[0]);
                    setKeys(keys.slice(1));
                } else {
                    setEmptyGraph(true);
                }
            } catch (error) {
                console.error('Error parsing JSON data:', error);
                setEmptyGraph(true);
            }
        } else {
            console.warn('No JSONdata found in the message content');
            setEmptyGraph(true);
        }
    }, [messageContent]);

    const primaryLabels = graphData.map(item => item[primaryKey]);

    const createChartData = (key) => ({
        labels: primaryLabels,
        datasets: [
            {
                label: key.charAt(0).toUpperCase() + key.slice(1),
                data: graphData.map(item => item[key]),
                backgroundColor: graphData.map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`),
            },
        ],
    });

    const chartOptions = (title) => ({
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
    });

    return (
        <>
            <div className="graph-container">
                {emptyGraph ? (
                    <div className="no-data">
                        <p>No Visual data for this response</p>
                    </div>
                ) : (
                    <>
                      
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>{primaryKey}</th>
                                        {keys.map((key, index) => (
                                            <th key={index}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {graphData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item[primaryKey]}</td>
                                            {keys.map((key, i) => (
                                                <td key={i}>{item[key]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="charts-container">
                            {keys.map(key => (
                                <div key={key} className="chart">
                                    <Line
                                        data={createChartData(key)}
                                        options={chartOptions(`${primaryKey.charAt(0).toUpperCase() + primaryKey.slice(1)} vs ${key.charAt(0).toUpperCase() + key.slice(1)}`)}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default GraphData;
