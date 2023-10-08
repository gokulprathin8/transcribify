"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Button, Typography } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { Input } from "antd";

const { Title } = Typography;

const RegisterContainer = styled.div`
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

const RegisterInnerContainer = styled.div`
  margin-left: 8rem;
  margin-top: 8rem;
`;

const InputContainer = styled.div`
  max-width: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const NamesWrapper = styled.div`
  display: flex;
//   justify-content: ; // Use flex-start instead of space-between
  max-width: 100%;
  margin-top: 20px;
`;

const NameContainer = styled.div`
  max-width: 50%; // Increase to occupy more space
  margin-right: 2%; // Add a bit of margin to the right of each container for spacing
`;

const RegisterSubscript = styled.p`
  color: darkgray;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-content: center;
`;

const RegisterButton = styled(Button)`
  max-width: 150px;
`;

function RegisterPage() {
  return (
    <RegisterContainer>
      <ImageContainer>
        <Image
          src="/static/register-page.jpg"
          alt="Image Description"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </ImageContainer>

      <CodeBlockContainer>
        <RegisterInnerContainer>
          <Title level={1}>Get started!</Title>

          <RegisterSubscript>Please enter your details</RegisterSubscript>
          <NamesWrapper>
            <NameContainer>
              <Input
                size="large"
                placeholder="Kujo"
                prefix={<UserOutlined />}
              />
            </NameContainer>
            <NameContainer>
              <Input
                size="large"
                placeholder="Jotaro"
                prefix={<UserOutlined />}
              />
            </NameContainer>
          </NamesWrapper>

          <InputContainer>
            <Input
              size="large"
              placeholder="john.doe@example.com"
              prefix={<UserOutlined />}
            />
          </InputContainer>
          <InputContainer>
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Your password."
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </InputContainer>
          <ButtonContainer>
            <RegisterButton type="primary" block>
              Register
            </RegisterButton>
          </ButtonContainer>
        </RegisterInnerContainer>
      </CodeBlockContainer>
    </RegisterContainer>
  );
}

export default RegisterPage;
