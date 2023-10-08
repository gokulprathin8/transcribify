"use client";

import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Button, Input, Upload, Avatar, Icon } from "antd";
import { UserOutlined } from "@ant-design/icons";

import useAuthStore from "@/app/store/authStore";
import {BACKEND_SERVER_URL} from "@/app/store/constants";

const StyledButton = styled(Button)`
  margin: 0 10px; // Horizontal space between buttons
  padding: 12px 36px; // Increased padding for larger button size
  font-size: 24px; // Larger font size
  height: auto; // Let the button's height adjust to its content
  border-radius: 25px; // Rounded corners
`;

const ProfileBody = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #74a1c1;
`;

const ProfileInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  width: calc(100% - 150px);
  height: calc(100vh - 200px);
  margin: 30px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
`;

const DetailSection = styled.div`
  flex: 6; // 60% of the horizontal space
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 60px;
`;

const PhotoSection = styled.div`
  flex: 4; // 40% of the horizontal space
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
`;

const UploadContainer = styled.div`
  margin-top: 40px;
`;

const ProfileInput = styled(Input)`
  margin: 15px 0;
`;

const NameGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ProfileTitle = styled.div`
  font-size: 64px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  margin-bottom: 10px;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  max-height: 600px;
  padding: 60px 60px 0px 60px;
`;

const ProfileButton = styled(Button)`
  margin: 0 10px;
  padding: 12px 36px;
  font-size: 24px;
  height: auto;
  border-radius: 25px;
`;

const profileData = async (token) => {
  return await fetch(`${BACKEND_SERVER_URL}/accounts/current_profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`
    }
  });
}

function ProfilePage() {
  let [getUserState, setUserState] = useState({});
  const userToken = useAuthStore((state) => state.token);

  useEffect( () => {
    profileData(userToken).then(r => {
      console.log(r.json(), 'test');
    });
  }, []);

  return (
    <ProfileBody>
      <ProfileInnerContainer>
        <TopSection>
          <DetailSection>
            <ProfileTitle>Profile</ProfileTitle>
            <ProfileInput
              size="large"
              placeholder="Username"
              prefix={<UserOutlined />}
            />
            <NameGroup>
              <ProfileInput
                style={{ width: "49.5%" }}
                placeholder="First name"
                // value="1"
              />
              <ProfileInput
                style={{ width: "49.5%" }}
                placeholder="Last name"
              />
            </NameGroup>
            <ProfileInput size="large" placeholder="Age" />
            <ProfileInput
              size="large"
              placeholder="Website"
              prefix={<Icon type="link" />}
            />
          </DetailSection>
          <PhotoSection>
            <Avatar size={256} icon={<UserOutlined />} />
            <UploadContainer>
              <Upload>
                <Button>
                  <Icon type="upload" /> Upload Picture
                </Button>
              </Upload>
            </UploadContainer>
          </PhotoSection>
        </TopSection>
        <ButtonGroup>
          <ProfileButton
            type="primary"
            style={{ backgroundColor: "green", borderColor: "green" }}
          >
            Save
          </ProfileButton>
          <ProfileButton type="primary" danger>
            Log Out
          </ProfileButton>
        </ButtonGroup>
      </ProfileInnerContainer>
    </ProfileBody>
  );
}

export default ProfilePage;
