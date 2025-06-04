import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../FinanceModule.css';

const Payroll = () => {
  const [payrolls, setPayrolls] = useState([
    {
      id: 1,
      date: '2024-03-20',
      name: 'Ahmet Yılmaz',
      position: 'Yazılım Geliştirici',
      baseSalary: '15.000 ₺',
      bonus: '2.000 ₺',
      deductions: '3.000 ₺',
      netSalary: '14.000 ₺',
      status: 'Ödendi'
    },
    {
      id: 2,
      date: '2024-03-20',
      name: 'Ayşe Demir',
      position: 'Proje Yöneticisi',
      baseSalary: '20.000 ₺',
      bonus: '3.000 ₺',
      deductions: '4.000 ₺',
      netSalary: '19.000 ₺',
      status: 'Beklemede'
    },
    {
      id: 3,
      date: '2024-03-20',
      name: 'Mehmet Kaya',
      position: 'UI/UX Tasarımcı',
      baseSalary: '12.000 ₺',
      bonus: '1.500 ₺',
      deductions: '2.500 ₺',
      netSalary: '11.000 ₺',
      status: 'İptal Edildi'
    }
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const statusOptions = ['Beklemede', 'Ödendi', 'İptal Edildi'];

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
    setPayrolls(payrolls.map(payroll => 
      payroll.id === id ? { ...payroll, status: newStatus } : payroll
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
      className="hr-module finance-module"
      style={{ background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)' }}
    >
      <div className="finance-header">
        <h2>Bordro Yönetimi</h2>
        <p>Çalışan maaşlarını ve ödemelerini buradan yönetebilirsiniz.</p>
      </div>
      <div className="finance-table">
        <table>
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Ad Soyad</th>
              <th>Pozisyon</th>
              <th>Baz Maaş</th>
              <th>Bonus</th>
              <th>Kesintiler</th>
              <th>Net Maaş</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((payroll) => (
              <tr key={payroll.id}>
                <td className="date">{payroll.date}</td>
                <td>{payroll.name}</td>
                <td><span className="category">{payroll.position}</span></td>
                <td>{payroll.baseSalary}</td>
                <td>{payroll.bonus}</td>
                <td>{payroll.deductions}</td>
                <td>{payroll.netSalary}</td>
                <td>
                  <div className="status-selector">
                    <span 
                      className={`status-badge ${getStatusClass(payroll.status)}`}
                      onClick={() => toggleDropdown(payroll.id)}
                    >
                      {payroll.status}
                    </span>
                    {activeDropdown === payroll.id && (
                      <div className="status-dropdown">
                        {statusOptions.map((option) => (
                          <div
                            key={option}
                            className="status-option"
                            onClick={() => handleStatusChange(payroll.id, option)}
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

export default Payroll; 
