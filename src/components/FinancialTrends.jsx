import React, { useState, useEffect, useCallback } from 'react';
import { DollarOutlined} from '@ant-design/icons';
import { Typography, Card, Row, Col, Statistic,} from 'antd';
import { Select } from 'antd';

import { useGetMarketTrendsQuery } from '../services/financeApi';
import Loader from './Loader';

const { Title, Text } = Typography;
const { Option } = Select;



const FinancialTrends = () => {
    const [typeOfTrend, setTypeOfTrend] = useState('');
    const {data, isFetching} = useGetMarketTrendsQuery(typeOfTrend);
    const [selectedCompany, setSelectedCompany] = useState('');
   
   
    console.log(data?.data?.trends);

    // Handle company change
    const handleCompanyChange = useCallback((value) => {
        const selected = data?.data?.trends.find(company => company.name === value);
        setSelectedCompany(selected);
    }, [data]);

    // Set default company
    useEffect(() => {
        if (data?.data?.trends.lengths > 0) {
            setSelectedCompany(data?.data?.trends[0].name);
            handleCompanyChange(data?.data?.trends[0].name);
        }
    }, [data, handleCompanyChange]);


    if (isFetching) {
        return <Loader />
    };
   
    return (
        <>
            <Title level={3} className='heading'>
                Financial Market Trends
            </Title>
            <Text type="secondary">
                Exchange Close at {data?.data?.trends[0].exchange_close} - {data?.data?.trends[0].timezone}
            </Text>
            <br />
            <br />

            <Row>
                <Col span={24}>
                    <Text type="secondary">Select a financial trend</Text>
                    <br/>
                    <Select style={{ width: 300 }}
                    defaultValue={typeOfTrend}
                    showSearch
                    className='select-news'
                    placeholder='What financial trend are you interested in?'
                    optionFilterProp='children'
                    onChange={(value) => setTypeOfTrend(value)}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    <Option value='MOST_ACTIVE'>Most Active</Option>
                    <Option value='MARKET_INDEXES'>Market Indexes</Option>
                    <Option value="GAINERS">Gainers</Option>
                    <Option value="LOSERS">Losers</Option>
                    <Option value="CRYPTO">Crypto</Option>
                    <Option value="CURRENCIES">Currencies</Option>
                    <Option value="CLIMATE_LEADERS">Climate Leaders</Option>
                    </Select>
                    <br />
                    <br />
                </Col>
                <br />
                <br />
                {typeOfTrend && (
                <Col span={24}>
                    <Text type="secondary">Select a company you're curious about</Text>
                    <br/>
                    <Select defaultValue='' onChange={handleCompanyChange} style={{ width: 300 }} >
                        {data?.data?.trends.map(company => (
                        <Option key={company.symbol} value={company.name}>{company.name}</Option>
                        ))}
                    </Select>
                </Col>
                )}
            </Row>
            <br />
            <br />
            {typeOfTrend && selectedCompany && (
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                <Card>
                    <Statistic
                    title={selectedCompany?.name}
                    colorText={'#85BB65S'}
                    value={selectedCompany?.price}
                    valueStyle={{ color: '#0000FF' }}
                    prefix={<DollarOutlined />}
                    suffix=""
                    />
                    <br />
                    <Statistic
                    title="Previous Close"
                    value={selectedCompany?.previous_close}
                    precision={2}
                    valueStyle={{ color: selectedCompany?.previous_close >= 0 ? '#3f8600' : '#cf1322' }}
                    prefix=""
                    suffix=""
                    />
                </Card>
                </Col>
                <Col  xs={24} sm={12} lg={6}>
                <Card>
                    <Statistic
                    title="Symbol"
                    colorText={'#85BB65S'}
                    value={selectedCompany?.symbol}
                    valueStyle={{ color: '#0000FF' }}
                    prefix=""
                    suffix=""
                    />
                    <br />
                    <Statistic
                    title="Market Change"
                    value={selectedCompany?.pre_or_post_market_change_percent}
                    precision={2}
                    valueStyle={{ color: selectedCompany?.pre_or_post_market_change_percent >= 0 ? '#3f8600' : '#cf1322' }}
                    prefix=""
                    suffix="%"
                    />
                </Card>
                </Col>
                <Col  xs={24} sm={12} lg={6}>
                <Card>
                    <Statistic
                    title="Type"
                    colorText={'#85BB65S'}
                    value={selectedCompany?.type}
                    valueStyle={{ color: '#0000FF' }}
                    prefix=""
                    suffix=""
                    />
                    <br />
                    <Statistic
                    title="Change"
                    value={selectedCompany?.change}
                    precision={2}
                    valueStyle={{ color: selectedCompany?.price >= selectedCompany?.previous_close ? '#3f8600' : '#cf1322' }}
                    prefix=""
                    suffix=""
                    />
                </Card>
                </Col>

            </Row>
            )}
            <br />
        </>
    )
}

export default FinancialTrends;
