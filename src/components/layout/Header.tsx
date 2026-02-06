'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import styles from './Header.module.scss';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  if (!mounted) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>DummyStore</div>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          DummyStore
        </Link>
        <nav className={styles.nav}>
          {isAuthenticated && user ? (
            <div className={styles.userInfo}>
              <span>
                {user.firstName} {user.lastName}
              </span>
              <button onClick={logout} className={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className={styles.loginLink}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
