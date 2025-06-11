import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Register'dan gelen mesajı kontrol et
    if (location.state?.message) {
      setSuccess(location.state.message);
      // URL'den state'i temizle
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const username = formData.username.trim();
    const password = formData.password.trim();

    if (!username || !password) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    try {
      const response = await fetch('http://localhost:50505/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        onLogin(data);
      } else if (response.status === 401) {
        setError("Kullanıcı adı veya şifre hatalı");
      } else {
        setError("Giriş başarısız, sunucu hatası");
      }
    } catch (err) {
      setError("Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.");
    }
  };

  return (
    <motion.div 
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="login-box">
        <div className="company-logo">
          <img src="/logo (2).png" alt="Company Logo" />
        </div>
        <h2>Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <div className="form-group">
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value.trimStart() })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Şifre"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="submit-btn"
          >
            Giriş Yap
          </motion.button>
        </form>

        <div className="register-link">
          <p>Hesabınız yok mu?</p>
          <Link to="/register">
            Kayıt Ol
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
