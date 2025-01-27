import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateTemporaryQuantity } from '../../features/cart/cartSlice';
import { RootState } from '../../store';
import styled from 'styled-components';
import Button from '../Button/Button';

const ProductCardContainer = styled.div`
  display: flex;
  padding: 1.5rem;
  text-align: left;
  border: 1px solid rgba(53, 184, 190, 0.15);
  border-radius: 5px;
  background-color: white;
  width: 500px;
  margin: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 400;
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  margin-right: 1rem;
`;

const ProductDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductName = styled.h3`
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.6;
  color: #08090a;
  margin: 0;
`;

const ProductPrice = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #35b8be;
  line-height: 20px;
  margin-left: 1rem;
  white-space: nowrap;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #546285;
  letter-spacing: 0.32px;
  margin: 0.8rem 0;
`;

const ProductActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 50px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
`;

interface Product {
  id: string;
  image: string;
  name: string;
  price: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;

}

const ProductCard: FC<ProductCardProps> = ({ product}) => {
  const dispatch = useDispatch();

  const quantity = useSelector((state: RootState) => state.cart.temporaryQuantities[product.id] || 1);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), 1);
    dispatch(updateTemporaryQuantity({ id: product.id, quantity: value }));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    }));
  };

  return (
    <ProductCardContainer>
      <ProductImage src={product.image} alt={product.name} />
      <ProductDetails>
        <ProductHeader>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{product.price}</ProductPrice>
        </ProductHeader>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductActions>
          <QuantityInput
            type="number"
            value={quantity}
            min="1"
            onChange={handleQuantityChange}
          />
          <Button label="Add to Cart" onClick={handleAddToCart} />
        </ProductActions>
      </ProductDetails>
    </ProductCardContainer>
  );
};

export default ProductCard;
 