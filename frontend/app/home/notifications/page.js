"use client";

import React from 'react';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const NotificationsPage = () => {
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
            <Title level={2}>🔔 Notifications</Title>
            <Text strong style={{ fontSize: '18px', textAlign: 'center' }}>
                Currently silent as a library. <br />
                We're working on making some noise! <br />
                Check back soon.
            </Text>
        </div>
    );
};

export default NotificationsPage;
