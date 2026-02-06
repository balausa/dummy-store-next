import Image from 'next/image';
import { Product } from '@/types/product';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  isLoggedIn: boolean;
}

const ProductCard = ({ product, isLoggedIn }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        {isLoggedIn && <button className={styles.addToCartBtn}>Add to cart</button>}
      </div>
    </div>
  );
};

export default ProductCard;
