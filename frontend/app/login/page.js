"use client"

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Button, Typography, Input } from "antd";
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import useAuthStore from '../store/authStore';
import {BACKEND_SERVER_URL} from "@/app/store/constants";

const { Title } = Typography;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 30%;
  height: 100%;
`;

const CodeBlockContainer = styled.div`
  flex: 1;
`;

const LoginInnerContainer = styled.div`
  margin-left: 8rem;
  margin-top: 8rem;
`;

const InputContainer = styled.div`
  max-width: 50%;
  margin-top: 20px;
`;

const LoginSubscript = styled.p`
  color: darkgray;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
  align-content: center;
`;

const LoginButton = styled(Button)`
  max-width: 150px;
`;

function LoginPage() {
    const { login } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const response = await fetch(`${BACKEND_SERVER_URL}/accounts/login/`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (response.ok) {
            login(data.user, data.token);
        } else {
            // Handle errors
            console.error("Login failed", data);
        }
    };

    return (
        <LoginContainer>
            <ImageContainer>
                <Image
                    src="/static/login-page.jpg"
                    alt="Image Description"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                />
            </ImageContainer>
            <CodeBlockContainer>
                <LoginInnerContainer>
                    <Title level={1}>Welcome back!</Title>
                    <InputContainer>
                        <Input
                            size="large"
                            placeholder="john.doe@example.com"
                            prefix={<UserOutlined />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined />}
                            placeholder="Your password."
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputContainer>
                    <ButtonContainer>
                        <LoginButton type="primary" block onClick={handleLogin}>
                            Login
                        </LoginButton>
                    </ButtonContainer>
                </LoginInnerContainer>
            </CodeBlockContainer>
        </LoginContainer>
    );
}

export default LoginPage;
