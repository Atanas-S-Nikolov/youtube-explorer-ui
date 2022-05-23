import React from 'react';

import { Typography, Divider } from 'antd';

const { Title } = Typography;

function EmbeddedVideoPlayer(props) {
    return(
        <div className='embedded-video-player' style={{ display: props.displayStatus }}>
            <Divider/>
            <Title level={2}>{props.label}</Title>
            <iframe title={props.videoTitle} width="400" height="200" src={`https://www.youtube.com/embed/${props.videoId}`} allowFullScreen/>
        </div>
    );
}

export default EmbeddedVideoPlayer;
