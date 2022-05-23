import React from "react";

import { Divider, Typography, Row, Col, } from 'antd';

import { formatStringToNumber } from "../utils/string-utils";

const { Title } = Typography;

function ChannelDataGrid(props) {
    return(
        <div className="channel-data-grid" style={{ display: props.displayStatus }}>
            <Divider/>
            <Row>
                <Col span={8}>
                    <Title level={2}>Subscribers:</Title>
                </Col>
                <Col span={8}>
                    <Title level={2}>Views:</Title>
                </Col>
                <Col span={8}>
                    <Title level={2}>Videos:</Title>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Title level={3}>{ formatStringToNumber(props.subscribersCount) }</Title>
                </Col>
                <Col span={8}>
                    <Title level={3}>{ formatStringToNumber(props.viewsCount) }</Title>
                </Col>
                <Col span={8}>
                    <Title level={3}>{ formatStringToNumber(props.videosCount) }</Title>
                </Col>
            </Row>
        </div>
    );
}

export default ChannelDataGrid;
