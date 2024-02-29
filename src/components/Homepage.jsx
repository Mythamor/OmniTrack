import React from 'react';
import moment from 'moment';
import { DollarOutlined, EuroOutlined, PoundOutlined,} from '@ant-design/icons';
import { Typography,
         Space,
         Card, 
         Row, 
         Col, 
         Statistic,
         Button
       } from 'antd';
import { DatePicker, Select, TimePicker } from 'antd';
import { Link } from 'react-router-dom';

// IMport components
import FinancialTrends from '../components/FinancialTrends';
import News from '../components/News';
import { useGetFinancialNewsQuery } from '../services/newsApi';


const { Title, Text } = Typography;
const { Option } = Select;

const PickerWithType = ({ type, onChange }) => {

  const defaultDate = moment();

  if (type === 'time') return <TimePicker onChange={onChange} />;
  if (type === 'date') return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} defaultValue={defaultDate} />
}


const Homepage = () => {
  const [type, setType] = React.useState('date');
  const [selectedDate, setSelectedDate] = React.useState(moment());

  
  const handleDateChange = (value) => {
    setSelectedDate(value);
  }


  return (
   <>
      <Title level={3} className='heading'>
          Real Time Forex Tracking in Kenya
      </Title>
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
        <Button type="primary" onClick='' >
          Today
        </Button>
      </Space>
      <br />
      <br />
      <Row gutter={16}>
        <Col  xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="US DOLLAR"
              colorText={'#85BB65S'}
              value={144}
              valueStyle={{ color: '#3F8600' }}
              prefix={<DollarOutlined />}
              suffix=""
            />
          </Card>
        </Col>
        <Col  xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="EURO"
              value={156}
              valueStyle={{ color: '#3F8600' }}
              prefix={<EuroOutlined />}
              suffix=""
            />
          </Card>
        </Col>
        <Col  xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="STG POUND"
              value={182}
              valueStyle={{ color: '#3F8600' }}
              prefix={<PoundOutlined />}
              suffix=""
            />
          </Card>
        </Col>
      </Row>
      <br />
      <br />
      <FinancialTrends simplified />
      <div className='home-heading-container'>
        <Title level={3} className='heading'>
            Trending News
        </Title>
        <Title level={5} className='show-more'><Link to="/trending-news">Show More</Link></Title>
      </div>
      <div id="financial-trends">
        <News simplified/>
      </div>
      <div id="trending-news">
        <Text type="secondary">
            What's happening in Kenya's financial market
        </Text>
      </div>
      <br />
      <br />

   </>
  )
}

export default Homepage;
