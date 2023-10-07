"use client"

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

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
                <form>
                    <label>
                        Username:
                        <input type="text" name="username" />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </CodeBlockContainer>
        </LoginContainer>
    );
}
