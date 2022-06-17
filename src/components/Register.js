import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button, Divider, Input } from 'antd';

import RegisterDto from "../model/RegisterDto";
import { registerUser } from "../api/uams";

function handleRegister(registerDto, navigate) {
    registerUser(registerDto).then(() => {
        alert("User registered successfully!");
        navigate("/login");
    }).catch(error => {
        if (error.response.status === 409) {
            alert(error.response.data.message);
        } else {
            console.log(error);
        }
    });
} 

function Register() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return(
        <div className="register">
            <Input type='text'
                placeholder="Name"
                onChange={event => {
                    event.preventDefault();
                    setName(event.target.value)
                }}
                style={{ width: 325 }}
            />
            <Divider style={{ margin: 5, border: 'none' }}/>
            <Input type='text'
                placeholder="Last name"
                onChange={event => {
                    event.preventDefault();
                    setLastName(event.target.value)
                }}
                style={{ width: 325 }}
            />
            <Divider style={{ margin: 5, border: 'none' }}/>
            <Input type='text'
                placeholder="Username"
                onChange={event => {
                    event.preventDefault();
                    setUsername(event.target.value)
                }}
                style={{ width: 325 }}
            />
            <Divider style={{ margin: 5, border: 'none' }}/>
            <Input.Password type='text'
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
                onClick={() => handleRegister(new RegisterDto(name, lastName, username, password), navigate)}
            >
                Register
            </Button>
            <Divider style={{ margin: 5, border: 'none' }}/>
        </div>
    );
}

export default Register;