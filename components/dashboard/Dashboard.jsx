import { useState } from 'react';
import { motion } from 'framer-motion';
import './Dashboard.css';

const Dashboard = () => {
  const [companyInfo] = useState({
    name: 'Şirket Adı',
    email: 'info@sirket.com',
    phone: '+90 555 123 4567'
  });

  const [modules] = useState([
    {
      id: 1,
      name: 'Sipariş & Hizmet Yönetimi',
      icon: '📦',
      subModules: ['Sipariş Takibi', 'Hizmet Yönetimi', 'Teslimat Takibi']
    },
    {
      id: 2,
      name: 'Stok & Envanter',
      icon: '📊',
      subModules: ['Stok Takibi', 'Envanter Yönetimi', 'Minimum Stok Kontrolü']
    },
    {
      id: 3,
      name: 'Alım-Satım İşlemleri',
      icon: '💰',
      subModules: ['Alım İşlemleri', 'Satış İşlemleri', 'Tedarikçi Yönetimi']
    },
    {
      id: 4,
      name: 'Çalışan & İK',
      icon: '👥',
      subModules: ['Personel Yönetimi', 'Departman Yönetimi', 'İzin Takibi']
    },
    {
      id: 5,
      name: 'Maaş & Sigorta',
      icon: '💼',
      subModules: ['Maaş Hesaplama', 'SGK İşlemleri', 'Ödeme Takibi']
    },
    {
      id: 6,
      name: 'Gelir-Gider & Finans',
      icon: '📈',
      subModules: ['Gelir Takibi', 'Gider Takibi', 'Finansal Raporlar', 'Bütçe Takip']
    }
  ]);

  const [activeModule, setActiveModule] = useState(null);

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
            >
              <span className="module-icon">{module.icon}</span>
              <span className="module-name">{module.name}</span>
              {activeModule === module.id && (
                <motion.div 
                  className="sub-modules"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {module.subModules.map((subModule, index) => (
                    <div key={index} className="sub-module-item">
                      {subModule}
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
          <div className="module-content">
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
