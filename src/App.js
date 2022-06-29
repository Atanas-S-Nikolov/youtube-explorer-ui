import './App.css';
import 'antd/dist/antd.css';

import { Layout } from 'antd';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ChannelData from './components/ChannelData';
import Menu from './components/Menu';

const {Content, Footer} = Layout;

function App() {
  return (
    <Layout>
      <Content>
        <BrowserRouter>
          <Menu/>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/channel-data' element={<ChannelData />}/>
          </Routes>
        </BrowserRouter>
      </Content>
      <Footer className='footer'style={{backgroundColor: "white"}}>Copyright © 2022 YouTube Explorer. All rights reserved.</Footer>
    </Layout>
  );
}

export default App;
