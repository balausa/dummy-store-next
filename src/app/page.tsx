'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/api/products';
import { Product } from '@/types/product';
import ProductCard from '@/components/ui/ProductCard';
import { useAuthStore } from '@/store/useAuthStore';
import styles from './Home.module.scss';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(12);
        setProducts(data.products);
      } catch {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.centered}>
        <div className={styles.loader}>Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centered}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Our Products</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} isLoggedIn={mounted && isAuthenticated} />
        ))}
      </div>
    </div>
  );
}
