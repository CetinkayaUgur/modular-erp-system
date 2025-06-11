import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './FinanceModule.css';

const BudgetTracking = () => {
  const [budgetData, setBudgetData] = useState({
    incomes: [],
    expenses: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const fetchBudgetData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [incomesResponse, expensesResponse] = await Promise.all([
        axios.get('http://localhost:50501/api/finance/records/type/income'),
        axios.get('http://localhost:50501/api/finance/records/type/expense')
      ]);

      setBudgetData({
        incomes: incomesResponse.data,
        expenses: expensesResponse.data
      });
    } catch (err) {
      setError('Bütçe verileri yüklenirken bir hata oluştu: ' + err.message);
      console.error('Bütçe verileri yüklenirken hata:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilter = async () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      setError('Lütfen başlangıç ve bitiş tarihlerini seçin');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`http://localhost:50501/api/finance/records/between?start=${dateRange.startDate}&end=${dateRange.endDate}`);
      
      // Gelen kayıtları gelir ve gider olarak ayır
      const filteredRecords = response.data;
      const incomes = filteredRecords.filter(record => record.type === 'income');
      const expenses = filteredRecords.filter(record => record.type === 'expense');

      setBudgetData({
        incomes,
        expenses
      });
    } catch (err) {
      setError('Filtreleme sırasında bir hata oluştu: ' + err.message);
      console.error('Filtreleme hatası:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilter = () => {
    setDateRange({ startDate: '', endDate: '' });
    fetchBudgetData();
  };

  const calculateTotals = () => {
    const totalIncome = budgetData.incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpense = budgetData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const balance = totalIncome - totalExpense;

    return {
      totalIncome,
      totalExpense,
      balance
    };
  };

  const totals = calculateTotals();

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
      className="finance-module"
    >
      <h2>Bütçe Takibi</h2>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="total-balance-card">
        <h3>Toplam Bakiye</h3>
        <p className={`total-amount ${totals.balance >= 0 ? 'positive' : 'negative'}`}>
          {totals.balance.toLocaleString('tr-TR')} ₺
        </p>
      </div>

      <div className="filter-section">
        <div className="filter-header">
          <h3>Tarih Aralığı Filtreleme</h3>
          <p>Belirli bir tarih aralığındaki gelir ve giderleri görüntüleyin</p>
        </div>
        <div className="date-inputs">
          <div className="date-input-group">
            <label>Başlangıç Tarihi</label>
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateChange}
            />
          </div>
          <div className="date-input-group">
            <label>Bitiş Tarihi</label>
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
        <div className="filter-buttons">
          <button onClick={handleFilter} className="filter-button">
            Filtrele
          </button>
          <button onClick={handleClearFilter} className="clear-button">
            Filtreyi Temizle
          </button>
        </div>
      </div>

      <div className="budget-summary">
        <div className="budget-card income">
          <h4>Toplam Gelir</h4>
          <p className="amount">{totals.totalIncome.toLocaleString('tr-TR')} ₺</p>
        </div>
        <div className="budget-card expense">
          <h4>Toplam Gider</h4>
          <p className="amount">{totals.totalExpense.toLocaleString('tr-TR')} ₺</p>
        </div>
      </div>

      <div className="budget-details">
        <div className="budget-section">
          <h3>Gelir Detayları</h3>
          <table>
            <thead>
              <tr>
                <th>Tarih</th>
                <th>Tutar</th>
                <th>Açıklama</th>
                <th>Kaynak Türü</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.incomes.map(income => (
                <tr key={income.id}>
                  <td>{income.date}</td>
                  <td>{income.amount.toLocaleString('tr-TR')} ₺</td>
                  <td>{income.description}</td>
                  <td>{income.sourceType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="budget-section">
          <h3>Gider Detayları</h3>
          <table>
            <thead>
              <tr>
                <th>Tarih</th>
                <th>Tutar</th>
                <th>Açıklama</th>
                <th>Kaynak Türü</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.expenses.map(expense => (
                <tr key={expense.id}>
                  <td>{expense.date}</td>
                  <td>{expense.amount.toLocaleString('tr-TR')} ₺</td>
                  <td>{expense.description}</td>
                  <td>{expense.sourceType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetTracking; 