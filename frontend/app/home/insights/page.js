"use client";

import React from 'react';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const InsightsPage = () => {
    return (
        <div style={{
            width: '100vw',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(to right, #e6f7ff, #ffffff)'
        }}>
            <Title level={2}>🔍 Insights</Title>
            <Text strong style={{ fontSize: '18px', textAlign: 'center' }}>
                Currently, it's as clear as mud here. <br />
                We're digging deep to bring clarity! <br />
                Shine a light soon.
            </Text>
        </div>
    );
};

export default InsightsPage;
