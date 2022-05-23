import { Layout } from 'antd';

import ChannelData from './components/ChannelData';

import AppHeader from './components/AppHeader';

import './App.css';
import 'antd/dist/antd.css';

const {Content} = Layout;

function App() {
  return (
    <Layout>
      <AppHeader/>
      <Content>
        <ChannelData/>
      </Content>
    </Layout>
  );
}

export default App;
