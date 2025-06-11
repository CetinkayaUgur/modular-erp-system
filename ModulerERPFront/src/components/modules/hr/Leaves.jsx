import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './Leaves.css';

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:50502/api/hr/leaves/');
      setLeaves(response.data);
    } catch (err) {
      setError('İzinler yüklenirken bir hata oluştu: ' + err.message);
      console.error('İzinler yüklenirken hata:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateLeaveStats = () => {
    const totalLeaves = leaves.length;
    const currentLeaves = leaves.filter(leave => {
      const today = new Date();
      const startDate = new Date(leave.startDate);
      const endDate = new Date(leave.endDate);
      return today >= startDate && today <= endDate;
    }).length;

    const leaveTypes = leaves.reduce((acc, leave) => {
      acc[leave.leaveType] = (acc[leave.leaveType] || 0) + 1;
      return acc;
    }, {});

    return {
      totalLeaves,
      currentLeaves,
      leaveTypes
    };
  };

  const stats = calculateLeaveStats();

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="loading"
      >
        Yükleniyor...
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="leaves-module"
    >
      <h2>İzin Yönetimi</h2>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="leaves-summary">
        <div className="summary-card">
          <h4>Toplam İzin</h4>
          <p className="amount">{stats.totalLeaves}</p>
        </div>
        <div className="summary-card">
          <h4>Aktif İzinler</h4>
          <p className="amount">{stats.currentLeaves}</p>
        </div>
        <div className="summary-card">
          <h4>İzin Türleri</h4>
          <div className="leave-types">
            {Object.entries(stats.leaveTypes).map(([type, count]) => (
              <div key={type} className="leave-type">
                <span className="type-name">{type}</span>
                <span className="type-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="leaves-details">
        <div className="leaves-section">
          <h3>İzin Listesi</h3>
        <table>
          <thead>
            <tr>
                <th>Çalışan ID</th>
              <th>İzin Türü</th>
                <th>Başlangıç Tarihi</th>
                <th>Bitiş Tarihi</th>
                <th>Açıklama</th>
            </tr>
          </thead>
          <tbody>
              {leaves.map(leave => (
              <tr key={leave.id}>
                  <td>{leave.employeeId}</td>
                  <td>
                    <span className={`leave-type-badge ${leave.leaveType.toLowerCase()}`}>
                      {leave.leaveType}
                    </span>
                </td>
                  <td>{new Date(leave.startDate).toLocaleDateString('tr-TR')}</td>
                  <td>{new Date(leave.endDate).toLocaleDateString('tr-TR')}</td>
                  <td>{leave.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Leaves; 