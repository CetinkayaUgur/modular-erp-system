import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './FinanceModule.css';
import axios from 'axios';

const IncomeTracking = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newIncome, setNewIncome] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    sourceType: ''
  });

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      setLoading(true);
      const url = 'http://localhost:50501/api/finance/records/type/income';
      
      console.log('İstek URL:', url);
      
      const response = await axios.get(url);
      console.log('Sunucu yanıtı:', response.data);
      setIncomes(response.data);
      setError(null);
    } catch (err) {
      console.error('Hata detayları:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      let errorMessage = 'Gelir kayıtları yüklenirken bir hata oluştu.';
      
      if (err.response) {
        const errorData = err.response.data;
        if (typeof errorData === 'object') {
          errorMessage += ` Hata: ${JSON.stringify(errorData)}`;
        } else {
          errorMessage += ` Hata: ${errorData || err.response.statusText}`;
        }
      } else if (err.request) {
        errorMessage += ' Sunucuya ulaşılamıyor.';
      } else {
        errorMessage += ` ${err.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Tarihi dd/MM/yyyy formatına çevir
      const [year, month, day] = newIncome.date.split('-');
      const formattedDate = `${day}/${month}/${year}`;

      const requestData = {
        amount: newIncome.amount, // BigDecimal için string olarak gönder
        description: newIncome.description,
        date: formattedDate,
        type: 'income',
        sourceType: newIncome.sourceType,
        sourceId: null
      };

      console.log('Gelir kaydı ekleniyor:', requestData);

      const response = await fetch('http://localhost:50501/api/finance/records/record/add', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData),
      });

      console.log('Sunucu yanıtı:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Başarılı yanıt:', data);
        setNewIncome({
          amount: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
          sourceType: ''
        });
        fetchIncomes(); // Listeyi yenile
      } else {
        const errorText = await response.text();
        console.error('Sunucu hatası:', errorText);
        setError('Gelir kaydı eklenirken bir hata oluştu: ' + errorText);
      }
    } catch (err) {
      console.error('Bağlantı hatası detayları:', {
        message: err.message,
        name: err.name,
        stack: err.stack
      });
      setError('Sunucuya bağlanılamadı: ' + err.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewIncome({ ...newIncome, [id]: value });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu gelir kaydını silmek istediğinizden emin misiniz?')) {
      try {
        console.log('Gelir kaydı siliniyor...');
        const response = await fetch(`http://localhost:50501/api/finance/records/record/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        });
        
        console.log('Sunucu yanıtı:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        });
        
        if (response.ok) {
          console.log('Gelir kaydı başarıyla silindi');
          fetchIncomes(); // Listeyi yenile
        } else {
          const errorText = await response.text();
          console.error('Sunucu hatası:', errorText);
          setError('Gelir kaydı silinirken bir hata oluştu: ' + errorText);
        }
      } catch (err) {
        console.error('Bağlantı hatası detayları:', {
          message: err.message,
          name: err.name,
          stack: err.stack
        });
        setError('Sunucuya bağlanılamadı: ' + err.message);
      }
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <motion.div
      className="finance-module income-tracking"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="finance-container">
        <div style={{ display: 'flex', gap: '20px' }}>
          <div className="finance-form-container">
            <h3>Yeni Gelir Ekle</h3>
            <form onSubmit={handleSubmit} className="finance-form">
              <div className="form-group">
                <label htmlFor="amount">Tutar</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={newIncome.amount}
                  onChange={handleChange}
                  step="0.01"
                  required
                  placeholder="0.00"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Açıklama</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={newIncome.description}
                  onChange={handleChange}
                  required
                  placeholder="Gelir açıklaması"
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Tarih</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newIncome.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="sourceType">Kaynak Türü</label>
                <input
                  type="text"
                  id="sourceType"
                  name="sourceType"
                  value={newIncome.sourceType}
                  onChange={handleChange}
                  placeholder="Örn: Satış, Hizmet"
                />
              </div>
              <button type="submit" className="submit-btn">Gelir Ekle</button>
            </form>
      </div>

          <div className="finance-list-container">
            <h3>Gelir Listesi</h3>
            <div className="table-responsive">
              <table className="finance-table">
          <thead>
            <tr>
              <th>Tarih</th>
                    <th>Tutar</th>
              <th>Açıklama</th>
                    <th>Kaynak Türü</th>
                    <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income) => (
              <tr key={income.id}>
                      <td>{income.date}</td>
                      <td className="amount-cell">
                        {parseFloat(income.amount).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL
                      </td>
                <td>{income.description}</td>
                      <td>{income.sourceType || '-'}</td>
                <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(income.id)}
                          title="Sil"
                        >
                          🗑️
                        </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IncomeTracking; 