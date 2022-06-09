import './App.css';
import 'antd/dist/antd.css';

import { Layout } from 'antd';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppHeader from './components/AppHeader';
import Login from './components/Login';
import Register from './components/Register';
import ChannelData from './components/ChannelData';

const {Content} = Layout;

function App() {
  return (
    <Layout>
      <AppHeader />
      <Content>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/channel-data' element={<ChannelData />}/>
          </Routes>
        </BrowserRouter>
      </Content>
    </Layout>
  );
}

export default App;
