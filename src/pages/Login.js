import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Введите корректный email адрес';
    }

    // Валидация пароля
    if (!password) {
      newErrors.password = 'Пароль обязателен для заполнения';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Имитация аутентификации
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSubmitting(false);
      setLoginSuccess(true);

      // Перенаправление через 2 секунды
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Вход в систему</h1>
          <p>Введите ваши учетные данные для доступа к трекеру технологий</p>
        </div>

        {/* Область для скринридера */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {isSubmitting && 'Выполняется вход...'}
          {loginSuccess && 'Вход выполнен успешно!'}
        </div>

        {/* Визуальное сообщение об успехе */}
        {loginSuccess && (
          <div className="success-message" role="alert">
            Вход выполнен успешно! Перенаправление...
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Поле email */}
          <div className="form-group">
            <label htmlFor="email">
              Email <span aria-label="обязательное поле">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={errors.email ? 'error' : ''}
              placeholder="example@mail.com"
              disabled={isSubmitting || loginSuccess}
            />
            {errors.email && (
              <span id="email-error" className="error-message" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Поле пароля */}
          <div className="form-group">
            <label htmlFor="password">
              Пароль <span aria-label="обязательное поле">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-required="true"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={errors.password ? 'error' : ''}
              placeholder="Введите пароль"
              disabled={isSubmitting || loginSuccess}
            />
            {errors.password && (
              <span id="password-error" className="error-message" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            className="btn-login"
            disabled={isSubmitting || loginSuccess}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Вход...' : 'Войти'}
          </button>

          <div className="login-links">
            <button
              type="button"
              className="btn-link"
              onClick={() => navigate('/')}
              disabled={isSubmitting}
            >
              Вернуться на главную
            </button>
          </div>
        </form>

        <div className="login-info">
          <h3>Демо-доступ:</h3>
          <p><strong>Email:</strong> demo@example.com</p>
          <p><strong>Пароль:</strong> демо123</p>
          <p className="note">Для демонстрации используйте любые валидные данные</p>
        </div>
      </div>
    </div>
  );
}

export default Login;