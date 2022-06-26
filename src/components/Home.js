import React from "react";

import { useNavigate } from "react-router-dom";

import { Card, Typography, Tooltip } from "antd";

import uamsLogo from "../uams-logo.png";

const { Title } = Typography;
const { Meta } = Card;

function Home() {
    const navigate = useNavigate();
    return(
        <div className="home">
            <Title>Login with:</Title>

            <Tooltip title="Login with User Authentication Management Service" placement="bottom">
                <div style={{ width: 200, marginLeft: "auto", marginRight: "auto" }} onClick={() => {navigate("/login")}}>
                    <Card
                        hoverable
                        cover={<img src={uamsLogo} alt="UAMS logo"></img>}
                    >
                        <Meta title="User Authentication Management Service"/>
                    </Card>
                </div>
            </Tooltip>
        </div>
    )
}

export default Home;