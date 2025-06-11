import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [companyInfo] = useState({
    name: 'Şirket Adı',
    email: 'info@sirket.com',
    phone: '+90 555 123 4567'
  });

  const [modules] = useState([
    {
      id: 1,
      name: 'İnsan Kaynakları',
      icon: '👥',
      color: '#2196F3', // Mavi
      textColor: '#FFFFFF',
      subModules: [
        { name: 'Başvuru Yönetimi', path: '/hr/applications' },
        { name: 'İzin Takibi', path: '/hr/leaves' },
        { name: 'Eğitim Takibi', path: '/hr/trainings' },
        { name: 'Çalışan Değerlendirme', path: '/hr/evaluations' }
      ]
    },
    {
      id: 2,
      name: 'Çalışan',
      icon: '👨‍💼',
      color: '#9C27B0', // Mor
      textColor: '#FFFFFF',
      subModules: [
        { name: 'Çalışan Yönetimi', path: '/employee/management' },
        { name: 'Maaş Yönetimi', path: '/employee/salary' },
        { name: 'Sigorta Yönetimi', path: '/employee/insurance' }
      ]
    },
    {
      id: 3,
      name: 'Gelir-Gider & Finans',
      icon: '📈',
      color: '#4CAF50', // Yeşil
      textColor: '#FFFFFF',
      subModules: [
        { name: 'Gelir Takibi', path: '/finance/income' },
        { name: 'Gider Takibi', path: '/finance/expense' },
        { name: 'Finansal Raporlar', path: '/finance/reports' },
        { name: 'Bütçe Takip', path: '/finance/budget' }
      ]
    },
    {
      id: 4,
      name: 'Sipariş & Hizmet Yönetimi',
      icon: '📦',
      color: '#FF9800', // Turuncu
      textColor: '#FFFFFF',
      subModules: [
        { name: 'Sipariş Takibi', path: '/orders/tracking' }
      ]
    },
    {
      id: 5,
      name: 'Maaş & Sigorta',
      icon: '💼',
      color: '#E91E63', // Pembe
      textColor: '#FFFFFF',
      subModules: [
        { name: 'Maaş ve Sigorta Yönetimi', path: '/payroll/management' }
      ]
    },
    {
      id: 6,
      name: 'Stok & Envanter',
      icon: '📊',
      color: '#607D8B', // Gri-Mavi
      textColor: '#FFFFFF',
      subModules: [
        { name: 'Stok Takibi', path: '/inventory/stock' }
      ]
    },
  ]);

  const [activeModule, setActiveModule] = useState(null);

  const getActiveModuleStyle = () => {
    if (!activeModule) return {};
    const module = modules.find(m => m.id === activeModule);
    return {
      backgroundColor: module.color,
      color: module.textColor,
    };
  };

  const handleSubModuleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      {/* Üst Bar - Modüller */}
      <motion.nav 
        className="modules-bar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="company-info">
          <h2>{companyInfo.name}</h2>
          <p>{companyInfo.email}</p>
          <p>{companyInfo.phone}</p>
        </div>
        <div className="modules-list">
          {modules.map(module => (
            <motion.div
              key={module.id}
              className={`module-item ${activeModule === module.id ? 'active' : ''}`}
              onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={activeModule === module.id ? { backgroundColor: module.color, color: module.textColor } : {}}
            >
              <span className="module-icon">{module.icon}</span>
              <span className="module-name">{module.name}</span>
              {activeModule === module.id && (
                <motion.div 
                  className="sub-modules"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ backgroundColor: module.color, color: module.textColor }}
                >
                  {module.subModules.map((subModule, index) => (
                    <div 
                      key={index} 
                      className="sub-module-item"
                      onClick={() => handleSubModuleClick(subModule.path)}
                    >
                      {subModule.name}
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.nav>

      {/* Ana İçerik Alanı */}
      <motion.main 
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {activeModule ? (
          <div className="module-content" style={getActiveModuleStyle()}>
            <h1>{modules.find(m => m.id === activeModule)?.name}</h1>
            {/* Modül içeriği buraya gelecek */}
          </div>
        ) : (
          <div className="welcome-content">
            <h1>Hoş Geldiniz</h1>
            <p>Lütfen yukarıdaki menüden bir modül seçin.</p>
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default Dashboard; 