import React, { useState, useEffect } from 'react';
import { Col, Space } from 'antd';
import { DatePicker, TimePicker, Select } from 'antd';
import Data from '../assets/forex_data.csv';
import { Line } from 'react-chartjs-2';
import Papa from 'papaparse';
import moment from 'moment';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const { Option } = Select;


const LineChartt = () => {
    const [chartData, setChartData] = useState({});
    const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'));
  

    useEffect(() => {
        const fetchData = async () => {
           Papa.parse(Data, {
                download: true,
                header: true,
                dynamicTYping: true,
                //delimiter: ,
                complete: (results) => {
                    console.log(results);

                    const filteredData = results.data.sort((a, b) => moment(a.Date).format('YYYY-MM') - moment(b.Date).format('YYYY-MM'));    
                    const labels = results.data.map(entry => entry.Date);
                    const datasets = [{
                            label: `USD Buy Rate`,
                            data: results.data.map(entry => entry.USD_Buy),
                            backgroundColor: '#00B4D8',
                            borderColor: 'blue',
                            borderWidth: 2,
                            fill: false
                        },
                        {
                            label: 'EURO Buy Rate',
                            data: results.data.map(entry => entry.EURO_Buy),
                            backgroundColor: '#DC143C',
                            borderColor: 'red',
                            borderWidth: 2,
                            fill: false
                        },
                        {
                            label: 'GBP Buy Rate',
                            data: results.data.map(entry => entry.GBP_Buy),
                            backgroundColor: '#228B22',
                            borderColor: 'green',
                            borderWidth: 2,
                            fill: false
                        },
                    ];
                    setChartData({
                        labels: labels,
                        datasets: datasets,
                        scales: {
                            yAxes: {
                                ticks: {
                                    beginAtZero: true
                                }
                            }
                        },
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: `Exchange Rate Line Chart for ${selectedMonth}`
                            }
                        },
                    });
                    
                }
            });
        };

            fetchData();
        }, [selectedMonth]);

    const handleMonthChange = (value) => {
        setSelectedMonth(value);
    };

    return (

        <>
            <h1>5 Year Foreign Exchange Rates</h1>
            <br />
            <div>
                {
                    chartData && chartData.datasets && chartData.datasets.length > 0 ? (
                        <Line data={chartData} Options={chartData} />
                    ) : (
                        <div>Loading...</div>
                    )
                }
            </div>
            
        </>
             
    );
};

export default LineChartt;