import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './FinanceModule.css';

const BudgetTracking = () => {
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      department: 'Bilgi Teknolojileri',
      category: 'Yazılım Geliştirme',
      budget: '100.000 ₺',
      spent: '45.000 ₺',
      remaining: '55.000 ₺',
      status: 'Aktif',
      budgetStatus: 'Normal'
    },
    {
      id: 2,
      department: 'Pazarlama',
      category: 'Dijital Pazarlama',
      budget: '75.000 ₺',
      spent: '70.000 ₺',
      remaining: '5.000 ₺',
      status: 'Aktif',
      budgetStatus: 'Kritik'
    },
    {
      id: 3,
      department: 'İnsan Kaynakları',
      category: 'Eğitim ve Gelişim',
      budget: '50.000 ₺',
      spent: '25.000 ₺',
      remaining: '25.000 ₺',
      status: 'Aktif',
      budgetStatus: 'Normal'
    }
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const statusOptions = ['Aktif', 'Pasif', 'İptal Edildi'];
  const budgetStatusOptions = ['Normal', 'Kritik', 'Aşım', 'Tasarruf'];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Aktif':
        return 'status-completed';
      case 'Pasif':
        return 'status-pending';
      case 'İptal Edildi':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const getBudgetStatusClass = (status) => {
    switch (status) {
      case 'Normal':
        return 'status-completed';
      case 'Tasarruf':
        return 'status-pending';
      case 'Kritik':
        return 'status-scheduled';
      case 'Aşım':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setBudgets(budgets.map(budget => 
      budget.id === id ? { ...budget, status: newStatus } : budget
    ));
    setActiveDropdown(null);
  };

  const handleBudgetStatusChange = (id, newStatus) => {
    setBudgets(budgets.map(budget => 
      budget.id === id ? { ...budget, budgetStatus: newStatus } : budget
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
      className="finance-module"
      style={{ background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' }}
    >
      <div className="finance-header">
        <h2>Bütçe Takibi</h2>
        <p>Departman bütçelerini buradan takip edebilirsiniz.</p>
      </div>
      <div className="finance-table">
        <table>
          <thead>
            <tr>
              <th>Departman</th>
              <th>Kategori</th>
              <th>Bütçe</th>
              <th>Harcanan</th>
              <th>Kalan</th>
              <th>Bütçe Durumu</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget) => (
              <tr key={budget.id}>
                <td>{budget.department}</td>
                <td><span className="category">{budget.category}</span></td>
                <td className="amount">{budget.budget}</td>
                <td className="amount">{budget.spent}</td>
                <td className="amount">{budget.remaining}</td>
                <td>
                  <div className="status-selector">
                    <span 
                      className={`status-badge ${getBudgetStatusClass(budget.budgetStatus)}`}
                      onClick={() => toggleDropdown(`budget-${budget.id}`)}
                    >
                      {budget.budgetStatus}
                    </span>
                    {activeDropdown === `budget-${budget.id}` && (
                      <div className="status-dropdown">
                        {budgetStatusOptions.map((option) => (
                          <div
                            key={option}
                            className="status-option"
                            onClick={() => handleBudgetStatusChange(budget.id, option)}
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
                      className={`status-badge ${getStatusClass(budget.status)}`}
                      onClick={() => toggleDropdown(`status-${budget.id}`)}
                    >
                      {budget.status}
                    </span>
                    {activeDropdown === `status-${budget.id}` && (
                      <div className="status-dropdown">
                        {statusOptions.map((option) => (
                          <div
                            key={option}
                            className="status-option"
                            onClick={() => handleStatusChange(budget.id, option)}
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

export default BudgetTracking; 
