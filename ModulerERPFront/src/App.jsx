import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import IncomeTracking from './components/modules/IncomeTracking';
import ExpenseTracking from './components/modules/ExpenseTracking';
import Applications from './components/modules/hr/Applications';
import Leaves from './components/modules/hr/Leaves';
import Payroll from './components/modules/hr/Payroll';
import Training from './components/modules/hr/Training';
import Performance from './components/modules/hr/Performance';
import EmployeeManagement from './components/modules/employee/EmployeeManagement';
import SalaryManagement from './components/modules/employee/SalaryManagement';
import InsuranceManagement from './components/modules/employee/InsuranceManagement';
import FinanceReports from './components/modules/FinanceReports';
import BudgetTracking from './components/modules/BudgetTracking';
import OrderTracking from './components/modules/orders/OrderTracking';
import StockTracking from './components/modules/inventory/StockTracking';
import './App.css';

// Protected Route bileşeni
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [userData, setUserData] = useState(null);

  const handleLogin = (loginData) => {
    // Gerçek uygulamada burada API çağrısı yapılacak
    setIsAuthenticated(true);
    setUserData(loginData);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleRegister = (registerData) => {
    // Gerçek uygulamada burada API çağrısı yapılacak
    setIsAuthenticated(true);
    setUserData(registerData);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? 
          <Navigate to="/dashboard" /> : 
          <Login onLogin={handleLogin} />
        } />
        <Route path="/register/:type" element={
          isAuthenticated ? 
          <Navigate to="/dashboard" /> : 
          <Register onRegister={handleRegister} />
        } />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard userData={userData} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        {/* Finans Modülü Rotaları */}
        <Route
          path="/finance/income"
          element={
            <ProtectedRoute>
              <IncomeTracking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance/expense"
          element={
            <ProtectedRoute>
              <ExpenseTracking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance/reports"
          element={
            <ProtectedRoute>
              <FinanceReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance/budget"
          element={
            <ProtectedRoute>
              <BudgetTracking />
            </ProtectedRoute>
          }
        />
        {/* İnsan Kaynakları Modülü Rotaları */}
        <Route
          path="/hr/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/leaves"
          element={
            <ProtectedRoute>
              <Leaves />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/trainings"
          element={
            <ProtectedRoute>
              <Training />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/evaluations"
          element={
            <ProtectedRoute>
              <Performance />
            </ProtectedRoute>
          }
        />
        {/* Çalışan Modülü Rotaları */}
        <Route 
          path="/employee/management" 
          element={
            <ProtectedRoute>
              <EmployeeManagement />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/employee/salary" 
          element={
            <ProtectedRoute>
              <SalaryManagement />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/employee/insurance" 
          element={
            <ProtectedRoute>
              <InsuranceManagement />
            </ProtectedRoute>
          }
        />
        {/* Sipariş Yönetimi Rotası */}
        <Route 
          path="/orders/tracking" 
          element={
            <ProtectedRoute>
              <OrderTracking />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/inventory/stock" 
          element={
            <ProtectedRoute>
              <StockTracking />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
