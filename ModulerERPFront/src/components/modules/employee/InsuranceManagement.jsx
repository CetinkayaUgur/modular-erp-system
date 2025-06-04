import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../FinanceModule.css';

const InsuranceManagement = () => {
  const [insurances, setInsurances] = useState([
    {
      id: 1,
      employeeName: 'Ahmet Yılmaz',
      position: 'Yazılım Geliştirici',
      department: 'Bilgi Teknolojileri',
      insuranceType: 'SGK',
      policyNumber: 'SGK-2024-001',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Aktif',
      details: {
        sgkNo: '12345678901',
        primGunSayisi: '30',
        odemeDurumu: 'Güncel',
        ekSigorta: 'Özel Sağlık Sigortası',
        notlar: 'Aile sigortası dahil'
      }
    },
    {
      id: 2,
      employeeName: 'Ayşe Demir',
      position: 'Proje Yöneticisi',
      department: 'Pazarlama',
      insuranceType: 'SGK + Özel',
      policyNumber: 'SGK-2024-002',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Aktif',
      details: {
        sgkNo: '12345678902',
        primGunSayisi: '30',
        odemeDurumu: 'Güncel',
        ekSigorta: 'Yaşam Sigortası',
        notlar: 'Tam kapsamlı sağlık sigortası'
      }
    },
    {
      id: 3,
      employeeName: 'Mehmet Kaya',
      position: 'Satış Temsilcisi',
      department: 'Satış',
      insuranceType: 'SGK',
      policyNumber: 'SGK-2024-003',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Beklemede',
      details: {
        sgkNo: '12345678903',
        primGunSayisi: '15',
        odemeDurumu: 'Gecikmiş',
        ekSigorta: 'Yok',
        notlar: 'Prim ödemesi bekleniyor'
      }
    }
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedInsurance, setExpandedInsurance] = useState(null);

  const statusOptions = ['Aktif', 'Pasif', 'Beklemede', 'İptal Edildi'];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Aktif':
        return 'status-completed';
      case 'Pasif':
        return 'status-pending';
      case 'Beklemede':
        return 'status-scheduled';
      case 'İptal Edildi':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setInsurances(insurances.map(insurance => 
      insurance.id === id ? { ...insurance, status: newStatus } : insurance
    ));
    setActiveDropdown(null);
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const toggleExpand = (id) => {
    setExpandedInsurance(expandedInsurance === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="finance-module"
      style={{ background: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)' }}
    >
      <div className="finance-header">
        <h2>Sigorta Yönetimi</h2>
        <p>Çalışan sigorta bilgilerini buradan yönetebilirsiniz.</p>
      </div>
      <div className="finance-table">
        <table>
          <thead>
            <tr>
              <th>Çalışan</th>
              <th>Pozisyon</th>
              <th>Departman</th>
              <th>Sigorta Türü</th>
              <th>Poliçe No</th>
              <th>Başlangıç</th>
              <th>Bitiş</th>
              <th>Durum</th>
              <th>Detay</th>
            </tr>
          </thead>
          <tbody>
            {insurances.map((insurance) => (
              <React.Fragment key={insurance.id}>
                <tr>
                  <td>{insurance.employeeName}</td>
                  <td>{insurance.position}</td>
                  <td>{insurance.department}</td>
                  <td>{insurance.insuranceType}</td>
                  <td>{insurance.policyNumber}</td>
                  <td>{insurance.startDate}</td>
                  <td>{insurance.endDate}</td>
                  <td>
                    <div className="status-selector">
                      <span 
                        className={`status-badge ${getStatusClass(insurance.status)}`}
                        onClick={() => toggleDropdown(insurance.id)}
                      >
                        {insurance.status}
                      </span>
                      {activeDropdown === insurance.id && (
                        <div className="status-dropdown">
                          {statusOptions.map((option) => (
                            <div
                              key={option}
                              className="status-option"
                              onClick={() => handleStatusChange(insurance.id, option)}
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
                      onClick={() => toggleExpand(insurance.id)}
                    >
                      {expandedInsurance === insurance.id ? 'Gizle' : 'Göster'}
                    </button>
                  </td>
                </tr>
                {expandedInsurance === insurance.id && (
                  <tr className="details-row">
                    <td colSpan="9">
                      <div className="report-details">
                        <h4>Sigorta Detayları</h4>
                        <div className="details-grid">
                          {Object.entries(insurance.details).map(([key, value]) => (
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

export default InsuranceManagement; 
