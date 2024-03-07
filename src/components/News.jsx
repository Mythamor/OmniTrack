import React, { useState } from 'react';
import moment from 'moment';
import { Select, Typography, Card, Avatar, Row, Col, Spin } from 'antd';
import { SmileTwoTone, XOutlined } from '@ant-design/icons';

import { useGetFinancialNewsQuery } from '../services/newsApi';
import { useGetMarketTrendsQuery } from '../services/financeApi';
import Loader  from './Loader';


const { Text } = Typography;
const { Option } = Select;
const { Meta } = Card;

const demoImage = "../images/forex.jpeg";

const News = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [newsCategory, setNewsCategory] = useState('Kenya-financial-news');
  const { data: trendingNews } = useGetFinancialNewsQuery( newsCategory);
  const { data } = useGetMarketTrendsQuery();

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(demoImage);
  };


  // Function to Extract a word from the url
  const getWordFromUrl = (url) => {
    const domain = url.split('.')[1];
    return domain.split('.')[0];
  };

  console.log(trendingNews);

  if (!trendingNews?.data) {
    return <Loader />;
  };

  // Limit the number of news to display
  const newsLimit = trendingNews?.data.slice(0, 10) ?? [];

  return (
    <>
      <br/>
      <Row gutter={[24, 24]}>
            <Col span={24}>
                <Select style={{ width: 300 }}
                  showSearch
                  className='select-news'
                  placeholder='What news are you interested in?'
                  optionFilterProp='children'
                  onChange={(value) => setNewsCategory(value)}
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                  <Option value='Kenya-financial-news'>Kenya's Financial Market</Option>
                  <Option value='political-developments-in-Kenya'>Political Developments in Kenya</Option>
                  <Option value="global-financial-updates">Global Financial Updates</Option>
                  <Option value="strategic-investment-insights">Strategic Investment Insights</Option>
                  <Option value="latest-in-cryptocurrency-trends">Latest in Cryptocurrency Trends</Option>
                  <Option value="key-economic-indicators">Key Economic Indicators</Option>
                  <Option value="stock-market-highlights">Market Highlights and Analysis</Option>
                  <Option value="forex-market-updates">Forex Market Updates</Option>
                  <Option value = "what-is-trending-in-Kenya">Trending Topics in Kenya</Option>
                  {data?.data?.trends.map((trend) => <Option value={trend.name}>{trend.name}</Option>)}
                </Select>
            </Col>
        {trendingNews.data.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <a href={news?.link} target='_blank' rel='noreferrer'>
              <Card
                hoverable
                style={{ width: 300 }}
                cover={
                  <Spin spinning={!imageLoaded}>
                    <img
                      alt="trendingNews"
                      src={news?.photo_url || demoImage}
                    style={{ maxWidth: '100%', maxHeight: '200px'}}
                      onLoad={handleImageLoaded}
                      onError={handleImageError}
                    />
                </Spin>
                  }
                actions={[
                  <a class="twitter-share-button"
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(news?.title)}`}
                    data-size="large"
                    target='_blank' 
                    rel='noreferrer'>
                  <XOutlined key="share"/><br/>Tweet
                  </a>,
                  <Text type='secondary'><SmileTwoTone key="Like"></SmileTwoTone><br/>Like</Text>,
                  <Text type='secondary'><SmileTwoTone key="Dislike" rotate={180}></SmileTwoTone><br/>Dislike</Text>,
                ]}
              >
                <Meta hoverable
                  avatar={<Avatar src={news?.source_favicon_url}/>}
                  title=''
                  description={<><span style={{ fontWeight: 'bold' }}>{getWordFromUrl(news?.source_url)}</span> 
                              <br/><span>{moment(news.published_datetime_utc).startOf('ss').fromNow()}</span>
                  <br/>
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#808080' }}>{news?.title}</span></>}
                />
                {/*<Text>{moment(news.published_datetime_utc).startOf('ss').fromNow()}</Text>*/}
              </Card>
            </a>
          </Col>
        ))}
      </Row> 
      
    </>
  )
}
export default News;
