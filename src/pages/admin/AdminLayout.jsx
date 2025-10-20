import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { authHelpers } from '../../services/supabase';
import Icons from '../../components/Icons/Icons';
import Logo from '../../components/Logo/Logo';
import styles from './AdminLayout.module.css';

function AdminLayout() {
  const location = useLocation();
  const [authState, setAuthState] = useState({
    loading: true,
    isAdmin: false,
    user: null,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const user = await authHelpers.getUser();
      
      if (!user) {
        setAuthState({ loading: false, isAdmin: false, user: null });
        return;
      }

      const role = user.app_metadata?.role || user.user_metadata?.role;
      setAuthState({
        loading: false,
        isAdmin: role === 'admin',
        user,
      });
    } catch (error) {
      console.error('Auth check failed:', error);
      setAuthState({ loading: false, isAdmin: false, user: null });
    }
  }

  async function handleSignOut() {
    try {
      await authHelpers.signOut();
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  }

  if (authState.loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingSpinner}>
          <Icons.Clock size={48} />
          <p>Verifying credentials...</p>
        </div>
      </div>
    );
  }

  if (!authState.isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Logo size="small" />
          <h2 className={styles.adminTitle}>Admin Panel</h2>
        </div>

        <nav className={styles.sidebarNav}>
          <Link
            to="/admin"
            className={`${styles.navLink} ${isActive('/admin') && !location.pathname.includes('/events/') ? styles.active : ''}`}
          >
            <Icons.Grid size={20} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/events/pending"
            className={`${styles.navLink} ${location.pathname.includes('/pending') ? styles.active : ''}`}
          >
            <Icons.Clock size={20} />
            <span>Pending Review</span>
          </Link>

          <Link
            to="/admin/events/published"
            className={`${styles.navLink} ${location.pathname.includes('/published') ? styles.active : ''}`}
          >
            <Icons.CalendarCheck size={20} />
            <span>Published</span>
          </Link>

          <Link
            to="/admin/events/archived"
            className={`${styles.navLink} ${location.pathname.includes('/archived') ? styles.active : ''}`}
          >
            <Icons.Archive size={20} />
            <span>Archived</span>
          </Link>

          <div className={styles.navDivider}></div>

          <Link to="/" className={styles.navLink}>
            <Icons.ExternalLink size={20} />
            <span>View Public Site</span>
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              <Icons.Users size={20} />
            </div>
            <div className={styles.userDetails}>
              <div className={styles.userName}>{authState.user?.email?.split('@')[0] || 'Admin'}</div>
              <div className={styles.userEmail}>{authState.user?.email}</div>
            </div>
          </div>
          <button onClick={handleSignOut} className={styles.signOutBtn}>
            <Icons.X size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
