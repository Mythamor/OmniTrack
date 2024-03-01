import React, { useState, useEffect } from 'react';
import { Col, Space } from 'antd';
import { DatePicker, TimePicker, Select } from 'antd';
import Data from '../assets/forex.csv';
import { Line } from 'react-chartjs-2';
import Papa from 'papaparse';
import moment from 'moment';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const { Option } = Select;

const PickerWithType = ({ type, onChange }) => {

    const defaultDate = moment();
  
    if (type === 'time') return <TimePicker onChange={onChange} />;
    if (type === 'date') return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} defaultValue={defaultDate} />
  }
  


const LineChartt = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    
    });

    const [chartOptions, setChartOptions] = useState({});
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [selectedValueType, setSelectedValueType] = useState('');
    const [selectedDate, setSelectedDate] = useState(moment());
    const [type, setType] = useState('date');

    const handleDateChange = (value) => {
        setSelectedDate(value);
      }


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

        <>
            <h2>Exchange Rate Line Chart</h2>
            <br />
            <Col span={24}>
            <Space style={{ display: 'flex'}}>
                <Select
                    value={type} 
                    onChange={setType}>
                <Option value="date">Date</Option>
                <Option value="week">Week</Option>
                <Option value="month">Month</Option>
                <Option value="quarter">Quarter</Option>
                <Option value="year">Year</Option>
                <Option value="time">Time</Option>
                </Select>
                <PickerWithType type={type} onChange={handleDateChange} selectedDate={selectedDate} />
            </Space>
            </Col>
            <br />
            <div>
                <Col span={12}>
                    <Select 
                        style={{ width: 150 }}
                        value={selectedCurrency} 
                        onChange={handleCurrencyChange}>
                    <Option value="US DOLLAR">USD</Option>
                    <Option value="STG POUND">STERLING POUND</Option>
                    <Option value="EURO">EUR</Option>
                    </Select>
                </Col>
                <br />
                <Col span={12}>
                    <Select 
                        style={{ width: 150 }}
                        value={selectedValueType} 
                        onChange={handleValueTypeChange}>
                    <Option value="Buy">Buy</Option>
                    <Option value="Sell">Sell</Option>
                    <Option value="Mean">Mean</Option>  
                    </Select>
                </Col>
            </div>
            <div>
                {
                    chartData && chartData.datasets && chartData.datasets.length > 0 ? (
                        <Line data={chartData} Options={chartOptions} />
                    ) : (
                        <div>Loading...</div>
                    )
                }
            </div>
            
        </>
             
    );
};

export default LineChartt;