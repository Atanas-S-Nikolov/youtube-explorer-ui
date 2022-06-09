import React from 'react';

import { Layout, Menu } from 'antd';

const {Header} = Layout;
const items = [
    {
        key: "/",
        label: "Login"
    },
    {
        key: "/about",
        label: "About"
    }
];

function AppHeader() {
    return(
        <Header>
            <Menu 
                items={items}
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[window.location.pathname]}
            />
        </Header>
    );
}

export default AppHeader;
