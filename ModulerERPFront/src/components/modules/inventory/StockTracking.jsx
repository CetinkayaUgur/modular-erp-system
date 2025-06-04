import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../FinanceModule.css';

const StockTracking = () => {
  const [stocks, setStocks] = useState([
    {
      id: 1,
      productName: 'Laptop Dell XPS 13',
      category: 'Bilgisayar',
      sku: 'LAP-DELL-XPS13-001',
      quantity: 25,
      minQuantity: 5,
      unitPrice: 35000,
      location: 'Depo A-101',
      status: 'Yeterli',
      details: {
        marka: 'Dell',
        model: 'XPS 13',
        ozellikler: 'Intel i7, 16GB RAM, 512GB SSD',
        sonGuncelleme: '2024-04-01',
        tedarikci: 'Dell Türkiye',
        notlar: 'Yeni model stokta'
      }
    },
    {
      id: 2,
      productName: 'iPhone 15 Pro',
      category: 'Telefon',
      sku: 'PHN-IPH-15PRO-001',
      quantity: 3,
      minQuantity: 10,
      unitPrice: 45000,
      location: 'Depo B-203',
      status: 'Kritik',
      details: {
        marka: 'Apple',
        model: 'iPhone 15 Pro',
        ozellikler: '256GB, Space Black',
        sonGuncelleme: '2024-04-01',
        tedarikci: 'Apple Türkiye',
        notlar: 'Stok yenileme bekleniyor'
      }
    },
    {
      id: 3,
      productName: 'Samsung 4K Monitor',
      category: 'Monitör',
      sku: 'MON-SAM-4K-001',
      quantity: 15,
      minQuantity: 8,
      unitPrice: 12000,
      location: 'Depo C-305',
      status: 'Yeterli',
      details: {
        marka: 'Samsung',
        model: 'U28R550',
        ozellikler: '28" 4K UHD, HDR',
        sonGuncelleme: '2024-04-01',
        tedarikci: 'Samsung Türkiye',
        notlar: 'Kampanya ürünü'
      }
    }
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedStock, setExpandedStock] = useState(null);

  const statusOptions = ['Yeterli', 'Kritik', 'Tükenmek Üzere', 'Tükendi'];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Yeterli':
        return 'status-completed';
      case 'Kritik':
        return 'status-pending';
      case 'Tükenmek Üzere':
        return 'status-scheduled';
      case 'Tükendi':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setStocks(stocks.map(stock => 
      stock.id === id ? { ...stock, status: newStatus } : stock
    ));
    setActiveDropdown(null);
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const toggleExpand = (id) => {
    setExpandedStock(expandedStock === id ? null : id);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="finance-module"
      style={{ background: 'linear-gradient(135deg, #607D8B 0%, #455A64 100%)' }}
    >
      <div className="finance-header">
        <h2>Stok Takibi</h2>
        <p>Ürün stok bilgilerini buradan yönetebilirsiniz.</p>
      </div>
      <div className="finance-table">
        <table>
          <thead>
            <tr>
              <th>Ürün Adı</th>
              <th>Kategori</th>
              <th>SKU</th>
              <th>Miktar</th>
              <th>Min. Miktar</th>
              <th>Birim Fiyat</th>
              <th>Konum</th>
              <th>Durum</th>
              <th>Detay</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <React.Fragment key={stock.id}>
                <tr>
                  <td>{stock.productName}</td>
                  <td>{stock.category}</td>
                  <td>{stock.sku}</td>
                  <td>{stock.quantity}</td>
                  <td>{stock.minQuantity}</td>
                  <td>{formatCurrency(stock.unitPrice)}</td>
                  <td>{stock.location}</td>
                  <td>
                    <div className="status-selector">
                      <span 
                        className={`status-badge ${getStatusClass(stock.status)}`}
                        onClick={() => toggleDropdown(stock.id)}
                      >
                        {stock.status}
                      </span>
                      {activeDropdown === stock.id && (
                        <div className="status-dropdown">
                          {statusOptions.map((option) => (
                            <div
                              key={option}
                              className="status-option"
                              onClick={() => handleStatusChange(stock.id, option)}
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
                      onClick={() => toggleExpand(stock.id)}
                    >
                      {expandedStock === stock.id ? 'Gizle' : 'Göster'}
                    </button>
                  </td>
                </tr>
                {expandedStock === stock.id && (
                  <tr className="details-row">
                    <td colSpan="9">
                      <div className="report-details">
                        <h4>Ürün Detayları</h4>
                        <div className="details-grid">
                          {Object.entries(stock.details).map(([key, value]) => (
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

export default StockTracking;
