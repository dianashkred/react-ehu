import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateTemporaryQuantity } from '../../features/cart/cartSlice';
import { RootState } from '../../store';
import Button from '../Button/Button';
import './ProductCard.css';

interface Product {
  id: string;
  image: string;
  name: string;
  price: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  
  const quantity = useSelector(
    (state: RootState) =>
      state.cart.temporaryQuantities[product.id] || 1 // По умолчанию 1
  );

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), 1); // Минимум 1
    dispatch(updateTemporaryQuantity({ id: product.id, quantity: value }));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ id: product.id, quantity })); // Используем временное количество
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
          <input
            type="number"
            value={quantity} 
            min="1"
            className="quantity-input"
            onChange={handleQuantityChange}
          />

          <Button
            label="Add to card"
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
