import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { Button, Divider, Input, Typography } from 'antd';
import CredentialDto from '../model/CredentialDto';
import { loginUser } from "../api/uams";
import { login } from "../redux/authenticationSlice";

const { Text } = Typography;

function handleLogin(credentialDto, dispatch, navigate) {
    loginUser(credentialDto).then(() => {
        dispatch(login(credentialDto.getUsername()));
        navigate("/channel-data");
    }).catch(error => {
        if (error.response.status === 401 | 404) {
            alert(error.response.data.message);
        } else {
            console.log(error);
        }
    });
} 

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return(
        <div className="login">
            <Input type='text'
                placeholder="Username"
                onChange={event => {
                    event.preventDefault();
                    setUsername(event.target.value)
                }}
                style={{ width: 325 }}
            />
            <Divider style={{ margin: 5, border: 'none' }}/>
            <Input type='text'
                placeholder="Password"
                onChange={event => {
                    event.preventDefault();
                    setPassword(event.target.value)
                }}
                style={{ width: 325 }}
            />
            <Divider style={{ margin: 5, border: 'none' }}/>
            <Button type="primary" 
                style={{ width: 175 }}
                onClick={() => {
                    handleLogin(new CredentialDto(username, password), dispatch, navigate)
                }}
            >
                Login
            </Button>
            <Divider style={{ margin: 5, border: 'none' }}/>
            <Text>No account? </Text>
            <Link to="/register">REGISTER</Link>
        </div>
    );
}

export default Login;