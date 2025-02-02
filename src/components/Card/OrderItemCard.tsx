import React, { FC } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';

interface OrderItem {
  id: string;
  image: string;
  name: string;
  quantity: number;
  totalItemPrice: number;
}

interface OrderItemCardProps {
  item: OrderItem;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border: 1px solid rgba(53, 184, 190, 0.15);
  border-radius: 5px;
  margin-bottom: 1.5rem;
  background-color: var(--background-color);
`;

const ItemImage = styled.img`
  width: 120px;
  height: 120px;
`;

const ItemDetails = styled.div`
  flex: 2;
  margin-left: 1rem;
  text-align: left;
`;

const ItemName = styled.h3`
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.6;
  color: var(--text-color-black);
  margin-bottom: 0.5rem;
`;
const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-end;
`;

const ItemPrice = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  margin-left: 1rem;
  color: var(--background-color-turquoise);
  font-size: 1.1rem;
  margin-right: 40px;
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 45px;
  padding: 0.5rem;
  border: 1px solid var(--border-input-color); 
  border-radius: 4px;
  text-align: center;
  background-color: var(--background-input);
  color: var(--text-color-black);

  &:focus {
    outline: none;
    border-color: var(--text-color-turquoise); 
    box-shadow: 0 0 5px var(--text-color-turquoise);
  }

`;


const OrderItemCard: FC<OrderItemCardProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
      <OrderItem key={item.id}>
            <ItemImage src={item.image} alt={item.name} />
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              </ItemDetails>
              <ItemPrice>
              $ {item.totalItemPrice.toFixed(2)} USD
              </ItemPrice>
              <ItemActions>

              <QuantityInput
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => onQuantityChange(item.id, Number(e.target.value))}
                />
              <Button
                label="X"
                isActive={true}
                onClick={() => onRemove(item.id)}
                style={{ width: '60px', height: '45px'}}
              />
            </ItemActions>
          </OrderItem>
  );
};

export default OrderItemCard;
