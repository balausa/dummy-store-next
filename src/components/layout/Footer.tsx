'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import styles from './Footer.module.scss';

const Footer = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>
          © {currentYear} {mounted && isAuthenticated && user && `| Logged as ${user.email}`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
