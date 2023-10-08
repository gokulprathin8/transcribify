"use client";

import React, { useState } from 'react';
import { Upload, Button, Input, message, Card, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const FileUploader = () => {
    const [fileUrl, setFileUrl] = useState('');

    const handleFileChange = info => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const handleUrlSubmit = () => {
        if (fileUrl) {
            message.success(`File URL set to ${fileUrl}`);
        } else {
            message.error('Please enter a valid URL.');
        }
    };

    const cardStyle = {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #e6f7ff, #b3d4e0)'
    };

    return (
        <Card bordered={false} style={cardStyle}>
            <Title level={2}>Upload Your File or Provide a URL</Title>
            <Upload
                onChange={handleFileChange}
                showUploadList={false}
            >
                <Button 
                    icon={<UploadOutlined />} 
                    style={{ background: '#b3d4e0', border: 'none', marginBottom: '1rem' }}
                    ghost
                >
                    Upload File
                </Button>
            </Upload>
            <Input
                placeholder="Or enter a URL"
                value={fileUrl}
                onChange={e => setFileUrl(e.target.value)}
                style={{ width: 300, marginTop: 20, borderRadius: '8px' }}
            />
            <Button
                type="primary"
                onClick={handleUrlSubmit}
                style={{ marginTop: 20, background: '#b3d4e0', border: 'none', borderRadius: '8px' }}
            >
                Submit URL
            </Button>
        </Card>
    );
};

export default FileUploader;
