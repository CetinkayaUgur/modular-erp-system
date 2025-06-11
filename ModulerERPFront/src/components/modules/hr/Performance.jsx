import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, InputNumber, message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import './Performance.css';

const Performance = () => {
  const [performanceReviews, setPerformanceReviews] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPerformanceReviews();
  }, []);

  const fetchPerformanceReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:50502/api/hr/PerformanceReviews/');
      setPerformanceReviews(response.data);
      setError(null);
    } catch (err) {
      setError('Performans değerlendirmeleri yüklenirken bir hata oluştu');
      console.error('Error fetching performance reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = {
        employeeId: values.employeeId,
        date: values.date.format('YYYY-MM-DD'),
        score: values.score,
        comment: values.comment
      };

      if (editingId) {
        await axios.post('http://localhost:50502/api/hr/PerformanceReviews/review/save', {
          ...formData,
          id: editingId
        });
        message.success('Performans değerlendirmesi başarıyla güncellendi');
      } else {
        await axios.post('http://localhost:50502/api/hr/PerformanceReviews/review/save', formData);
        message.success('Performans değerlendirmesi başarıyla oluşturuldu');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingId(null);
      fetchPerformanceReviews();
    } catch (err) {
      message.error('Bir hata oluştu');
      console.error('Error submitting performance review:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:50502/api/hr/PerformanceReviews/review/delete/${id}`);
      message.success('Performans değerlendirmesi başarıyla silindi');
      fetchPerformanceReviews();
    } catch (err) {
      message.error('Silme işlemi başarısız oldu');
      console.error('Error deleting performance review:', err);
    }
  };

  const columns = [
    {
      title: 'Çalışan ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
    },
    {
      title: 'Tarih',
      dataIndex: 'date',
      key: 'date',
      render: (date) => dayjs(date).format('DD.MM.YYYY')
    },
    {
      title: 'Puan',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Yorum',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button 
            type="primary" 
            onClick={() => {
              setEditingId(record.id);
              form.setFieldsValue({
                employeeId: record.employeeId,
                date: dayjs(record.date),
                score: record.score,
                comment: record.comment
              });
              setIsModalVisible(true);
            }}
            style={{ marginRight: 8 }}
          >
            Düzenle
          </Button>
          <Button 
            danger 
            onClick={() => handleDelete(record.id)}
          >
            Sil
          </Button>
        </>
      ),
    },
  ];

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="performance-module"
    >
      <div className="performance-header">
        <h2>Performans Değerlendirme Yönetimi</h2>
        <Button 
          type="primary" 
          onClick={() => {
            setEditingId(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Yeni Değerlendirme Ekle
        </Button>
      </div>

      <div className="performance-content">
        <Table 
          columns={columns} 
          dataSource={performanceReviews} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>

      <Modal
        title={editingId ? "Performans Değerlendirmesi Düzenle" : "Yeni Performans Değerlendirmesi"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingId(null);
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            score: 0
          }}
        >
          <Form.Item
            name="employeeId"
            label="Çalışan ID"
            rules={[{ required: true, message: 'Lütfen çalışan ID giriniz' }]}
                    >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="date"
            label="Değerlendirme Tarihi"
            rules={[{ required: true, message: 'Lütfen tarih seçiniz' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD.MM.YYYY" />
          </Form.Item>

          <Form.Item
            name="score"
            label="Puan"
            rules={[{ required: true, message: 'Lütfen puan giriniz' }]}
                          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="comment"
            label="Yorum"
            rules={[{ required: true, message: 'Lütfen yorum giriniz' }]}
                    >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              {editingId ? 'Güncelle' : 'Kaydet'}
            </Button>
            <Button onClick={() => {
              setIsModalVisible(false);
              form.resetFields();
              setEditingId(null);
            }}>
              İptal
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Performance; 