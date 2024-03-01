import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link} from "react-router-dom";
import { HomeFilled, ThunderboltFilled, FundFilled, MenuOutlined, DollarCircleFilled } from "@ant-design/icons";

import icon from '../images/logo1.png';

const Navbar = () => {

    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize)
    }, []);

    useEffect(() => {
        if(screenSize < 768) {
            setActiveMenu(false);
        }else {
            setActiveMenu(true);
        }
    }, [screenSize])


    return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar className='icon' src={icon} size="large"/>
            <Typography.Title level={2} className='logo'>
                <Link to='/'>OmniTrack</Link>
            </Typography.Title> 
            <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
                <MenuOutlined />  
            </Button>
        </div>

        {activeMenu && (
            <Menu theme="dark">
                <Menu.Item icon={<HomeFilled style={{fontSize: '16px'}}/>}>
                    <Link to='/'>Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundFilled style={{fontSize: '16px'}} />}>
                    <a href='/#financial-trends'>Financial Trends</a>
                </Menu.Item>
                <Menu.Item icon={<ThunderboltFilled style={{fontSize: '16px'}} />}>
                    <a href='/#trending-news'>Trending News</a>
                </Menu.Item>
                <Menu.Item icon={<DollarCircleFilled style={{fontSize: '16px'}} />}>
                    <Link to='/historical-data'>Historical Data</Link>
                </Menu.Item>
            </Menu>
        )}
    </div>
    )
    }

export default Navbar;
