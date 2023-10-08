"use client";

import React, {useEffect, useState} from 'react';
import { Row, Col, Card, Table, Calendar, Typography, Button, Space } from 'antd';
import {
  FileTextOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  AppstoreAddOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import {BACKEND_SERVER_URL} from "@/app/store/constants";
import useAuthStore from "@/app/store/authStore";
import useAnnotationStore from "@/app/store/annotationStore";
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

const fetchMeetings = async (token) => {
  const response = await fetch(`${BACKEND_SERVER_URL}/meetings/transcriptions/`, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(`Failed to fetch meetings: ${response.status}`);
  }
}


const DashboardPage = () => {
  const router = useRouter();
  const userToken = useAuthStore((state) => state.token);
  const [meetings, setMeetings] = useState([]);
  const setAnnotationDetails = useAnnotationStore((state) => state.setAnnotationDetails)

  useEffect(() => {
    fetchMeetings(userToken).then((data) => {
      setMeetings(data);
    }).catch((error) => {
      console.error("There was an error fetching meetings:", error);
    });
  }, []);

  
  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      render: text => <Text strong>{text}</Text>,
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      render: text => <Text strong>{text}</Text>,
    },
    {
      title: 'Transcription ID',
      dataIndex: 'transcription_id',
      render: text => <Text strong>{text}</Text>,
    },
    {
      title: 'Transcription URL',
      dataIndex: 'transcription_url',
      render: text => <Text strong>{text}</Text>,
    }
  ];
  
  return (
    <div style={{ padding: '40px', background: 'linear-gradient(to right, #e6f7ff, #ffffff)' }}>
      <Title level={1}>Dashboard</Title>
      <Row gutter={16}>
        {/* Function to generate card components */}
        {[
          { icon: <FileTextOutlined style={{ fontSize: '52px', color: '#1890ff' }} />, title: 'Notes', count: '20' },
          { icon: <CalendarOutlined style={{ fontSize: '52px', color: '#1890ff' }} />, title: 'Meetings', count: '10' },
          { icon: <ClockCircleOutlined style={{ fontSize: '52px', color: '#1890ff' }} />, title: 'Upcoming Meetings', count: '5' },
          { icon: <AppstoreAddOutlined style={{ fontSize: '52px', color: '#1890ff' }} />, title: 'Meetings Category', count: '3' },
        ].map(({ icon, title, count }) => (
          <Col span={6} key={title}>
            <Card hoverable style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {icon}
                <Text style={{ fontSize: '24px', marginLeft: '10px' }}>{count}</Text>
              </div>
              <Text strong style={{ marginTop: '10px', fontSize: '18px' }}>{title}</Text>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Meetings History */}
      <div style={{ marginTop: '60px', marginBottom: '20px' }}>
        <Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={2}>Meetings History</Title>
          <Button 
            type="default" 
            icon={<ReloadOutlined style={{ fontSize: '20px' }} />} 
            onClick={() => {
              // Add your refresh functionality here
              console.log("Refreshed!");
            }}
          />
        </Space>
        <Table
            columns={columns}
            dataSource={meetings}
            pagination={false}
            onRow={(record, rowIndex) => ({
              onClick: () => {
                setAnnotationDetails(record['meeting']['video_url'], record['transcription_url']);
                console.log(record);
                router.push("/home/annotation")
              },
            })}
        />
      </div>

      {/* Calendar */}
      <div style={{ marginTop: '60px', marginBottom: '20px' }}>
        <Title level={2}>Calendar</Title>
        <div style={{ border: '1px solid #f0f0f0', borderRadius: '4px', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)' }}>
          <Calendar fullscreen={false} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;