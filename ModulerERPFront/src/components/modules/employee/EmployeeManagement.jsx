import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Switch, message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import './EmployeeManagement.css';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:50502/api/hr/employees');
      setEmployees(response.data);
      setError(null);
    } catch (err) {
      console.error('Hata detayları:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      let errorMessage = 'Çalışanlar yüklenirken bir hata oluştu.';
      
      if (err.response) {
        const errorData = err.response.data;
        if (typeof errorData === 'object') {
          errorMessage += ` Hata: ${JSON.stringify(errorData)}`;
        } else {
          errorMessage += ` Hata: ${errorData || err.response.statusText}`;
        }
      } else if (err.request) {
        errorMessage += ' Sunucuya ulaşılamıyor.';
      } else {
        errorMessage += ` ${err.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      console.log('Form değerleri:', values);

      const formData = {
        ...values,
        hireDate: values.hireDate.format('YYYY-MM-DD'),
        isActive: values.isActive ?? true // Eğer isActive değeri yoksa varsayılan olarak true
      };

      console.log('Gönderilecek veri:', formData);

      if (editingId) {
        const response = await axios.post('http://localhost:50502/api/hr/employees/employee/save', {
          ...formData,
          id: editingId
        });
        console.log('Güncelleme yanıtı:', response.data);
        message.success('Çalışan başarıyla güncellendi');
      } else {
        const response = await axios.post('http://localhost:50502/api/hr/employees/employee/save', formData);
        console.log('Kayıt yanıtı:', response.data);
        message.success('Çalışan başarıyla oluşturuldu');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingId(null);
      fetchEmployees();
    } catch (err) {
      console.error('Hata detayları:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        config: err.config
      });
      
      let errorMessage = 'İşlem sırasında bir hata oluştu.';
      
      if (err.response) {
        const errorData = err.response.data;
        if (typeof errorData === 'object') {
          errorMessage += ` Hata: ${JSON.stringify(errorData)}`;
        } else {
          errorMessage += ` Hata: ${errorData || err.response.statusText}`;
        }
      } else if (err.request) {
        errorMessage += ' Sunucuya ulaşılamıyor.';
      } else {
        errorMessage += ` ${err.message}`;
      }
      
      message.error(errorMessage);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:50502/api/hr/employees/employee/delete/${id}`);
      message.success('Çalışan başarıyla silindi');
      fetchEmployees();
    } catch (err) {
      console.error('Hata detayları:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      let errorMessage = 'Silme işlemi sırasında bir hata oluştu.';
      
      if (err.response) {
        const errorData = err.response.data;
        if (typeof errorData === 'object') {
          errorMessage += ` Hata: ${JSON.stringify(errorData)}`;
        } else {
          errorMessage += ` Hata: ${errorData || err.response.statusText}`;
        }
      } else if (err.request) {
        errorMessage += ' Sunucuya ulaşılamıyor.';
      } else {
        errorMessage += ` ${err.message}`;
      }
      
      message.error(errorMessage);
    }
  };

  const columns = [
    {
      title: 'Ad',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Soyad',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'TC Kimlik No',
      dataIndex: 'nationalId',
      key: 'nationalId',
    },
    {
      title: 'Telefon',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'E-posta',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Pozisyon',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'İşe Başlama Tarihi',
      dataIndex: 'hireDate',
      key: 'hireDate',
      render: (date) => dayjs(date).format('DD.MM.YYYY')
    },
    {
      title: 'Durum',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <span className={`status-badge ${isActive ? 'status-active' : 'status-inactive'}`}>
          {isActive ? 'Aktif' : 'Pasif'}
        </span>
      )
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
                ...record,
                hireDate: dayjs(record.hireDate)
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

  return (
    <div className="employee-module">
      <div className="employee-header">
        <h2>Çalışan Yönetimi</h2>
        <Button type="primary" onClick={() => {
          setEditingId(null);
          form.resetFields();
          setIsModalVisible(true);
        }}>
          Yeni Çalışan Ekle
        </Button>
      </div>

      {loading ? (
        <div className="loading">Yükleniyor...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <Table 
          dataSource={employees} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
          columns={columns}
        />
      )}

      <Modal
        title={editingId ? "Çalışan Düzenle" : "Yeni Çalışan Ekle"}
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
          initialValues={{ isActive: true }}
        >
          <Form.Item
            name="firstName"
            label="Ad"
            rules={[{ required: true, message: 'Lütfen adı giriniz' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Soyad"
            rules={[{ required: true, message: 'Lütfen soyadı giriniz' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="nationalId"
            label="TC Kimlik No"
            rules={[
              { required: true, message: 'Lütfen TC kimlik numarasını giriniz' },
              { len: 11, message: 'TC kimlik numarası 11 haneli olmalıdır' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Telefon"
            rules={[{ required: true, message: 'Lütfen telefon numarasını giriniz' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-posta"
            rules={[
              { required: true, message: 'Lütfen e-posta adresini giriniz' },
              { type: 'email', message: 'Geçerli bir e-posta adresi giriniz' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="position"
            label="Pozisyon"
            rules={[{ required: true, message: 'Lütfen pozisyonu giriniz' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="hireDate"
            label="İşe Başlama Tarihi"
            rules={[{ required: true, message: 'Lütfen işe başlama tarihini seçiniz' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="isActive"
            label="Durum"
            valuePropName="checked"
          >
            <Switch 
              checkedChildren="Aktif" 
              unCheckedChildren="Pasif" 
              defaultChecked 
            />
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
    </div>
  );
};

export default EmployeeManagement; 