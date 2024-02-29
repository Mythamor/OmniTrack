import React, { useState, useEffect } from 'react';
import { Col } from 'antd';
import Data from '../assets/forex.csv';
import { Line } from 'react-chartjs-2';
import Papa from 'papaparse';
import moment from 'moment';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



const LineChartt = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    
    });

    const [chartOptions, setChartOptions] = useState({});
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [selectedValueType, setSelectedValueType] = useState('');
    const [timePeriod, setTimePeriod] = useState('7d');

    const time =['24h', '7d', '30d', '90d', '3m' ,'6 m', '1y', '3y', '5y', '10y'];


    useEffect(() => {
        const fetchData = async () => {
           Papa.parse(Data, {
                download: true,
                header: true,
                dynamicTYping: true,
                delimiter: "",
                complete: (results) => {
                    console.log(results);

                    const filteredData = results.data.filter((row) => row['Currency'] === selectedCurrency);
                    const labels = results.data.map((row) => moment(row['Date']).format('MM/DD/YY'));
                    const data = filteredData.map((row) => row[selectedValueType]);


                    setChartData({
                        labels,
                        datasets: [{
                            label: `${selectedValueType} for ${selectedCurrency}`,
                            data,
                            backgroundColor: '#0071bd',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false
                        }]
                    });
                    setChartOptions({
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
                                text: `Exchange Rate Line Chart for ${selectedCurrency}`
                            }
                        },
                    });
                    
                }
            });
        };

        fetchData();
    }, [selectedCurrency, selectedValueType]);

    const handleCurrencyChange = (e) => {
        setSelectedCurrency(e.target.value);
    }

    const handleValueTypeChange = (e) => {
        setSelectedValueType(e.target.value);
    }

    return (

        <div>
            <h2>Exchange Rate Line Chart</h2>
            <Col span={24}>
                <select 
                    defaultValue="7d" 
                    className='select-timeperiod' 
                    placeholder="Select Time Period"
                    value={timePeriod} 
                    onChange={(value) => setTimePeriod(value)}>
                    {time.map((date) => (
                        <option key={date}>{date}</option>
                    ))}
                </select>
            </Col>
            <br />
            <div>
                <Col span={12}>
                    <select value={selectedCurrency} onChange={handleCurrencyChange}>
                        <option value="US DOLLAR">USD</option>
                        <option value="STG POUND">STERLING POUND</option>
                        <option value="EURO">EUR</option>
                    </select>
                </Col>
                <Col span={12}>
                    <select value={selectedValueType} onChange={handleValueTypeChange}>
                        <option value="Buy">Buy</option>
                        <option value="Sell">Sell</option>
                        <option value="Mean">Mean</option>
                        
                    </select>
                </Col>
            </div>
            <div>
                {
                    chartData && chartData.datasets && chartData.datasets.length > 0 ? (
                        <Line data={chartData} options={chartOptions} />
                    ) : (
                        <div>Loading...</div>
                    )
                }
            </div>
            
        </div>
             
    );
};

export default LineChartt;
