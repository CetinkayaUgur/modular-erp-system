import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../FinanceModule.css';

const Training = () => {
  const [trainings, setTrainings] = useState([
    {
      id: 1,
      employeeName: 'Ahmet Yılmaz',
      trainingName: 'React.js Geliştirme',
      trainer: 'Mehmet Öz',
      startDate: '2024-03-01',
      endDate: '2024-03-15',
      status: 'Devam Ediyor',
      trainingStatus: 'Aktif'
    },
    {
      id: 2,
      employeeName: 'Ayşe Demir',
      trainingName: 'Proje Yönetimi',
      trainer: 'Ali Kaya',
      startDate: '2024-02-15',
      endDate: '2024-03-15',
      status: 'Tamamlandı',
      trainingStatus: 'Başarılı'
    },
    {
      id: 3,
      employeeName: 'Mehmet Kaya',
      trainingName: 'UI/UX Tasarım',
      trainer: 'Zeynep Yıldız',
      startDate: '2024-03-10',
      endDate: '2024-04-10',
      status: 'Planlandı',
      trainingStatus: 'Beklemede'
    }
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const statusOptions = ['Planlandı', 'Devam Ediyor', 'Tamamlandı', 'İptal Edildi'];
  const trainingStatusOptions = ['Beklemede', 'Aktif', 'Başarılı', 'Başarısız'];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Tamamlandı':
        return 'status-completed';
      case 'Devam Ediyor':
        return 'status-pending';
      case 'Planlandı':
        return 'status-scheduled';
      case 'İptal Edildi':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const getTrainingStatusClass = (status) => {
    switch (status) {
      case 'Başarılı':
        return 'status-completed';
      case 'Aktif':
        return 'status-pending';
      case 'Beklemede':
        return 'status-scheduled';
      case 'Başarısız':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setTrainings(trainings.map(training => 
      training.id === id ? { ...training, status: newStatus } : training
    ));
    setActiveDropdown(null);
  };

  const handleTrainingStatusChange = (id, newStatus) => {
    setTrainings(trainings.map(training => 
      training.id === id ? { ...training, trainingStatus: newStatus } : training
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
        <h2>Eğitim Takibi</h2>
        <p>Çalışan eğitimlerini buradan takip edebilirsiniz.</p>
      </div>
      <div className="finance-table">
        <table>
          <thead>
            <tr>
              <th>Çalışan</th>
              <th>Eğitim Adı</th>
              <th>Eğitmen</th>
              <th>Başlangıç</th>
              <th>Bitiş</th>
              <th>Eğitim Durumu</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {trainings.map((training) => (
              <tr key={training.id}>
                <td>{training.employeeName}</td>
                <td><span className="category">{training.trainingName}</span></td>
                <td>{training.trainer}</td>
                <td className="date">{training.startDate}</td>
                <td className="date">{training.endDate}</td>
                <td>
                  <div className="status-selector">
                    <span 
                      className={`status-badge ${getTrainingStatusClass(training.trainingStatus)}`}
                      onClick={() => toggleDropdown(`training-${training.id}`)}
                    >
                      {training.trainingStatus}
                    </span>
                    {activeDropdown === `training-${training.id}` && (
                      <div className="status-dropdown">
                        {trainingStatusOptions.map((option) => (
                          <div
                            key={option}
                            className="status-option"
                            onClick={() => handleTrainingStatusChange(training.id, option)}
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
                      className={`status-badge ${getStatusClass(training.status)}`}
                      onClick={() => toggleDropdown(`status-${training.id}`)}
                    >
                      {training.status}
                    </span>
                    {activeDropdown === `status-${training.id}` && (
                      <div className="status-dropdown">
                        {statusOptions.map((option) => (
                          <div
                            key={option}
                            className="status-option"
                            onClick={() => handleStatusChange(training.id, option)}
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

export default Training; 
