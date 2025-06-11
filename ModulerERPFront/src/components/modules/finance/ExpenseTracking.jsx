import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './FinanceModule.css';

const ExpenseTracking = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: '2024-03-20',
      description: 'Ofis Kirası',
      amount: '3.000 ₺',
      category: 'Kira',
      status: 'Ödendi'
    },
    {
      id: 2,
      date: '2024-03-19',
      description: 'Elektrik Faturası',
      amount: '850 ₺',
      category: 'Faturalar',
      status: 'Ödendi'
    },
    {
      id: 3,
      date: '2024-03-18',
      description: 'İnternet Hizmeti',
      amount: '450 ₺',
      category: 'Hizmetler',
      status: 'Beklemede'
    }
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);

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
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, status: newStatus } : expense
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
      className="expense-tracking finance-module"
    >
      <div className="finance-header">
        <h2>Gider Takibi</h2>
        <p>Şirketinizin tüm gider kayıtlarını buradan takip edebilirsiniz.</p>
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
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="date">{expense.date}</td>
                <td>{expense.description}</td>
                <td className="amount">{expense.amount}</td>
                <td><span className="category">{expense.category}</span></td>
                <td>
                  <div className="status-selector">
                    <span 
                      className={`status-badge ${getStatusClass(expense.status)}`}
                      onClick={() => toggleDropdown(expense.id)}
                    >
                      {expense.status}
                    </span>
                    {activeDropdown === expense.id && (
                      <div className="status-dropdown">
                        {statusOptions.map((option) => (
                          <div
                            key={option}
                            className="status-option"
                            onClick={() => handleStatusChange(expense.id, option)}
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

export default ExpenseTracking; 