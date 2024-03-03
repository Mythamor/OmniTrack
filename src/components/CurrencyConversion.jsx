import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import moment from 'moment';
import CurrencyAPI from '@everapi/currencyapi-js';
import Loader from './Loader';

const { Title, Text } = Typography;

const CurrencyConversion = () => {
    const [lastUpdated, setLastUpdated] = useState('');
    const [baseCurrency, setBaseCurrency] = useState('KES');
    const [targetCurrencies, setTargetCurrencies] = useState('USD,GBP,EUR,AED,CAD,JPY,ZAR,NGN,UGX,TZS,RWF');
    const [currencyRates, setCurrencyRates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const currencyApiKey = process.env.REACT_APP_CURRENCY_API_KEY;
    const currencyApi = new CurrencyAPI(currencyApiKey);
    
    useEffect(() => {
        currencyApi.latest().then(response => {
            const updatedTimestamp = response.meta?.last_updated_at;
            setLastUpdated(updatedTimestamp);
        }).catch(error => {
            console.error('Error fetching currency data:', error);
        });
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await currencyApi.latest({
                base_currency: baseCurrency.trim(),
                currencies: targetCurrencies.replaceAll(' ', '')
            });

            const rates = Object.keys(response?.data).map(currency => {
                let value = response.data[currency]?.value;

                if (currency !== 'NGN' && currency !== 'UGX' && currency !== 'TZS' && currency !== 'RWF') {
                    value = (1 / value).toFixed(2);
                } else {
                    value = value.toFixed(2);
                }

                return { currency, value };
            });

            setCurrencyRates(rates);
        } catch (error) {
            console.error('Error fetching currency rates:', error);
        }

        setIsLoading(false);
    };

    return (
        <>
            <header>
                <Title level={4}>Currency Conversion Rates against KES</Title>
                {lastUpdated && <Text type="secondary">Last updated at {moment({lastUpdated}).format('YYYY-MM-DD HH:mm:ss')}</Text>}
            </header>
            <br />
            <body className="bg-gradient-to-b from-cyan-800 to-slate-800 min-h-screen py-5">
                <br /><br />
                <form
                    onSubmit={handleSubmit}
                    className="mx-auto w-full max-w-sm bg-white shadow rounded-md p-5 space-y-3 text-sm"
                >
                    <div className="flex items-center justify-between space-x-5">
                        <label htmlFor="base_currency_input">Base currency:</label>
                        <input
                            type="text"
                            id="base_currency_input"
                            name="base_currency"
                            value={baseCurrency}
                            onChange={(e) => setBaseCurrency(e.target.value)}
                            className="border-slate-300 border rounded-md py-2 px-4 text-sm"
                        />
                    </div>
                    <br />
                    <div className="flex items-center justify-between space-x-5">
                        <label htmlFor="currencies">Target currencies:</label>
                        <input
                            type="text"
                            id="currencies"
                            name="currencies"
                            value={targetCurrencies}
                            onChange={(e) => setTargetCurrencies(e.target.value)}
                            className="border-slate-300 border rounded-md py-2 px-4 text-sm"
                        />
                    </div>
                    <br />
                    <button
                        type="submit"
                        className="bg-slate-800 text-white rounded-md py-2 px-4 mx-auto relative block"
                    >
                        Get Latest Rates
                    </button>
                </form>
                <div
                    id="latest_rates_display"
                    className="mx-auto my-5 w-full max-w-sm bg-white shadow rounded-md px-5 py-3 text-sm empty:hidden divide-y divide-dotted divide-slate-300"
                >
                    {isLoading ? (
                        <Loader />
                    ) : (
                        currencyRates.map((rate, index) => (
                            <div key={index} className="flex items-center justify-between py-2">
                                <strong>{rate.currency}:</strong>
                                <span>{rate.value}</span>
                            </div>
                        ))
                    )}
                </div>
            </body>
        </>
    );
};

export default CurrencyConversion;
