import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../FinanceModule.css';

const Leaves = () => {
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      date: '2024-03-20',
      name: 'Ahmet Yılmaz',
      type: 'Yıllık İzin',
      duration: '5 gün',
      status: 'Onaylandı'
    },
    {
      id: 2,
      date: '2024-03-19',
      name: 'Ayşe Demir',
      type: 'Hastalık İzni',
      duration: '3 gün',
      status: 'Beklemede'
    },
    {
      id: 3,
      date: '2024-03-18',
      name: 'Mehmet Kaya',
      type: 'Mazeret İzni',
      duration: '1 gün',
      status: 'Reddedildi'
    }
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const statusOptions = ['Beklemede', 'Onaylandı', 'Reddedildi'];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Onaylandı':
        return 'status-completed';
      case 'Beklemede':
        return 'status-pending';
      case 'Reddedildi':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setLeaves(leaves.map(leave => 
      leave.id === id ? { ...leave, status: newStatus } : leave
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
        <h2>İzin Takibi</h2>
        <p>Çalışan izinlerini buradan takip edebilir ve yönetebilirsiniz.</p>
      </div>
      <div className="finance-table">
        <table>
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Ad Soyad</th>
              <th>İzin Türü</th>
              <th>Süre</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td className="date">{leave.date}</td>
                <td>{leave.name}</td>
                <td><span className="category">{leave.type}</span></td>
                <td>{leave.duration}</td>
                <td>
                  <div className="status-selector">
                    <span 
                      className={`status-badge ${getStatusClass(leave.status)}`}
                      onClick={() => toggleDropdown(leave.id)}
                    >
                      {leave.status}
                    </span>
                    {activeDropdown === leave.id && (
                      <div className="status-dropdown">
                        {statusOptions.map((option) => (
                          <div
                            key={option}
                            className="status-option"
                            onClick={() => handleStatusChange(leave.id, option)}
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

export default Leaves; 
