import { FC } from 'react';
import Button from '../Button/Button';
import './ProductCard.css';

interface Product {
  image: string;
  name: string;
  price: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  addToCart?: () => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, addToCart }) => {
  const handleAddToCart = () => {
    if (addToCart) {
      addToCart();
    } else {
      console.error('addToCart is not a function');
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <div className="product-header">
          <h3 className="product-name">{product.name}</h3>
          <span className="product-price">{product.price}</span>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <input type="number" defaultValue="1" min="1" readOnly className="quantity-input" />
          <Button
            label="Add to cart"
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
