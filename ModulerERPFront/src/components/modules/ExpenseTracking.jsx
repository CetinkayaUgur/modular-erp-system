import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './FinanceModule.css';
import axios from 'axios';

const ExpenseTracking = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newExpense, setNewExpense] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    sourceType: '',
    type: 'expense'
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const url = 'http://localhost:50501/api/finance/records/type/expense';
      
      console.log('İstek URL:', url);
      
      const response = await axios.get(url);
      console.log('Sunucu yanıtı:', response.data);
      setExpenses(response.data);
      setError(null);
    } catch (err) {
      console.error('Hata detayları:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      let errorMessage = 'Gider kayıtları yüklenirken bir hata oluştu.';
      
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
      const [year, month, day] = newExpense.date.split('-');
      const formattedDate = `${day}/${month}/${year}`;

      const requestData = {
        amount: newExpense.amount,
        description: newExpense.description,
        date: formattedDate,
        type: 'expense',
        sourceType: newExpense.sourceType || null,
        sourceId: null
      };

      console.log('Gider kaydı ekleniyor:', requestData);

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
        setNewExpense({
          amount: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
          sourceType: '',
          type: 'expense'
        });
        fetchExpenses(); // Listeyi yenile
      } else {
        const errorText = await response.text();
        console.error('Sunucu hatası:', errorText);
        setError('Gider kaydı eklenirken bir hata oluştu: ' + errorText);
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

  const handleDelete = async (id) => {
    if (window.confirm('Bu gider kaydını silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`http://localhost:50501/api/finance/records/record/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          // Silme başarılı, listeyi güncelle
          fetchExpenses();
        } else {
          const errorText = await response.text();
          console.error('Silme hatası:', errorText);
          setError('Gider kaydı silinirken bir hata oluştu: ' + errorText);
        }
      } catch (err) {
        console.error('Silme hatası:', err);
        setError('Gider kaydı silinirken bir hata oluştu: ' + err.message);
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewExpense({ ...newExpense, [id]: value });
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <motion.div
      className="finance-module expense-tracking"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="finance-container">
        <div style={{ display: 'flex', gap: '20px' }}>
          <div className="finance-form-container">
            <h3>Yeni Gider Ekle</h3>
            <form onSubmit={handleSubmit} className="finance-form">
              <div className="form-group">
                <label htmlFor="amount">Tutar</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={newExpense.amount}
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
                  value={newExpense.description}
                  onChange={handleChange}
                  required
                  placeholder="Gider açıklaması"
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Tarih</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newExpense.date}
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
                  value={newExpense.sourceType}
                  onChange={handleChange}
                  placeholder="Örn: Kira, Fatura"
                />
              </div>
              <button type="submit" className="submit-btn">Gider Ekle</button>
            </form>
          </div>

          <div className="finance-list-container">
            <h3>Gider Listesi</h3>
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
                  {expenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.date}</td>
                      <td className="amount-cell">
                        {parseFloat(expense.amount).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL
                      </td>
                      <td>{expense.description}</td>
                      <td>{expense.sourceType || '-'}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(expense.id)}
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

export default ExpenseTracking; 