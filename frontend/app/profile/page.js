"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input, Upload, Avatar, Icon } from "antd";
import {
  UserOutlined,
  ArrowLeftOutlined,
  MailOutlined,
  LinkOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

import useAuthStore from "@/app/store/authStore";
import { BACKEND_SERVER_URL } from "@/app/store/constants";

const ProfileBody = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9f1f6; // A softer blue background
`;

const ProfileInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  width: calc(100% - 80px);
  margin: 15px;
  box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
  padding-top: 15px;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 60px;
`;

const DetailSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; // Space between buttons
  margin-top: 30px;
  margin-bottom: 20px;
`;

const ProfileButton = styled(Button)`
  padding: 10px 40px; // Adjusted padding
  font-size: 18px;    // Adjusted font size
  border-radius: 25px; 
  height: auto;       // Allows height to adjust based on content
  align-items: center;  // Vertically align text 
  display: flex;      // Needed for align-items to work
  justify-content: center; // Horizontally center the text
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  svg {
    font-size: 24px;
    color: #333;
    margin-right: 5px;
  }
`;

const ProfileInput = styled(Input)`
  margin: 15px 0;
`;

const ProfileTitle = styled.div`
  font-size: 64px;
  margin-bottom: 10px;
`;

const PhotoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const NameGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const profileData = async (token) => {
  return await fetch(`${BACKEND_SERVER_URL}/accounts/current_profile`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

function ProfilePage() {
  const router = useRouter();
  let [getUserState, setUserState] = useState({});
  const userToken = useAuthStore((state) => state.token);

  useEffect(() => {
    profileData(userToken).then((r) => {
      console.log(r.json(), "test");
    });
  }, []);

  return (
    <ProfileBody>
      <ProfileInnerContainer>
        <BackButton onClick={() => router.back()}>
          <ArrowLeftOutlined />
          Back
        </BackButton>
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
              prefix={<UserOutlined />} // Icon for first name
            />
            <ProfileInput
              style={{ width: "49.5%" }}
              placeholder="Last name"
              prefix={<UserOutlined />} // Icon for last name
            />
          </NameGroup>
          <ProfileInput
            size="large"
            placeholder="Email"
            prefix={<MailOutlined />} // Icon for email
          />
          <ProfileInput
            size="large"
            placeholder="Age"
            prefix={<CalendarOutlined />} // Icon for age
          />
          <ProfileInput
            size="large"
            placeholder="Website"
            prefix={<LinkOutlined />} // Icon for website
          />
        </DetailSection>
        <PhotoSection>
          <Avatar size={256} icon={<UserOutlined />} style={{ marginBottom: "20px" }} /> 
          <Upload>
            <Button>
              <Icon type="upload" /> Upload Picture
            </Button>
          </Upload>
        </PhotoSection>
      </TopSection>
      <ButtonGroup>
        <ProfileButton type="primary" style={{ backgroundColor: "green", borderColor: "green" }}>
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
