import { Suspense } from 'react';
import { Outlet } from "react-router-dom";
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import HeaderLayout from './Header';
import FooterLayout from './Footer';
import LayoutStyled from './Style'
const { Content } = Layout;

function LayoutMain() {
  return (
    <LayoutStyled>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout">
          <HeaderLayout />
          <Content style={{ margin: "0 16px" }}>
            <div className="site-layout-background"  style={{ padding: 24, minHeight: 360 }} >
                <Outlet />
            </div>
          </Content>
          <FooterLayout />
        </Layout>
      </Layout>
    </LayoutStyled>
  );
}

export default LayoutMain;
