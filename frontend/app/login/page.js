"use client"

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import {Button, Typography} from "antd";
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import { Input } from 'antd';

const {Title} = Typography;

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
  align-content: center;
`;

const LoginButton = styled(Button)`
  max-width: 150px;
`;

export default function LoginPage() {
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

                    <LoginSubscript>Please enter your details</LoginSubscript>

                    <InputContainer>
                        <Input size="large" placeholder="john.doe@example.com" prefix={<UserOutlined />} />
                    </InputContainer>
                    <InputContainer>
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined />}
                            placeholder="Your password."
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </InputContainer>
                    <ButtonContainer>
                        <LoginButton type="primary"  block>Login</LoginButton>
                    </ButtonContainer>
                </LoginInnerContainer>
            </CodeBlockContainer>
        </LoginContainer>
    );
}
