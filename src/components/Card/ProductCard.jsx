import React from 'react';
import Button from '../Button/Button';
import './ProductCard.css';


const ProductCard = ({ product }) => {
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
            className="add-to-cart-button"
            label="Add to card"
            onClick={() => console.log(`Added ${product.name} to cart`)}
            
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


