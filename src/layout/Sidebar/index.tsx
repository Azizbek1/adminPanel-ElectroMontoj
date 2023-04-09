import React, { ReactElement, useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { items } from './sidebarMenu';
import SiderbarStyled from './Style'
// import { removeLocalStorage } from 'src/settings/localstorage/localStorage';
const { Sider } = Layout;

function Sidebar(): ReactElement {

    const [resizeTo, setResize] = useState(window.innerWidth)

    // Navigate
    const navigate = useNavigate()


    // onClick MenuSidebar 
    const onClick: MenuProps['onClick'] = ({ key }) => {
        if (key === 'sigout') {
            // СДЕЛАТЬ / функция выхода здесь 
            // removeLocalStorage('status')
            // removeLocalStorage('isAuth')
            // removeLocalStorage('user-session')
            navigate('/')
            window.location.reload()
        } else {
            navigate(key)
        }
    };
    useEffect(() => {
        window.addEventListener('resize', (e) => {
            const resize = window.innerWidth
            setResize(resize)
        })
    }, [])
    return (
        <SiderbarStyled>
            <Sider
                breakpoint="lg"
                collapsedWidth="50"
                onBreakpoint={(/* broken */) => {
                    // console.log(broken);
                }}
                onCollapse={(/* collapsed, type */) => {
                    // console.log(collapsed, type);
                }}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="electroTitle" style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }}>
                    Электро монтаж
                </div>
                <Menu theme='dark' mode="inline" onClick={onClick} defaultSelectedKeys={[window.location.pathname]} items={items} />
            </Sider>
        </SiderbarStyled>

    )
}

export default Sidebar
