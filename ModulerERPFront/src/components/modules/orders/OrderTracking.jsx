import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, InputNumber, Select, message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import './OrderTracking.css';

const { Option } = Select;

// API base URL'ini tanımla
const API_BASE_URL = 'http://localhost:50503';

// Axios instance oluştur
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]); // Müşteri listesi için state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchOrders();
    fetchCustomers(); // Müşteri listesini çek
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Siparişler yükleniyor...');
      const response = await api.get('/api/orders');
      console.log('Backend yanıtı:', response.data);
      
      if (response.data && Array.isArray(response.data)) {
        setOrders(response.data);
        message.success('Siparişler başarıyla yüklendi');
      } else {
        throw new Error('Geçersiz veri formatı');
      }
    } catch (err) {
      console.error('Hata detayları:', err);
      setError('Siparişler yüklenirken bir hata oluştu');
      message.error('Siparişler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/api/ord/customers');
      setCustomers(response.data);
    } catch (err) {
      console.error('Müşteriler yüklenirken hata:', err);
      message.error('Müşteriler yüklenirken bir hata oluştu');
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = {
        ...values,
        orderDate: values.orderDate.format('YYYY-MM-DD'),
        customer: { id: values.customerId }
      };

      if (editingId) {
        const dataToSend = {
          ...formData,
          id: editingId
        };
        await api.post('/api/orders/order/save', dataToSend);
        message.success('Sipariş başarıyla güncellendi');
      } else {
        await api.post('/api/orders/order/save', formData);
        message.success('Sipariş başarıyla eklendi');
      }
      
      setIsModalVisible(false);
      form.resetFields();
      setEditingId(null);
      await fetchOrders();
    } catch (err) {
      console.error('Sipariş kaydedilirken hata:', err);
      message.error('İşlem sırasında bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/orders/order/delete/${id}`);
      message.success('Sipariş başarıyla silindi');
      fetchOrders();
    } catch (err) {
      console.error('Sipariş silinirken hata:', err);
      message.error('Silme işlemi başarısız oldu');
    }
  };

  const columns = [
    {
      title: 'Sipariş No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Sipariş Tarihi',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (date) => dayjs(date).format('DD.MM.YYYY')
    },
    {
      title: 'Toplam Tutar',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => `₺${amount.toLocaleString('tr-TR')}`
    },
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
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
          <Button 
            type="primary" 
            onClick={() => {
              setEditingId(record.id);
              form.setFieldsValue({
                ...record,
                orderDate: dayjs(record.orderDate),
                customerId: record.customer?.id // Müşteri ID'sini forma ata
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
      className="order-module"
    >
      <div className="order-header">
        <h2>Sipariş Takibi</h2>
        <Button 
          type="primary" 
          onClick={() => {
            console.log('Yeni Sipariş Ekle butonuna tıklandı.');
            setEditingId(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Yeni Sipariş Ekle
        </Button>
      </div>

      <div className="order-content">
        <Table 
          columns={columns} 
          dataSource={orders} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>

      <Modal
        title={editingId ? "Sipariş Düzenle" : "Yeni Sipariş Ekle"}
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
            name="customerId"
            label="Müşteri"
            rules={[{ required: true, message: 'Lütfen müşteri seçiniz' }]}
          >
            <Select
              placeholder="Müşteri seçiniz"
            >
              {customers.map(customer => (
                <Option key={customer.id} value={customer.id}>
                  {`${customer.firstName} ${customer.lastName || ''}`}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="orderDate"
            label="Sipariş Tarihi"
            rules={[{ required: true, message: 'Lütfen sipariş tarihini seçiniz' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD.MM.YYYY" />
          </Form.Item>

          <Form.Item
            name="totalAmount"
            label="Toplam Tutar"
            rules={[{ required: true, message: 'Lütfen toplam tutarı giriniz' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `₺ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/₺\s?|(,*)/g, '')}
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="status"
            label="Durum"
            rules={[{ required: true, message: 'Lütfen sipariş durumunu seçiniz' }]}
          >
            <Select placeholder="Durum seçiniz">
              <Option value="Pending">Beklemede</Option>
              <Option value="Processing">İşleniyor</Option>
              <Option value="Completed">Tamamlandı</Option>
              <Option value="Cancelled">İptal Edildi</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Açıklama"
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

export default OrderTracking; 