import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useStore } from '../../app/store';
import Icons from '../Icons/Icons';
import Logo from '../Logo/Logo';
import styles from './Layout.module.css';

function Layout() {
  const bootstrap = useStore((state) => state.bootstrap);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className={styles.appLayout}>
      <nav className={styles.navbar}>
        <div className="container">
          <div className={styles.navInner}>
            <Link to="/" className={styles.navBrand} onClick={closeMobileMenu}>
              <Logo size="small" />
            </Link>

            <button
              className={styles.mobileMenuToggle}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
            </button>

            <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.navLinksOpen : ''}`}>
              <Link 
                to="/" 
                className={isActive('/') ? styles.active : ''}
                onClick={closeMobileMenu}
              >
                <span className={styles.linkIcon}><Icons.Home size={18} /></span>
                Home
              </Link>
              <Link 
                to="/calendar" 
                className={isActive('/calendar') ? styles.active : ''}
                onClick={closeMobileMenu}
              >
                <span className={styles.linkIcon}><Icons.Calendar size={18} /></span>
                Calendar
              </Link>
              <Link 
                to="/map" 
                className={isActive('/map') ? styles.active : ''}
                onClick={closeMobileMenu}
              >
                <span className={styles.linkIcon}><Icons.Map size={18} /></span>
                Map
              </Link>
              <Link 
                to="/register" 
                className={`btn btn-primary ${styles.registerBtn}`}
                onClick={closeMobileMenu}
              >
                <Icons.Plus size={18} />
                Register Event
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <footer className={styles.siteFooter}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div className={styles.footerSection}>
              <div className={styles.footerLogo}>
                <Logo size="small" />
              </div>
              <p className={styles.footerDescription}>
                Connecting communities worldwide in the journey toward a waste-free future.
                Part of International Zero Waste Month.
              </p>
              <div className={styles.socialLinks}>
                <a href="https://zerowaste.asia" target="_blank" rel="noopener noreferrer" aria-label="Website">
                  <Icons.Globe size={20} />
                </a>
                <a href="https://twitter.com/zerowaste" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Icons.ExternalLink size={20} />
                </a>
                <a href="https://facebook.com/zerowaste" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Icons.ExternalLink size={20} />
                </a>
                <a href="https://instagram.com/zerowaste" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Icons.ExternalLink size={20} />
                </a>
              </div>
            </div>

            <div className={styles.footerSection}>
              <h4>Quick Links</h4>
              <ul className={styles.footerLinks}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/calendar">Event Calendar</Link></li>
                <li><Link to="/map">Map View</Link></li>
                <li><Link to="/register">Register Event</Link></li>
              </ul>
            </div>

            <div className={styles.footerSection}>
              <h4>Resources</h4>
              <ul className={styles.footerLinks}>
                <li><a href="https://zerowaste.asia/about" target="_blank" rel="noopener noreferrer">About Us</a></li>
                <li><a href="https://zerowaste.asia/guidelines" target="_blank" rel="noopener noreferrer">Event Guidelines</a></li>
                <li><a href="https://zerowaste.asia/toolkit" target="_blank" rel="noopener noreferrer">Organizer Toolkit</a></li>
                <li><a href="https://zerowaste.asia/partners" target="_blank" rel="noopener noreferrer">Partners</a></li>
              </ul>
            </div>

            <div className={styles.footerSection}>
              <h4>Legal</h4>
              <ul className={styles.footerLinks}>
                <li><a href="https://zerowaste.asia/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
                <li><a href="https://zerowaste.asia/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
                <li><a href="https://zerowaste.asia/contact" target="_blank" rel="noopener noreferrer">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>
              © 2025 <a href="https://zerowaste.asia" target="_blank" rel="noopener noreferrer">Zero Waste Asia</a>. 
              All rights reserved. Built with <Icons.Heart size={14} style={{display: 'inline', verticalAlign: 'middle'}} /> for the planet.
            </p>
            <p className={styles.footerCredits}>
              Part of International Zero Waste Month • July 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
