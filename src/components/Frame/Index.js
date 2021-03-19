import React from 'react'
import { Layout, Menu, Dropdown,Avatar,message ,Badge} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import {adminRoutes} from '../../routes/index';
import {clearToken} from '../../utils/auth'
import logo from './logo.svg';
import "./frame.css"
import {connect} from 'react-redux';

const { Header, Content, Sider } = Layout;


const routes=adminRoutes.filter(route=>route.isShow);





function Index(props){

    const popMenu=(
        <Menu onClick={(p)=>{
            if(p.key === 'logout'){
                clearToken();
                props.history.push('/login');
            }else{
                if(p.key === 'noti'){

                    props.history.push('/admin/notice');
                }

            }
        }}>
            <Menu.Item key="noti">通知中心</Menu.Item>
            <Menu.Item key="setting">设置</Menu.Item>
            <Menu.Item key="logout">退出</Menu.Item>
        </Menu>
    )

    return (
        <div>

            <Layout>
                <Header className="header">
                    <div className="logo" >
                            <img src={logo} alt="logo" style={{width:"50px",height:"50px"}}/>
                    </div>
                    <Dropdown overlay={popMenu}>
                        <div>
                            <Avatar>U</Avatar>
                            <Badge dot={!props.isAllRead}><span style={{color:'#fff'}}>超级管理员<DownOutlined /></span></Badge>
                        </div>

                    </Dropdown>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {routes.map(route=>{
                                return (<Menu.Item key={route.path} onClick={p=>props.history.push(p.key)}>{route.title}</Menu.Item>);
                            })}
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 16px 16px' }}>

                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
}

export default connect(state=>state.notice)(withRouter(Index));