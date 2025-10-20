import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authHelpers } from '../../services/supabase';
import Icons from '../../components/Icons/Icons';
import Logo from '../../components/Logo/Logo';
import styles from './AdminLogin.module.css';

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if already logged in
  useEffect(() => {
    (async () => {
      const isAdmin = await authHelpers.isAdmin();
      if (isAdmin) {
        navigate('/admin', { replace: true });
      }
    })();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user } = await authHelpers.signIn(email, password);
      
      // Check if user has admin role
      const role = user.app_metadata?.role || user.user_metadata?.role;
      
      if (role !== 'admin') {
        setError('Access denied. Admin privileges required.');
        await authHelpers.signOut();
        setLoading(false);
        return;
      }

      // Redirect to admin dashboard
      navigate('/admin', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <Logo size="default" />
          <h1 className={styles.title}>Admin Login</h1>
          <p className={styles.subtitle}>Zero Waste Festival 2025</p>
        </div>

        {error && (
          <div className={styles.errorAlert}>
            <Icons.X size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">
              <Icons.Users size={18} /> Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@zerowaste.asia"
              required
              disabled={loading}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">
              <Icons.Lock size={18} /> Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
              className={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary ${styles.loginButton}`}
          >
            {loading ? (
              <>
                <Icons.Clock size={20} />
                Signing in...
              </>
            ) : (
              <>
                <Icons.ChevronRight size={20} />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className={styles.loginFooter}>
          <a href="/" className={styles.backLink}>
            <Icons.Home size={16} />
            Back to Public Site
          </a>
        </div>
      </div>

      <div className={styles.loginBackground}>
        <div className={styles.backgroundPattern}></div>
      </div>
    </div>
  );
}

export default AdminLogin;

