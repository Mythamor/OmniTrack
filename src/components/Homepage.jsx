import React, { useEffect } from 'react';
import moment from 'moment';
import millify from 'millify';
import { Typography,
         Card, 
         Row, 
         Col,
         Statistic,
       } from 'antd';
import { Link } from 'react-router-dom';

// Import components
import FinancialTrends from '../components/FinancialTrends';
import News from '../components/News';


// Import services
import { useGetCurrenciesQuery } from '../services/financeApi';

import Loader from './Loader';
import '../index.css';



const { Title, Text } = Typography;


const Homepage = () => {
  const { data, isFetching } = useGetCurrenciesQuery();
  const currencyData = data?.data?.currency;
  console.log(currencyData);

  // Fetch data and set it to currencyData state
  useEffect(() => {
    // Fetch your currency data here and update state
    // Example: fetchCurrencyData();
  }, []); // Ensure to handle the dependency properly based on your use case

  // Helper function to check if the title contains "shilling" or "franc"
  const isShillingOrFranc = (currency) => {
    return currency?.toLowerCase().includes('shilling') || currency?.toLowerCase().includes('franc');
  }

  if (isFetching) {
    return <Loader />
  }


  return (
    
    <>
      <Title level={3} className='heading'>
        Live Forex Tracking for Kenyan Shilling (KES)
      </Title>
      <Text type='secondary'>
         Last updated {moment(data?.data?.currency[0].last_update_utc).format('YYYY-MM-DD HH:mm:ss')}
      </Text>
      <br />
      <br />
        <Row gutter={[16, 16]}>
        {currencyData?.map((currency) => (
          <><Col xs={24} sm={12} lg={6}>
            <Card bordered={false}>
              <Statistic
                title={currency?.to_currency_name}
                colorText={'#222222'}
                value={isShillingOrFranc(currency?.to_currency_name) ? millify(currency?.exchange_rate) :  millify(1/currency?.exchange_rate)}
                valueStyle={{ color: '#3F8600' }}
                suffix="KES" />
              <br />
              <Statistic
                title='Previous Close'
                colorText={'#85BB65S'}
                value={isShillingOrFranc(currency?.to_currency_name) ? millify(currency?.previous_close) :  millify(1/currency?.previous_close)}
                valueStyle={{ color: '#FF0000' }}
                suffix="KES" />
            </Card>
          </Col></>
        ))} 
        </Row>
        <br /><br />
        <Text type="link">
            <Link to="/currency-conversion">Explore more currency conversions</Link>
        </Text>
        <br /><br /><FinancialTrends simplified /><div className='home-heading-container'>
        <Title level={3} className='heading'>
          Trending News
        </Title>
        <Title level={5} className='show-more'><Link to="/trending-news">Show More</Link></Title>
      </div><div id="financial-markets">
        <News simplified />
      </div><div id="trending-news">
      </div><br /><br />
    </>

  

  )
  
}

export default Homepage;
