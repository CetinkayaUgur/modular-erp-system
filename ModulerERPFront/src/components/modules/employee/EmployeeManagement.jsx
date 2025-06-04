import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../FinanceModule.css';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      position: 'Yazılım Geliştirici',
      department: 'Bilgi Teknolojileri',
      startDate: '2023-01-15',
      email: 'ahmet.yilmaz@sirket.com',
      phone: '+90 555 123 4567',
      status: 'Aktif'
    },
    {
      id: 2,
      name: 'Ayşe Demir',
      position: 'Proje Yöneticisi',
      department: 'Proje Yönetimi',
      startDate: '2023-03-20',
      email: 'ayse.demir@sirket.com',
      phone: '+90 555 234 5678',
      status: 'Aktif'
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      position: 'UI/UX Tasarımcı',
      department: 'Tasarım',
      startDate: '2023-06-10',
      email: 'mehmet.kaya@sirket.com',
      phone: '+90 555 345 6789',
      status: 'İzinli'
    }
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const statusOptions = ['Aktif', 'İzinli', 'Pasif'];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Aktif':
        return 'status-completed';
      case 'İzinli':
        return 'status-pending';
      case 'Pasif':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setEmployees(employees.map(employee => 
      employee.id === id ? { ...employee, status: newStatus } : employee
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
      style={{ background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)' }}
    >
      <div className="finance-header">
        <h2>Çalışan Yönetimi</h2>
        <p>Çalışan bilgilerini buradan yönetebilirsiniz.</p>
      </div>
      <div className="finance-table">
        <table>
          <thead>
            <tr>
              <th>Ad Soyad</th>
              <th>Pozisyon</th>
              <th>Departman</th>
              <th>İşe Başlama</th>
              <th>E-posta</th>
              <th>Telefon</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td><span className="category">{employee.position}</span></td>
                <td>{employee.department}</td>
                <td className="date">{employee.startDate}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>
                  <div className="status-selector">
                    <span 
                      className={`status-badge ${getStatusClass(employee.status)}`}
                      onClick={() => toggleDropdown(employee.id)}
                    >
                      {employee.status}
                    </span>
                    {activeDropdown === employee.id && (
                      <div className="status-dropdown">
                        {statusOptions.map((option) => (
                          <div
                            key={option}
                            className="status-option"
                            onClick={() => handleStatusChange(employee.id, option)}
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

export default EmployeeManagement; 
