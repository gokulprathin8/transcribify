"use client";

import React, {useState} from "react";
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
import {BACKEND_SERVER_URL} from "@/app/store/constants";

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
  max-width: 50%;
  margin-right: 2%;
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

const RegistrationSuccessful = styled(Title)`
  margin-top: 25px;
  margin-left: 50px;
`;

function RegisterPage() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = async () => {
    const response = await fetch(`${BACKEND_SERVER_URL}/accounts/register/`, {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setRegistrationSuccess(true);
    }

    const data = await response.json();
  };


  return (
      <RegisterContainer>
        <ImageContainer>
          {/* Your image JSX here */}
        </ImageContainer>
        <CodeBlockContainer>
          <RegisterInnerContainer>
            <Title level={1}>Get started!</Title>
            <RegisterSubscript>Please enter your details</RegisterSubscript>

            {/* First Name and Last Name */}
            <NamesWrapper>
              <NameContainer>
                <Input
                    size="large"
                    placeholder="First Name"
                    prefix={<UserOutlined />}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
              </NameContainer>
              <NameContainer>
                <Input
                    size="large"
                    placeholder="Last Name"
                    prefix={<UserOutlined />}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
              </NameContainer>
            </NamesWrapper>

            {/* Email */}
            <InputContainer>
              <Input
                  size="large"
                  placeholder="john.doe@example.com"
                  prefix={<UserOutlined />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>

            {/* Password */}
            <InputContainer>
              <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </InputContainer>

            {/* Register Button */}
            <ButtonContainer>
              <RegisterButton type="primary" block onClick={handleRegister}>
                Register
              </RegisterButton>
            </ButtonContainer>
            {registrationSuccess ? <div>
              <RegistrationSuccessful level={4}>Registration Successful!</RegistrationSuccessful>
              <RegistrationSuccessful level={4}>Proceed to <a href="/login">Login Page</a></RegistrationSuccessful>
            </div> : null}

          </RegisterInnerContainer>
        </CodeBlockContainer>
      </RegisterContainer>
  );
}

export default RegisterPage;
