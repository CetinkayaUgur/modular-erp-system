import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../FinanceModule.css';

const Applications = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      date: '2024-03-20',
      name: 'Ahmet Yılmaz',
      position: 'Yazılım Geliştirici',
      experience: '3 yıl',
      status: 'Değerlendiriliyor'
    },
    {
      id: 2,
      date: '2024-03-19',
      name: 'Ayşe Demir',
      position: 'İnsan Kaynakları Uzmanı',
      experience: '5 yıl',
      status: 'Mülakat Aşaması'
    },
    {
      id: 3,
      date: '2024-03-18',
      name: 'Mehmet Kaya',
      position: 'Pazarlama Uzmanı',
      experience: '2 yıl',
      status: 'Reddedildi'
    }
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const statusOptions = ['Değerlendiriliyor', 'Mülakat Aşaması', 'Kabul Edildi', 'Reddedildi'];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Kabul Edildi':
        return 'status-completed';
      case 'Değerlendiriliyor':
      case 'Mülakat Aşaması':
        return 'status-pending';
      case 'Reddedildi':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
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
        <h2>Başvuru Yönetimi</h2>
        <p>İş başvurularını buradan takip edebilir ve yönetebilirsiniz.</p>
      </div>
      <div className="finance-table">
        <table>
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Ad Soyad</th>
              <th>Pozisyon</th>
              <th>Deneyim</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="date">{app.date}</td>
                <td>{app.name}</td>
                <td><span className="category">{app.position}</span></td>
                <td>{app.experience}</td>
                <td>
                  <div className="status-selector">
                    <span 
                      className={`status-badge ${getStatusClass(app.status)}`}
                      onClick={() => toggleDropdown(app.id)}
                    >
                      {app.status}
                    </span>
                    {activeDropdown === app.id && (
                      <div className="status-dropdown">
                        {statusOptions.map((option) => (
                          <div
                            key={option}
                            className="status-option"
                            onClick={() => handleStatusChange(app.id, option)}
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

export default Applications; 
