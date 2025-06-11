import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import IncomeTracking from './components/modules/IncomeTracking';
import ExpenseTracking from './components/modules/ExpenseTracking';
import ApplicationManagement from './components/modules/hr/ApplicationManagement';
import Leaves from './components/modules/hr/Leaves';
import Training from './components/modules/hr/Training';
import Performance from './components/modules/hr/Performance';
import EmployeeManagement from './components/modules/employee/EmployeeManagement';
import PayrollManagement from './components/modules/PayrollManagement';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? 
          <Navigate to="/dashboard" /> : 
          <Login onLogin={handleLogin} />
        } />
        <Route path="/register" element={
          isAuthenticated ? 
          <Navigate to="/dashboard" /> : 
          <Register onRegister={handleRegister} />
        } />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard userData={userData} /> : <Navigate to="/login" />}
        />
        {/* Finans Modülü Rotaları */}
        <Route
          path="/finance/income"
          element={isAuthenticated ? <IncomeTracking /> : <Navigate to="/login" />}
        />
        <Route
          path="/finance/expense"
          element={isAuthenticated ? <ExpenseTracking /> : <Navigate to="/login" />}
        />
        <Route
          path="/finance/reports"
          element={isAuthenticated ? <FinanceReports /> : <Navigate to="/login" />}
        />
        <Route
          path="/finance/budget"
          element={isAuthenticated ? <BudgetTracking /> : <Navigate to="/login" />}
        />
        {/* İnsan Kaynakları Modülü Rotaları */}
        <Route
          path="/hr/applications"
          element={isAuthenticated ? <ApplicationManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/hr/leaves"
          element={isAuthenticated ? <Leaves /> : <Navigate to="/login" />}
        />
        <Route
          path="/hr/trainings"
          element={isAuthenticated ? <Training /> : <Navigate to="/login" />}
        />
        <Route
          path="/hr/evaluations"
          element={isAuthenticated ? <Performance /> : <Navigate to="/login" />}
        />
        {/* Çalışan Modülü Rotaları */}
        <Route 
          path="/employee/management" 
          element={isAuthenticated ? <EmployeeManagement /> : <Navigate to="/login" />} 
        />
        {/* Maaş ve Sigorta Yönetimi Rotası */}
        <Route 
          path="/payroll/management" 
          element={isAuthenticated ? <PayrollManagement /> : <Navigate to="/login" />} 
        />
        {/* Sipariş Yönetimi Rotası */}
        <Route 
          path="/orders/tracking" 
          element={isAuthenticated ? <OrderTracking /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/inventory/stock" 
          element={isAuthenticated ? <StockTracking /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
