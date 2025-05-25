import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import './Register.css';

const Register = ({ onRegister }) => {
  const { type } = useParams();
  const isCompany = type === 'company';
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    ...(isCompany 
      ? {
          companyName: '',
          taxNumber: '',
          address: ''
        }
      : {
          firstName: '',
          lastName: '',
          phone: ''
        }
    )
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validasyon
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    if (isCompany) {
      if (!formData.companyName || !formData.taxNumber) {
        setError('Lütfen şirket bilgilerini eksiksiz doldurun');
        return;
      }
    } else {
      if (!formData.firstName || !formData.lastName) {
        setError('Lütfen kişisel bilgilerinizi eksiksiz doldurun');
        return;
      }
    }

    // Gerçek uygulamada burada API çağrısı yapılacak
    onRegister({
      ...formData,
      type: isCompany ? 'company' : 'user'
    });
  };

  return (
    <motion.div 
      className="register-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="register-box">
        <h2>{isCompany ? 'Şirket Kaydı' : 'Kullanıcı Kaydı'}</h2>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          {isCompany ? (
            <>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Şirket Adı"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Vergi Numarası"
                  value={formData.taxNumber}
                  onChange={(e) => setFormData({...formData, taxNumber: e.target.value})}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Adres"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Ad"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Soyad"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Telefon"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <input
              type="email"
              placeholder="E-posta"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
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
