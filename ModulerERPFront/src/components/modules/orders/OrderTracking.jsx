import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../FinanceModule.css';

const OrderTracking = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'SIP-2024-001',
      customerName: 'ABC Şirketi',
      orderDate: '2024-03-15',
      deliveryDate: '2024-03-20',
      totalAmount: '25.000 ₺',
      status: 'Hazırlanıyor',
      orderStatus: 'Onaylandı',
      details: {
        urunler: 'Laptop (5 adet), Monitör (3 adet)',
        odemeDurumu: 'Ön Ödemeli',
        teslimatAdresi: 'İstanbul, Kadıköy',
        notlar: 'Özel paketleme talep edildi'
      }
    },
    {
      id: 2,
      orderNumber: 'SIP-2024-002',
      customerName: 'XYZ Ltd.',
      orderDate: '2024-03-16',
      deliveryDate: '2024-03-22',
      totalAmount: '18.500 ₺',
      status: 'Kargoda',
      orderStatus: 'Tamamlandı',
      details: {
        urunler: 'Yazıcı (2 adet), Toner (10 adet)',
        odemeDurumu: 'Kredi Kartı',
        teslimatAdresi: 'Ankara, Çankaya',
        notlar: 'Sabah teslimatı talep edildi'
      }
    },
    {
      id: 3,
      orderNumber: 'SIP-2024-003',
      customerName: 'DEF Holding',
      orderDate: '2024-03-17',
      deliveryDate: '2024-03-25',
      totalAmount: '45.000 ₺',
      status: 'Beklemede',
      orderStatus: 'Onay Bekliyor',
      details: {
        urunler: 'Sunucu (1 adet), Network Ekipmanları',
        odemeDurumu: 'Havale/EFT',
        teslimatAdresi: 'İzmir, Karşıyaka',
        notlar: 'Kurulum hizmeti talep edildi'
      }
    }
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const statusOptions = ['Beklemede', 'Hazırlanıyor', 'Kargoda', 'Tamamlandı', 'İptal Edildi'];
  const orderStatusOptions = ['Onay Bekliyor', 'Onaylandı', 'Reddedildi', 'İptal Edildi'];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Tamamlandı':
        return 'status-completed';
      case 'Hazırlanıyor':
        return 'status-pending';
      case 'Kargoda':
        return 'status-scheduled';
      case 'Beklemede':
        return 'status-pending';
      case 'İptal Edildi':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const getOrderStatusClass = (status) => {
    switch (status) {
      case 'Onaylandı':
        return 'status-completed';
      case 'Onay Bekliyor':
        return 'status-pending';
      case 'Reddedildi':
        return 'status-cancelled';
      case 'İptal Edildi':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
    setActiveDropdown(null);
  };

  const handleOrderStatusChange = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, orderStatus: newStatus } : order
    ));
    setActiveDropdown(null);
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const toggleExpand = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="finance-module"
      style={{ background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)' }}
    >
      <div className="finance-header">
        <h2>Sipariş Takibi</h2>
        <p>Aktif siparişleri buradan takip edebilirsiniz.</p>
      </div>
      <div className="finance-table">
        <table>
          <thead>
            <tr>
              <th>Sipariş No</th>
              <th>Müşteri</th>
              <th>Sipariş Tarihi</th>
              <th>Teslimat Tarihi</th>
              <th>Tutar</th>
              <th>Sipariş Durumu</th>
              <th>Durum</th>
              <th>Detay</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td>{order.orderNumber}</td>
                  <td>{order.customerName}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.deliveryDate}</td>
                  <td className="amount">{order.totalAmount}</td>
                  <td>
                    <div className="status-selector">
                      <span 
                        className={`status-badge ${getOrderStatusClass(order.orderStatus)}`}
                        onClick={() => toggleDropdown(`order-${order.id}`)}
                      >
                        {order.orderStatus}
                      </span>
                      {activeDropdown === `order-${order.id}` && (
                        <div className="status-dropdown">
                          {orderStatusOptions.map((option) => (
                            <div
                              key={option}
                              className="status-option"
                              onClick={() => handleOrderStatusChange(order.id, option)}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="status-selector">
                      <span 
                        className={`status-badge ${getStatusClass(order.status)}`}
                        onClick={() => toggleDropdown(`status-${order.id}`)}
                      >
                        {order.status}
                      </span>
                      {activeDropdown === `status-${order.id}` && (
                        <div className="status-dropdown">
                          {statusOptions.map((option) => (
                            <div
                              key={option}
                              className="status-option"
                              onClick={() => handleStatusChange(order.id, option)}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <button 
                      className="detail-button"
                      onClick={() => toggleExpand(order.id)}
                    >
                      {expandedOrder === order.id ? 'Gizle' : 'Göster'}
                    </button>
                  </td>
                </tr>
                {expandedOrder === order.id && (
                  <tr className="details-row">
                    <td colSpan="8">
                      <div className="report-details">
                        <h4>Sipariş Detayları</h4>
                        <div className="details-grid">
                          {Object.entries(order.details).map(([key, value]) => (
                            <div key={key} className="detail-item">
                              <span className="detail-label">{key}:</span>
                              <span className="detail-value">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default OrderTracking; 
