import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './FinanceModule.css';

const FinanceReports = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      console.log('Finansal kayıtlar isteniyor...');
      let url = 'http://localhost:50501/api/finance/records';
      
      // Eğer tarih aralığı seçilmişse, filtreleme parametrelerini ekle
      if (dateRange.startDate && dateRange.endDate) {
        // Tarihleri YYYY-MM-DD formatında kullan
        url = `http://localhost:50501/api/finance/records/between?start=${dateRange.startDate}&end=${dateRange.endDate}`;
      }

      console.log('İstek URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Sunucu yanıtı:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Alınan veri:', data);
        setRecords(data);
      } else {
        const errorText = await response.text();
        console.error('Sunucu hatası:', errorText);
        setError('Finansal kayıtlar yüklenirken bir hata oluştu: ' + errorText);
      }
    } catch (err) {
      console.error('Bağlantı hatası detayları:', {
        message: err.message,
        name: err.name,
        stack: err.stack
      });
      setError('Sunucuya bağlanılamadı: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchRecords();
  };

  const handleClearFilter = () => {
    setDateRange({
      startDate: '',
      endDate: ''
    });
    fetchRecords();
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <motion.div
      className="finance-module"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="finance-container">
        <div className="finance-list-container">
          <div className="filter-section">
            <h3>Finansal Kayıtlar</h3>
            <form onSubmit={handleFilter} className="date-filter-form">
              <div className="form-group">
                <label htmlFor="startDate">Başlangıç Tarihi</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={dateRange.startDate}
                  onChange={handleDateRangeChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">Bitiş Tarihi</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={dateRange.endDate}
                  onChange={handleDateRangeChange}
                />
              </div>
              <div className="filter-buttons">
                <button type="submit" className="filter-btn">Filtrele</button>
                <button type="button" onClick={handleClearFilter} className="clear-btn">Filtreyi Temizle</button>
              </div>
            </form>
          </div>
          <div className="table-responsive">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>Tür</th>
                  <th>Tutar</th>
                  <th>Açıklama</th>
                  <th>Kaynak Türü</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className={record.type === 'income' ? 'income-row' : 'expense-row'}>
                    <td>{record.date}</td>
                    <td>
                      <span className={`type-badge ${record.type}`}>
                        {record.type === 'income' ? 'Gelir' : 'Gider'}
                      </span>
                    </td>
                    <td className="amount-cell">
                      {parseFloat(record.amount).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL
                    </td>
                    <td>{record.description}</td>
                    <td>{record.sourceType || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FinanceReports;