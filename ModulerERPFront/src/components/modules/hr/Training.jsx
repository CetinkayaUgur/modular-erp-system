import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, DatePicker, message } from 'antd';
import './Training.css';
import dayjs from 'dayjs';

const { TextArea } = Input;

const Training = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  const columns = [
    {
      title: 'Eğitim Adı',
      dataIndex: 'trainingName',
      key: 'trainingName',
    },
    {
      title: 'Eğitim Tarihi',
      dataIndex: 'trainingDate',
      key: 'trainingDate',
      render: (date) => new Date(date).toLocaleDateString('tr-TR')
    },
    {
      title: 'Eğitmen',
      dataIndex: 'trainer',
      key: 'trainer',
    },
    {
      title: 'Açıklama',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Düzenle
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Sil
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:50502/api/hr/trainings');
      setTrainings(response.data);
      setError(null);
    } catch (err) {
      setError('Eğitimler yüklenirken bir hata oluştu.');
      console.error('Error fetching trainings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = {
        ...values,
        trainingDate: values.trainingDate.format('YYYY-MM-DD')
      };

      if (editingId) {
        await axios.post('http://localhost:50502/api/hr/trainings/training/save', {
          ...formData,
          id: editingId
        });
        message.success('Eğitim başarıyla güncellendi');
      } else {
        await axios.post('http://localhost:50502/api/hr/trainings/training/save', formData);
        message.success('Eğitim başarıyla oluşturuldu');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingId(null);
      fetchTrainings();
    } catch (err) {
      message.error('Bir hata oluştu');
      console.error('Error submitting training:', err);
    }
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    form.setFieldsValue({
      ...record,
      trainingDate: record.trainingDate ? dayjs(record.trainingDate) : null
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:50502/api/hr/trainings/training/delete/${id}`);
      message.success('Eğitim başarıyla silindi');
      fetchTrainings();
    } catch (err) {
      message.error('Silme işlemi başarısız oldu');
      console.error('Error deleting training:', err);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="training-module">
      <h2>Eğitim Yönetimi</h2>
      
      <div className="trainings-details">
        <div className="trainings-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3>Eğitim Listesi</h3>
            <Button type="primary" onClick={handleAdd}>
              Yeni Eğitim Ekle
            </Button>
          </div>
          
          <Table 
            columns={columns} 
            dataSource={trainings} 
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>

      <Modal
        title={editingId ? "Eğitimi Düzenle" : "Yeni Eğitim"}
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
        >
          <Form.Item
            name="trainingName"
            label="Eğitim Adı"
            rules={[{ required: true, message: 'Lütfen eğitim adını giriniz' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="trainingDate"
            label="Eğitim Tarihi"
            rules={[{ required: true, message: 'Lütfen eğitim tarihini seçiniz' }]}
                    >
            <DatePicker style={{ width: '100%' }} format="DD.MM.YYYY" />
          </Form.Item>

          <Form.Item
            name="trainer"
            label="Eğitmen"
            rules={[{ required: true, message: 'Lütfen eğitmen adını giriniz' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Açıklama"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingId ? 'Güncelle' : 'Oluştur'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      </div>
  );
};

export default Training; 