import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.username || !formData.password || !formData.confirmPassword) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    try {
      const response = await fetch('http://localhost:50505/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('Kayıt işlemi başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
        // 2 saniye sonra login sayfasına yönlendir
        setTimeout(() => {
          navigate('/login', { state: { message: 'Kayıt işleminiz başarıyla tamamlandı. Giriş yapabilirsiniz.' } });
        }, 2000);
      } else {
        const errorData = await response.text();
        setError("Kayıt işlemi başarısız: " + errorData);
      }
    } catch (err) {
      setError("Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.");
    }
  };

  return (
    <motion.div 
      className="register-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="register-box">
        <h2>Kayıt Ol</h2>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-group">
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Şifre"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Şifre Tekrar"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="submit-btn"
          >
            Kayıt Ol
          </motion.button>
        </form>

        <div className="login-link">
          <p>Zaten hesabınız var mı?</p>
          <Link to="/login">Giriş Yap</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Register; 