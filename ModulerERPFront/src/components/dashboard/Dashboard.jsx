import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ userData, onLogout }) => {
  const navigate = useNavigate();
  const [companyInfo] = useState({
    name: 'Şirket Adı',
    email: 'info@sirket.com',
    phone: '+90 555 123 4567'
  });

  // Durum seçenekleri
  const durumSecenekleri = {
    Applications: ['Beklemede', 'Onaylandı', 'Reddedildi'],
    Leaves: ['Beklemede', 'Onaylandı', 'Reddedildi'],
    Training: ['Planlandı', 'Devam Ediyor', 'Tamamlandı', 'İptal Edildi'],
    Performance: ['Değerlendirildi', 'Beklemede', 'İptal Edildi'],
    EmployeeManagement: ['Aktif', 'İzinli', 'Pasif'],
    InsuranceManagement: ['Aktif', 'Beklemede', 'İptal Edildi'],
    OrderTracking: ['Beklemede', 'İşlemde', 'Tamamlandı', 'İptal Edildi'],
    StockTracking: ['Normal', 'Düşük', 'Kritik'],
  };

  // Örnek tablo verileri
  const [tableData, setTableData] = useState({
    Applications: [
      { id: 1, isim: 'Ahmet Yılmaz', pozisyon: 'Yazılım Geliştirici', durum: 'Beklemede', tarih: '2024-03-15' },
      { id: 2, isim: 'Ayşe Demir', pozisyon: 'İnsan Kaynakları Uzmanı', durum: 'Onaylandı', tarih: '2024-03-14' },
      { id: 3, isim: 'Mehmet Kaya', pozisyon: 'Muhasebe Uzmanı', durum: 'Reddedildi', tarih: '2024-03-13' },
    ],
    Leaves: [
      { id: 1, isim: 'Ali Öztürk', izinTuru: 'Yıllık İzin', sure: '5 gün', durum: 'Onaylandı', tarih: '2024-03-20' },
      { id: 2, isim: 'Zeynep Şahin', izinTuru: 'Hastalık İzni', sure: '3 gün', durum: 'Beklemede', tarih: '2024-03-19' },
      { id: 3, isim: 'Can Yıldız', izinTuru: 'Mazeret İzni', sure: '1 gün', durum: 'Onaylandı', tarih: '2024-03-18' },
    ],
    Training: [
      { id: 1, isim: 'React.js Eğitimi', egitmen: 'Dr. Tekin Yılmaz', tarih: '2024-03-25', durum: 'Planlandı' },
      { id: 2, isim: 'İletişim Becerileri', egitmen: 'Ayşe Kaya', tarih: '2024-03-22', durum: 'Tamamlandı' },
      { id: 3, isim: 'Proje Yönetimi', egitmen: 'Mehmet Demir', tarih: '2024-03-28', durum: 'Planlandı' },
    ],
    Performance: [
      { id: 1, isim: 'Ahmet Yılmaz', departman: 'Yazılım', puan: 85, tarih: '2024-03-15', durum: 'Değerlendirildi' },
      { id: 2, isim: 'Ayşe Demir', departman: 'İK', puan: 92, tarih: '2024-03-15', durum: 'Değerlendirildi' },
      { id: 3, isim: 'Mehmet Kaya', departman: 'Muhasebe', puan: 78, tarih: '2024-03-15', durum: 'Değerlendirildi' },
    ],
    EmployeeManagement: [
      { id: 1, isim: 'Ali Öztürk', departman: 'Yazılım', pozisyon: 'Kıdemli Geliştirici', durum: 'Aktif' },
      { id: 2, isim: 'Zeynep Şahin', departman: 'İK', pozisyon: 'Uzman', durum: 'Aktif' },
      { id: 3, isim: 'Can Yıldız', departman: 'Satış', pozisyon: 'Müdür', durum: 'İzinli' },
    ],
    SalaryManagement: [
      { id: 1, isim: 'Ali Öztürk', bazMaas: 15000, bonus: 2000, kesintiler: 3000, netMaas: 14000 },
      { id: 2, isim: 'Zeynep Şahin', bazMaas: 12000, bonus: 1500, kesintiler: 2500, netMaas: 11000 },
      { id: 3, isim: 'Can Yıldız', bazMaas: 18000, bonus: 3000, kesintiler: 3500, netMaas: 17500 },
    ],
    InsuranceManagement: [
      { id: 1, isim: 'Ali Öztürk', policeNo: 'POL-001', tur: 'Sağlık', durum: 'Aktif', sonTarih: '2025-03-15' },
      { id: 2, isim: 'Zeynep Şahin', policeNo: 'POL-002', tur: 'Hayat', durum: 'Aktif', sonTarih: '2025-03-15' },
      { id: 3, isim: 'Can Yıldız', policeNo: 'POL-003', tur: 'Sağlık', durum: 'Beklemede', sonTarih: '2025-03-15' },
    ],
    IncomeTracking: [
      { id: 1, aciklama: 'Yazılım Projesi', tutar: 50000, tarih: '2024-03-15', kategori: 'Proje Geliri' },
      { id: 2, aciklama: 'Danışmanlık Hizmeti', tutar: 15000, tarih: '2024-03-14', kategori: 'Hizmet Geliri' },
      { id: 3, aciklama: 'Lisans Satışı', tutar: 25000, tarih: '2024-03-13', kategori: 'Ürün Satışı' },
    ],
    ExpenseTracking: [
      { id: 1, aciklama: 'Ofis Kirası', tutar: 15000, tarih: '2024-03-15', kategori: 'Sabit Gider' },
      { id: 2, aciklama: 'Yazılım Lisansları', tutar: 5000, tarih: '2024-03-14', kategori: 'Teknoloji' },
      { id: 3, aciklama: 'Eğitim Harcamaları', tutar: 8000, tarih: '2024-03-13', kategori: 'Eğitim' },
    ],
    FinanceReports: [
      { id: 1, isim: 'Aylık Gelir Raporu', donem: 'Mart 2024', durum: 'Hazır', tarih: '2024-03-15' },
      { id: 2, isim: 'Gider Analizi', donem: 'Mart 2024', durum: 'Hazırlanıyor', tarih: '2024-03-14' },
      { id: 3, isim: 'Kâr/Zarar Raporu', donem: 'Q1 2024', durum: 'Planlandı', tarih: '2024-03-13' },
    ],
    BudgetTracking: [
      { id: 1, departman: 'Yazılım', butce: 100000, harcanan: 45000, kalan: 55000, durum: 'Normal' },
      { id: 2, departman: 'Satış', butce: 150000, harcanan: 120000, kalan: 30000, durum: 'Dikkat' },
      { id: 3, departman: 'Pazarlama', butce: 80000, harcanan: 35000, kalan: 45000, durum: 'Normal' },
    ],
    OrderTracking: [
      { id: 1, musteri: 'ABC Ltd.', urun: 'Yazılım Lisansı', tutar: 25000, durum: 'Tamamlandı', tarih: '2024-03-15' },
      { id: 2, musteri: 'XYZ A.Ş.', urun: 'Danışmanlık', tutar: 15000, durum: 'İşlemde', tarih: '2024-03-14' },
      { id: 3, musteri: '123 Teknoloji', urun: 'Eğitim', tutar: 8000, durum: 'Beklemede', tarih: '2024-03-13' },
    ],
    Payroll: [
      { id: 1, isim: 'Ali Öztürk', bazMaas: 15000, sigorta: 2000, vergi: 3000, netMaas: 10000 },
      { id: 2, isim: 'Zeynep Şahin', bazMaas: 12000, sigorta: 1500, vergi: 2500, netMaas: 8000 },
      { id: 3, isim: 'Can Yıldız', bazMaas: 18000, sigorta: 2500, vergi: 3500, netMaas: 12000 },
    ],
    StockTracking: [
      { id: 1, urun: 'Laptop', miktar: 50, minStok: 10, durum: 'Normal', konum: 'Depo A' },
      { id: 2, urun: 'Monitör', miktar: 30, minStok: 15, durum: 'Düşük', konum: 'Depo B' },
      { id: 3, urun: 'Klavye', miktar: 100, minStok: 20, durum: 'Normal', konum: 'Depo A' },
    ],
  });

  const [modules] = useState([
    {
      id: 1,
      name: 'İnsan Kaynakları',
      icon: '👥',
      color: '#2196F3', // Mavi
      textColor: '#FFFFFF',
      subModules: [
        { name: 'Başvuru Yönetimi', component: 'Applications' },
        { name: 'İzin Takibi', component: 'Leaves' },
        { name: 'Eğitim Takibi', component: 'Training' },
        { name: 'Çalışan Değerlendirme', component: 'Performance' }
      ]
    },
    {
      id: 2,
      name: 'Çalışan',
      icon: '👨‍💼',
      color: '#9C27B0', // Mor
      textColor: '#FFFFFF',
      subModules: [
        { name: 'Çalışan Yönetimi', component: 'EmployeeManagement' },
        { name: 'Maaş Yönetimi', component: 'SalaryManagement' },
        { name: 'Sigorta Yönetimi', component: 'InsuranceManagement' }
      ]
    },
    {
      id: 3,
      name: 'Gelir-Gider & Finans',
      icon: '📈',
      color: '#4CAF50', // Yeşil
      textColor: '#FFFFFF',
      subModules: [
        { name: 'Gelir Takibi', component: 'IncomeTracking' },
        { name: 'Gider Takibi', component: 'ExpenseTracking' },
        { name: 'Finansal Raporlar', component: 'FinanceReports' },
        { name: 'Bütçe Takip', component: 'BudgetTracking' }
      ]
    },
    {
      id: 4,
      name: 'Sipariş & Hizmet Yönetimi',
      icon: '📦',
      color: '#FF9800', // Turuncu
      textColor: '#FFFFFF',
      subModules: [
        { name: 'Sipariş Takibi', component: 'OrderTracking' }
      ]
    },
    {
      id: 5,
      name: 'Maaş & Sigorta',
      icon: '💼',
      color: '#E91E63', // Pembe
      textColor: '#FFFFFF',
      subModules: [
        { name: 'Maaş ve Sigorta Yönetimi', component: 'Payroll' }
      ]
    },
    {
      id: 6,
      name: 'Stok & Envanter',
      icon: '📊',
      color: '#607D8B', // Gri-Mavi
      textColor: '#FFFFFF',
      subModules: [
        { name: 'Stok Takibi', component: 'StockTracking' }
      ]
    },
  ]);

  const [activeModule, setActiveModule] = useState(null);
  const [activeSubModule, setActiveSubModule] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDurumDegistir = (moduleKey, rowId, yeniDurum) => {
    setTableData(prevData => ({
      ...prevData,
      [moduleKey]: prevData[moduleKey].map(row => 
        row.id === rowId ? { ...row, durum: yeniDurum } : row
      )
    }));
    setActiveDropdown(null);
  };

  const getActiveModuleStyle = () => {
    if (!activeModule) return {};
    const module = modules.find(m => m.id === activeModule);
    return {
      backgroundColor: module.color,
      color: module.textColor,
    };
  };

  const handleSubModuleClick = (subModule) => {
    setActiveSubModule(subModule);
    setActiveModule(null);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const renderTable = (data, moduleColor, moduleKey) => {
    if (!data || data.length === 0) return <p>Veri bulunamadı</p>;

    const columns = Object.keys(data[0]).filter(key => key !== 'id');

    return (
      <div className="table-container" style={{ backgroundColor: moduleColor }}>
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {columns.map((column, index) => (
                  <td key={index}>
                    {column === 'durum' ? (
                      <div className="durum-container">
                        <span 
                          className="durum-badge"
                          onClick={() => setActiveDropdown(activeDropdown === row.id ? null : row.id)}
                        >
                          {row[column]}
                        </span>
                        {activeDropdown === row.id && (
                          <div className="durum-dropdown">
                            {durumSecenekleri[moduleKey].map((durum, index) => (
                              <div
                                key={index}
                                className="durum-option"
                                onClick={() => handleDurumDegistir(moduleKey, row.id, durum)}
                              >
                                {durum}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      row[column]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderSubModuleContent = () => {
    if (!activeSubModule) return null;

    const data = tableData[activeSubModule.component];
    const activeModuleData = modules.find(m => m.subModules.some(sm => sm.component === activeSubModule.component));
    
    return (
      <div className="sub-module-content">
        <h2>{activeSubModule.name}</h2>
        {renderTable(data, activeModuleData.color, activeSubModule.component)}
      </div>
    );
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
              onClick={() => {
                if (activeModule === module.id) {
                  setActiveModule(null);
                  setActiveSubModule(null);
                } else {
                  setActiveModule(module.id);
                }
              }}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubModuleClick(subModule);
                      }}
                    >
                      {subModule.name}
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
          <motion.button
            className="logout-button"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Çıkış Yap
          </motion.button>
        </div>
      </motion.nav>

      {/* Ana İçerik Alanı */}
      <motion.main 
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {activeSubModule ? (
          <div className="module-content">
            {renderSubModuleContent()}
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
