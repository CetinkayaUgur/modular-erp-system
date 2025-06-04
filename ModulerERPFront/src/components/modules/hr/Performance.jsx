import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../FinanceModule.css';

const Performance = () => {
  const [evaluations, setEvaluations] = useState([
    {
      id: 1,
      employeeName: 'Ahmet Yılmaz',
      position: 'Yazılım Geliştirici',
      department: 'Bilgi Teknolojileri',
      evaluationDate: '2024-03-01',
      status: 'Tamamlandı',
      evaluationStatus: 'Başarılı'
    },
    {
      id: 2,
      employeeName: 'Ayşe Demir',
      position: 'Proje Yöneticisi',
      department: 'Proje Yönetimi',
      evaluationDate: '2024-03-05',
      status: 'Tamamlandı',
      evaluationStatus: 'Çok Başarılı'
    },
    {
      id: 3,
      employeeName: 'Mehmet Kaya',
      position: 'UI/UX Tasarımcı',
      department: 'Tasarım',
      evaluationDate: '2024-03-10',
      status: 'Beklemede',
      evaluationStatus: 'Beklemede'
    }
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const statusOptions = ['Beklemede', 'Tamamlandı', 'İptal Edildi'];
  const evaluationStatusOptions = ['Beklemede', 'Başarılı', 'Çok Başarılı', 'Geliştirilmeli'];

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

  const getEvaluationStatusClass = (status) => {
    switch (status) {
      case 'Çok Başarılı':
        return 'status-completed';
      case 'Başarılı':
        return 'status-pending';
      case 'Geliştirilmeli':
        return 'status-cancelled';
      case 'Beklemede':
        return 'status-scheduled';
      default:
        return '';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setEvaluations(evaluations.map(evaluation => 
      evaluation.id === id ? { ...evaluation, status: newStatus } : evaluation
    ));
    setActiveDropdown(null);
  };

  const handleEvaluationStatusChange = (id, newStatus) => {
    setEvaluations(evaluations.map(evaluation => 
      evaluation.id === id ? { ...evaluation, evaluationStatus: newStatus } : evaluation
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
        <h2>Çalışan Değerlendirme</h2>
        <p>Çalışan performans değerlendirmelerini buradan takip edebilirsiniz.</p>
      </div>
      <div className="finance-table">
        <table>
          <thead>
            <tr>
              <th>Çalışan</th>
              <th>Pozisyon</th>
              <th>Departman</th>
              <th>Değerlendirme Tarihi</th>
              <th>Değerlendirme Durumu</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map((evaluation) => (
              <tr key={evaluation.id}>
                <td>{evaluation.employeeName}</td>
                <td><span className="category">{evaluation.position}</span></td>
                <td>{evaluation.department}</td>
                <td className="date">{evaluation.evaluationDate}</td>
                <td>
                  <div className="status-selector">
                    <span 
                      className={`status-badge ${getEvaluationStatusClass(evaluation.evaluationStatus)}`}
                      onClick={() => toggleDropdown(`eval-${evaluation.id}`)}
                    >
                      {evaluation.evaluationStatus}
                    </span>
                    {activeDropdown === `eval-${evaluation.id}` && (
                      <div className="status-dropdown">
                        {evaluationStatusOptions.map((option) => (
                          <div
                            key={option}
                            className="status-option"
                            onClick={() => handleEvaluationStatusChange(evaluation.id, option)}
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
                      className={`status-badge ${getStatusClass(evaluation.status)}`}
                      onClick={() => toggleDropdown(`status-${evaluation.id}`)}
                    >
                      {evaluation.status}
                    </span>
                    {activeDropdown === `status-${evaluation.id}` && (
                      <div className="status-dropdown">
                        {statusOptions.map((option) => (
                          <div
                            key={option}
                            className="status-option"
                            onClick={() => handleStatusChange(evaluation.id, option)}
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

export default Performance; 
