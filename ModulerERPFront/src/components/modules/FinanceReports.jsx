import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './FinanceModule.css';

const FinanceReports = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      reportName: 'Mart 2024 Gelir Raporu',
      period: '2024 Mart',
      type: 'Gelir',
      amount: '150.000 ₺',
      details: {
        satisGeliri: '120.000 ₺',
        hizmetGeliri: '25.000 ₺',
        digerGelirler: '5.000 ₺'
      },
      status: 'Tamamlandı',
      reportStatus: 'Onaylandı'
    },
    {
      id: 2,
      reportName: 'Mart 2024 Gider Raporu',
      period: '2024 Mart',
      type: 'Gider',
      amount: '85.000 ₺',
      details: {
        personelGideri: '45.000 ₺',
        ofisGideri: '20.000 ₺',
        digerGiderler: '20.000 ₺'
      },
      status: 'Tamamlandı',
      reportStatus: 'Onaylandı'
    },
    {
      id: 3,
      reportName: 'Nisan 2024 Gelir Raporu',
      period: '2024 Nisan',
      type: 'Gelir',
      amount: '165.000 ₺',
      details: {
        satisGeliri: '130.000 ₺',
        hizmetGeliri: '30.000 ₺',
        digerGelirler: '5.000 ₺'
      },
      status: 'Hazırlanıyor',
      reportStatus: 'Beklemede'
    },
    {
      id: 4,
      reportName: 'Nisan 2024 Gider Raporu',
      period: '2024 Nisan',
      type: 'Gider',
      amount: '90.000 ₺',
      details: {
        personelGideri: '48.000 ₺',
        ofisGideri: '22.000 ₺',
        digerGiderler: '20.000 ₺'
      },
      status: 'Hazırlanıyor',
      reportStatus: 'Beklemede'
    }
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedReport, setExpandedReport] = useState(null);

  const statusOptions = ['Hazırlanıyor', 'Tamamlandı', 'İptal Edildi'];
  const reportStatusOptions = ['Beklemede', 'Onaylandı', 'Reddedildi', 'İncelemede'];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Tamamlandı':
        return 'status-completed';
      case 'Hazırlanıyor':
        return 'status-pending';
      case 'İptal Edildi':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const getReportStatusClass = (status) => {
    switch (status) {
      case 'Onaylandı':
        return 'status-completed';
      case 'İncelemede':
        return 'status-pending';
      case 'Beklemede':
        return 'status-scheduled';
      case 'Reddedildi':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, status: newStatus } : report
    ));
    setActiveDropdown(null);
  };

  const handleReportStatusChange = (id, newStatus) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, reportStatus: newStatus } : report
    ));
    setActiveDropdown(null);
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const toggleExpand = (id) => {
    setExpandedReport(expandedReport === id ? null : id);
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
        <h2>Finansal Raporlama</h2>
        <p>Aylık finansal raporları buradan takip edebilirsiniz.</p>
      </div>
      <div className="finance-table">
        <table>
          <thead>
            <tr>
              <th>Rapor Adı</th>
              <th>Dönem</th>
              <th>Tür</th>
              <th>Tutar</th>
              <th>Rapor Durumu</th>
              <th>Durum</th>
              <th>Detay</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <React.Fragment key={report.id}>
                <tr>
                  <td>{report.reportName}</td>
                  <td><span className="category">{report.period}</span></td>
                  <td>{report.type}</td>
                  <td className="amount">{report.amount}</td>
                  <td>
                    <div className="status-selector">
                      <span 
                        className={`status-badge ${getReportStatusClass(report.reportStatus)}`}
                        onClick={() => toggleDropdown(`report-${report.id}`)}
                      >
                        {report.reportStatus}
                      </span>
                      {activeDropdown === `report-${report.id}` && (
                        <div className="status-dropdown">
                          {reportStatusOptions.map((option) => (
                            <div
                              key={option}
                              className="status-option"
                              onClick={() => handleReportStatusChange(report.id, option)}
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
                        className={`status-badge ${getStatusClass(report.status)}`}
                        onClick={() => toggleDropdown(`status-${report.id}`)}
                      >
                        {report.status}
                      </span>
                      {activeDropdown === `status-${report.id}` && (
                        <div className="status-dropdown">
                          {statusOptions.map((option) => (
                            <div
                              key={option}
                              className="status-option"
                              onClick={() => handleStatusChange(report.id, option)}
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
                      onClick={() => toggleExpand(report.id)}
                    >
                      {expandedReport === report.id ? 'Gizle' : 'Göster'}
                    </button>
                  </td>
                </tr>
                {expandedReport === report.id && (
                  <tr className="details-row">
                    <td colSpan="7">
                      <div className="report-details">
                        <h4>Detaylı Bilgiler</h4>
                        <div className="details-grid">
                          {Object.entries(report.details).map(([key, value]) => (
                            <div key={key} className="detail-item">
                              <span className="detail-label">{key}:</span>
                              <span className="detail-value">{value}</span>
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

export default FinanceReports; 
