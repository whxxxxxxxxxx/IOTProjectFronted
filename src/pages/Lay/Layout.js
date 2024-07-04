import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate,Outlet, Navigate } from 'react-router-dom';
import './Layout.css'
const { Header, Sider, Content } = Layout;

const Lay = () => {
    let navigate=useNavigate();
    const [current,setCurrent]=useState('1');
    const onClickMenu=(e)=>{
        setCurrent(e.key)
        switch(e.key){
            case 'Data':
            navigate('/Data')
            break;
            case 'Searchdata':
            navigate('/Searchdata')
            break;
            case 'view':
            navigate('/chart')
            break;
        }
    }
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
    className='Layout'
    style={{
        minHeight: 660,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed} style={{
        backgroundColor:'lightgrey',
      }}>
        <div className="logo">{collapsed?'物':'物联网管理系统'}</div>
        <Menu
         onClick={onClickMenu}
          mode="inline"
          style={{
            backgroundColor:'lightgrey'}}
          defaultSelectedKeys={['1']}
          items={[
            {
              key: 'Data',
              icon: <UserOutlined />,
              label: '数据管理',
            },
            {
              key: 'view',
              icon: <VideoCameraOutlined />,
              label: '数据查看视图',
            },
           
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 660,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
         <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Lay;