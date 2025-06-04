import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../FinanceModule.css';

const SalaryManagement = () => {
  const [salaries, setSalaries] = useState([
    {
      id: 1,
      employeeName: 'Ahmet Yılmaz',
      position: 'Yazılım Geliştirici',
      department: 'Bilgi Teknolojileri',
      baseSalary: 15000,
      bonus: 2000,
      deductions: 1500,
      netSalary: 15500,
      paymentDate: '2024-04-01',
      status: 'Ödendi',
      details: {
        sgkMatrah: 15000,
        sgkKesinti: 750,
        gelirVergisi: 750,
        damgaVergisi: 100,
        fazlaMesai: 1000,
        yemekKarti: 500,
        yolYardimi: 300,
        notlar: 'Nisan ayı maaşı'
      }
    },
    {
      id: 2,
      employeeName: 'Ayşe Demir',
      position: 'Proje Yöneticisi',
      department: 'Pazarlama',
      baseSalary: 20000,
      bonus: 3000,
      deductions: 2000,
      netSalary: 21000,
      paymentDate: '2024-04-01',
      status: 'Ödendi',
      details: {
        sgkMatrah: 20000,
        sgkKesinti: 1000,
        gelirVergisi: 1000,
        damgaVergisi: 150,
        fazlaMesai: 1500,
        yemekKarti: 500,
        yolYardimi: 300,
        notlar: 'Nisan ayı maaşı'
      }
    },
    {
      id: 3,
      employeeName: 'Mehmet Kaya',
      position: 'Satış Temsilcisi',
      department: 'Satış',
      baseSalary: 12000,
      bonus: 5000,
      deductions: 1000,
      netSalary: 16000,
      paymentDate: '2024-04-01',
      status: 'Beklemede',
      details: {
        sgkMatrah: 12000,
        sgkKesinti: 600,
        gelirVergisi: 400,
        damgaVergisi: 80,
        fazlaMesai: 2000,
        yemekKarti: 500,
        yolYardimi: 300,
        notlar: 'Satış primleri hesaplanıyor'
      }
    }
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedSalary, setExpandedSalary] = useState(null);

  const statusOptions = ['Ödendi', 'Beklemede', 'İptal Edildi'];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Ödendi':
        return 'status-completed';
      case 'Beklemede':
        return 'status-pending';
      case 'İptal Edildi':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setSalaries(salaries.map(salary => 
      salary.id === id ? { ...salary, status: newStatus } : salary
    ));
    setActiveDropdown(null);
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const toggleExpand = (id) => {
    setExpandedSalary(expandedSalary === id ? null : id);
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
      style={{ background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' }}
    >
      <div className="finance-header">
        <h2>Maaş Yönetimi</h2>
        <p>Çalışan maaş bilgilerini buradan yönetebilirsiniz.</p>
      </div>
      <div className="finance-table">
        <table>
          <thead>
            <tr>
              <th>Çalışan</th>
              <th>Pozisyon</th>
              <th>Departman</th>
              <th>Taban Maaş</th>
              <th>Bonus</th>
              <th>Kesintiler</th>
              <th>Net Maaş</th>
              <th>Ödeme Tarihi</th>
              <th>Durum</th>
              <th>Detay</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((salary) => (
              <React.Fragment key={salary.id}>
                <tr>
                  <td>{salary.employeeName}</td>
                  <td>{salary.position}</td>
                  <td>{salary.department}</td>
                  <td>{formatCurrency(salary.baseSalary)}</td>
                  <td>{formatCurrency(salary.bonus)}</td>
                  <td>{formatCurrency(salary.deductions)}</td>
                  <td>{formatCurrency(salary.netSalary)}</td>
                  <td>{salary.paymentDate}</td>
                  <td>
                    <div className="status-selector">
                      <span 
                        className={`status-badge ${getStatusClass(salary.status)}`}
                        onClick={() => toggleDropdown(salary.id)}
                      >
                        {salary.status}
                      </span>
                      {activeDropdown === salary.id && (
                        <div className="status-dropdown">
                          {statusOptions.map((option) => (
                            <div
                              key={option}
                              className="status-option"
                              onClick={() => handleStatusChange(salary.id, option)}
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
                      onClick={() => toggleExpand(salary.id)}
                    >
                      {expandedSalary === salary.id ? 'Gizle' : 'Göster'}
                    </button>
                  </td>
                </tr>
                {expandedSalary === salary.id && (
                  <tr className="details-row">
                    <td colSpan="10">
                      <div className="report-details">
                        <h4>Maaş Detayları</h4>
                        <div className="details-grid">
                          {Object.entries(salary.details).map(([key, value]) => (
                            <div key={key} className="detail-item">
                              <span className="detail-label">{key}:</span>
                              <span className="detail-value">
                                {typeof value === 'number' ? formatCurrency(value) : value}
                              </span>
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

export default SalaryManagement; 
