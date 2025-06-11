import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, InputNumber, message, Select, Tabs } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import './PayrollManagement.css';

const PayrollManagement = () => {
  const [salaries, setSalaries] = useState([]);
  const [insurances, setInsurances] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isSalaryModalVisible, setIsSalaryModalVisible] = useState(false);
  const [isInsuranceModalVisible, setIsInsuranceModalVisible] = useState(false);
  const [editingSalaryId, setEditingSalaryId] = useState(null);
  const [editingInsuranceId, setEditingInsuranceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [salaryForm] = Form.useForm();
  const [insuranceForm] = Form.useForm();

  useEffect(() => {
    fetchEmployees();
    fetchSalaries();
    fetchInsurances();
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

  const fetchSalaries = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:50503/api/payroll/salaries');
      setSalaries(response.data);
      setError(null);
    } catch (err) {
      console.error('Hata detayları:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      let errorMessage = 'Maaş bilgileri yüklenirken bir hata oluştu.';
      
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

  const fetchInsurances = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:50503/api/payroll/insurances');
      setInsurances(response.data);
      setError(null);
    } catch (err) {
      console.error('Hata detayları:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      let errorMessage = 'Sigorta bilgileri yüklenirken bir hata oluştu.';
      
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

  const handleSalarySubmit = async (values) => {
    try {
      const formData = {
        ...values,
        paymentDate: values.paymentDate.format('YYYY-MM-DD')
      };

      if (editingSalaryId) {
        await axios.post('http://localhost:50503/api/payroll/salaries/salary/save', {
          ...formData,
          id: editingSalaryId
        });
        message.success('Maaş bilgisi başarıyla güncellendi');
      } else {
        await axios.post('http://localhost:50503/api/payroll/salaries/salary/save', formData);
        message.success('Maaş bilgisi başarıyla oluşturuldu');
      }
      setIsSalaryModalVisible(false);
      salaryForm.resetFields();
      setEditingSalaryId(null);
      fetchSalaries();
    } catch (err) {
      console.error('Hata detayları:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
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

  const handleInsuranceSubmit = async (values) => {
    try {
      const formData = {
        ...values,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD')
      };

      if (editingInsuranceId) {
        await axios.post('http://localhost:50503/api/payroll/insurances/insurance/save', {
          ...formData,
          id: editingInsuranceId
        });
        message.success('Sigorta bilgisi başarıyla güncellendi');
      } else {
        await axios.post('http://localhost:50503/api/payroll/insurances/insurance/save', formData);
        message.success('Sigorta bilgisi başarıyla oluşturuldu');
      }
      setIsInsuranceModalVisible(false);
      insuranceForm.resetFields();
      setEditingInsuranceId(null);
      fetchInsurances();
    } catch (err) {
      console.error('Hata detayları:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
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

  const handleSalaryDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:50503/api/payroll/salaries/salary/delete/${id}`);
      message.success('Maaş bilgisi başarıyla silindi');
      fetchSalaries();
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

  const handleInsuranceDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:50503/api/payroll/insurances/insurance/delete/${id}`);
      message.success('Sigorta bilgisi başarıyla silindi');
      fetchInsurances();
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

  const salaryColumns = [
    {
      title: 'Çalışan',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'Maaş',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `₺${amount.toLocaleString('tr-TR')}`
    },
    {
      title: 'Ödeme Tarihi',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (date) => dayjs(date).format('DD.MM.YYYY')
    },
    {
      title: 'Açıklama',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button 
            type="primary" 
            onClick={() => {
              setEditingSalaryId(record.id);
              salaryForm.setFieldsValue({
                ...record,
                paymentDate: dayjs(record.paymentDate)
              });
              setIsSalaryModalVisible(true);
            }}
            style={{ marginRight: 8 }}
          >
            Düzenle
          </Button>
          <Button 
            danger 
            onClick={() => handleSalaryDelete(record.id)}
          >
            Sil
          </Button>
        </>
      ),
    },
  ];

  const insuranceColumns = [
    {
      title: 'Çalışan',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'Poliçe No',
      dataIndex: 'policyNumber',
      key: 'policyNumber',
    },
    {
      title: 'Sigorta Türü',
      dataIndex: 'insuranceType',
      key: 'insuranceType',
    },
    {
      title: 'Başlangıç Tarihi',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => dayjs(date).format('DD.MM.YYYY')
    },
    {
      title: 'Bitiş Tarihi',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => dayjs(date).format('DD.MM.YYYY')
    },
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={`status-badge ${status === 'Aktif' ? 'status-active' : 'status-inactive'}`}>
          {status}
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
              setEditingInsuranceId(record.id);
              insuranceForm.setFieldsValue({
                ...record,
                startDate: dayjs(record.startDate),
                endDate: dayjs(record.endDate)
              });
              setIsInsuranceModalVisible(true);
            }}
            style={{ marginRight: 8 }}
          >
            Düzenle
          </Button>
          <Button 
            danger 
            onClick={() => handleInsuranceDelete(record.id)}
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

  const items = [
    {
      key: '1',
      label: 'Maaş Yönetimi',
      children: (
        <>
          <div className="payroll-header">
            <h2>Maaş Yönetimi</h2>
            <Button 
              type="primary" 
              onClick={() => {
                setEditingSalaryId(null);
                salaryForm.resetFields();
                setIsSalaryModalVisible(true);
              }}
            >
              Yeni Maaş Kaydı
            </Button>
          </div>

          <div className="payroll-content">
            <Table 
              columns={salaryColumns} 
              dataSource={salaries} 
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </div>
        </>
      ),
    },
    {
      key: '2',
      label: 'Sigorta Yönetimi',
      children: (
        <>
          <div className="payroll-header">
            <h2>Sigorta Yönetimi</h2>
            <Button 
              type="primary" 
              onClick={() => {
                setEditingInsuranceId(null);
                insuranceForm.resetFields();
                setIsInsuranceModalVisible(true);
              }}
            >
              Yeni Sigorta Kaydı
            </Button>
          </div>

          <div className="payroll-content">
            <Table 
              columns={insuranceColumns} 
              dataSource={insurances} 
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="payroll-module"
    >
      <Tabs defaultActiveKey="1" items={items} />

      <Modal
        title={editingSalaryId ? "Maaş Bilgisi Düzenle" : "Yeni Maaş Kaydı"}
        open={isSalaryModalVisible}
        onCancel={() => {
          setIsSalaryModalVisible(false);
          salaryForm.resetFields();
          setEditingSalaryId(null);
        }}
        footer={null}
      >
        <Form
          form={salaryForm}
          layout="vertical"
          onFinish={handleSalarySubmit}
        >
          <Form.Item
            name="employeeId"
            label="Çalışan"
            rules={[{ required: true, message: 'Lütfen çalışan seçiniz' }]}
          >
            <Select
              placeholder="Çalışan seçiniz"
              options={employees.map(emp => ({
                value: emp.id,
                label: `${emp.firstName} ${emp.lastName}`
              }))}
            />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Maaş Tutarı"
            rules={[{ required: true, message: 'Lütfen maaş tutarını giriniz' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `₺ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/₺\s?|(,*)/g, '')}
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="paymentDate"
            label="Ödeme Tarihi"
            rules={[{ required: true, message: 'Lütfen ödeme tarihini seçiniz' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD.MM.YYYY" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Açıklama"
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              {editingSalaryId ? 'Güncelle' : 'Kaydet'}
            </Button>
            <Button onClick={() => {
              setIsSalaryModalVisible(false);
              salaryForm.resetFields();
              setEditingSalaryId(null);
            }}>
              İptal
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={editingInsuranceId ? "Sigorta Bilgisi Düzenle" : "Yeni Sigorta Kaydı"}
        open={isInsuranceModalVisible}
        onCancel={() => {
          setIsInsuranceModalVisible(false);
          insuranceForm.resetFields();
          setEditingInsuranceId(null);
        }}
        footer={null}
      >
        <Form
          form={insuranceForm}
          layout="vertical"
          onFinish={handleInsuranceSubmit}
        >
          <Form.Item
            name="employeeId"
            label="Çalışan"
            rules={[{ required: true, message: 'Lütfen çalışan seçiniz' }]}
          >
            <Select
              placeholder="Çalışan seçiniz"
              options={employees.map(emp => ({
                value: emp.id,
                label: `${emp.firstName} ${emp.lastName}`
              }))}
            />
          </Form.Item>

          <Form.Item
            name="policyNumber"
            label="Poliçe No"
            rules={[{ required: true, message: 'Lütfen poliçe numarasını giriniz' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="insuranceType"
            label="Sigorta Türü"
            rules={[{ required: true, message: 'Lütfen sigorta türünü giriniz' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="startDate"
            label="Başlangıç Tarihi"
            rules={[{ required: true, message: 'Lütfen başlangıç tarihini seçiniz' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD.MM.YYYY" />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="Bitiş Tarihi"
            rules={[{ required: true, message: 'Lütfen bitiş tarihini seçiniz' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD.MM.YYYY" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Durum"
            rules={[{ required: true, message: 'Lütfen durumu seçiniz' }]}
          >
            <Select>
              <Select.Option value="Aktif">Aktif</Select.Option>
              <Select.Option value="Pasif">Pasif</Select.Option>
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
              {editingInsuranceId ? 'Güncelle' : 'Kaydet'}
            </Button>
            <Button onClick={() => {
              setIsInsuranceModalVisible(false);
              insuranceForm.resetFields();
              setEditingInsuranceId(null);
            }}>
              İptal
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default PayrollManagement; 