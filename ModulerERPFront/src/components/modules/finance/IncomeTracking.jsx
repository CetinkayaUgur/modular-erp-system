import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './FinanceModule.css';

const IncomeTracking = () => {
  const [incomes, setIncomes] = useState([
    {
      id: 1,
      date: '2024-03-20',
      description: 'Müşteri Ödemesi',
      amount: '5.000 ₺',
      category: 'Satış',
      status: 'Tamamlandı'
    },
    {
      id: 2,
      date: '2024-03-19',
      description: 'Hizmet Bedeli',
      amount: '3.500 ₺',
      category: 'Hizmet',
      status: 'Tamamlandı'
    },
    {
      id: 3,
      date: '2024-03-18',
      description: 'Proje Ödemesi',
      amount: '12.000 ₺',
      category: 'Proje',
      status: 'Beklemede'
    }
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const statusOptions = ['Tamamlandı', 'Beklemede', 'İptal Edildi'];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Tamamlandı':
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
    setIncomes(incomes.map(income => 
      income.id === id ? { ...income, status: newStatus } : income
    ));
    setActiveDropdown(null);
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="income-tracking finance-module"
    >
      <div className="finance-header">
        <h2>Gelir Takibi</h2>
        <p>Şirketinizin tüm gelir kayıtlarını buradan takip edebilirsiniz.</p>
      </div>
      <div className="finance-table">
        <table>
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Açıklama</th>
              <th>Miktar</th>
              <th>Kategori</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income) => (
              <tr key={income.id}>
                <td className="date">{income.date}</td>
                <td>{income.description}</td>
                <td className="amount">{income.amount}</td>
                <td><span className="category">{income.category}</span></td>
                <td>
                  <div className="status-selector">
                    <span 
                      className={`status-badge ${getStatusClass(income.status)}`}
                      onClick={() => toggleDropdown(income.id)}
                    >
                      {income.status}
                    </span>
                    {activeDropdown === income.id && (
                      <div className="status-dropdown">
                        {statusOptions.map((option) => (
                          <div
                            key={option}
                            className="status-option"
                            onClick={() => handleStatusChange(income.id, option)}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default IncomeTracking; 