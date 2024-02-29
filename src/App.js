import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout, Typography, Space, } from "antd";
import { GithubOutlined, LinkedinFilled, XOutlined, MediumSquareFilled} from "@ant-design/icons";

import { Navbar, Homepage, Exchanges, News } from "./components";

import "./App.css";


const App = () => {
    return (
        <div className="app">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Routes>
                            <Route path='/' element={<Homepage/>} />
                            <Route path="/exchange-rates" element={<Exchanges />} />
                            <Route path="/news" element={<News />} />
                        </Routes>
                    </div>
                </Layout>
        
            <div className="footer">
                <Typography.Title level={5} style={{color: 'grey', textAlign: 'center'}}>
                    OmniTrack @{new Date().getFullYear()}. All rights reserved
                </Typography.Title>
                <br />
                <Space>
                    <a href="http://github.com/Mythamor"><GithubOutlined style={{ fontSize: '20px', color: '#08c' }}></GithubOutlined></a>
                    <a href="http://linkedin.com/in/mithamo-beth"><LinkedinFilled style={{ fontSize: '20px', color: '#08c' }}></LinkedinFilled></a>
                    <a href="http://medium.com/@MithamoBeth"><MediumSquareFilled style={{ fontSize: '20px', color: '#08c' }}></MediumSquareFilled></a>
                    <a href="http://twitter.com/justBmm"><XOutlined style={{ fontSize: '20px', color: '#08c' }}></XOutlined></a>
                </Space>
            
            </div>
            </div>
    </div>
    );

};

export default App;