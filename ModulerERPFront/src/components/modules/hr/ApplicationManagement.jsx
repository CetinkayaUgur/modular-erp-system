import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, message, DatePicker } from 'antd';
import './ApplicationManagement.css';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const ApplicationManagement = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState(null);

    const applicationStatuses = {
        UNDER_REVIEW: { color: 'blue', text: 'İnceleniyor' },
        INTERVIEW: { color: 'orange', text: 'Mülakat' },
        REJECTED: { color: 'red', text: 'Reddedildi' },
        HIRED: { color: 'green', text: 'İşe Alındı' }
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
            title: 'Pozisyon',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Başvuru Tarihi',
            dataIndex: 'applicationDate',
            key: 'applicationDate',
            render: (date) => new Date(date).toLocaleDateString('tr-TR')
        },
        {
            title: 'Durum',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span className={`status-badge ${status.toLowerCase()}`}>
                    {applicationStatuses[status]?.text || status}
                </span>
            ),
        },
        {
            title: 'Notlar',
            dataIndex: 'notes',
            key: 'notes',
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
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:50502/api/hr/applications');
            setApplications(response.data);
            setError(null);
        } catch (err) {
            setError('Başvurular yüklenirken bir hata oluştu.');
            console.error('Error fetching applications:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values) => {
        try {
            const formData = {
                ...values,
                applicationDate: values.applicationDate.format('YYYY-MM-DD')
            };

            if (editingId) {
                await axios.post('http://localhost:50502/api/hr/applications/application/save', {
                    ...formData,
                    id: editingId
                });
                message.success('Başvuru başarıyla güncellendi');
            } else {
                await axios.post('http://localhost:50502/api/hr/applications/application/save', formData);
                message.success('Başvuru başarıyla oluşturuldu');
            }
            setIsModalVisible(false);
            form.resetFields();
            setEditingId(null);
            fetchApplications();
        } catch (err) {
            message.error('Bir hata oluştu');
            console.error('Error submitting application:', err);
        }
    };

    const handleEdit = (record) => {
        setEditingId(record.id);
        form.setFieldsValue({
            ...record,
            applicationDate: record.applicationDate ? dayjs(record.applicationDate) : null
        });
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:50502/api/hr/applications/${id}`);
            message.success('Başvuru başarıyla silindi');
            fetchApplications();
        } catch (err) {
            message.error('Silme işlemi başarısız oldu');
            console.error('Error deleting application:', err);
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
        <div className="application-module">
            <h2>Başvuru Yönetimi</h2>
            
            <div className="applications-details">
                <div className="applications-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3>Başvuru Listesi</h3>
                        <Button type="primary" onClick={handleAdd}>
                            Yeni Başvuru Ekle
                        </Button>
                    </div>
                    
                    <Table 
                        columns={columns} 
                        dataSource={applications} 
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                    />
                </div>
            </div>

            <Modal
                title={editingId ? "Başvuruyu Düzenle" : "Yeni Başvuru"}
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
                        name="firstName"
                        label="Ad"
                        rules={[{ required: true, message: 'Lütfen ad giriniz' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label="Soyad"
                        rules={[{ required: true, message: 'Lütfen soyad giriniz' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="position"
                        label="Pozisyon"
                        rules={[{ required: true, message: 'Lütfen pozisyon giriniz' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="applicationDate"
                        label="Başvuru Tarihi"
                        rules={[{ required: true, message: 'Lütfen başvuru tarihini seçiniz' }]}
                    >
                        <DatePicker style={{ width: '100%' }} format="DD.MM.YYYY" />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Durum"
                        rules={[{ required: true, message: 'Lütfen durum seçiniz' }]}
                    >
                        <Select>
                            {Object.entries(applicationStatuses).map(([key, value]) => (
                                <Option key={key} value={key}>{value.text}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="notes"
                        label="Notlar"
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

export default ApplicationManagement; 