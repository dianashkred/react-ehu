import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { removeFromCart, updateQuantity, clearCart } from '../../features/cart/cartSlice';
import { updateStreet, updateHouse, setOrderError, setOrderPlaced, clearOrderError, resetOrderState, } from '../../features/order/orderSlice';
import Button from '../Button/Button';
import styled from 'styled-components';
import { Link} from 'react-router-dom';


const OrderMainSection: FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { street, house, error, orderPlaced } = useSelector((state: RootState) => state.order);

  
  if (orderPlaced) {
    return (
      <OrderPlacedContainer>
        <OrderPlacedMessage>Your order has been placed successfully!</OrderPlacedMessage>
        <MenuLink to="/menu" onClick={() => dispatch(resetOrderState())}>Click here to place another order</MenuLink>
      </OrderPlacedContainer>
    );
  }

  if (cartItems.length === 0 ) {
    return (
      <EmptyCartContainer>
        <EmptyCartMessage>Your cart is empty. Choose something to order!</EmptyCartMessage>
        <MenuLink to="/menu">Go to Menu</MenuLink>
      </EmptyCartContainer>
    );
  }

  const handleQuantityChange = (id: string, value: number) => {
    if (value >= 1) {
      dispatch(updateQuantity({ id, quantity: value }));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!street.trim() || !house.trim()) {
      dispatch(setOrderError('Please fill in both the Street and House fields.'));
      return;
    }
    
    dispatch(clearOrderError());
    dispatch(setOrderPlaced());
    dispatch(clearCart());
  };

  return (
    <OrderPageContainer>
      <Title>Finish your order</Title>
      <OrderItems>
        {cartItems.map((item) => (
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
                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
              />
              <Button
                label="X"
                isActive={true}
                onClick={() => handleRemoveItem(item.id)}
                style={{ width: '60px', height: '45px'}}
              />
            </ItemActions>
          </OrderItem>
        ))}
      </OrderItems>
      <Form>
      {error && <ErrorText>{error}</ErrorText>}

      <OrderForm>
      <Label htmlFor="Street">Street</Label>
      <OrderInput
          type="text"
          value={street}
          onChange={(e) => dispatch(updateStreet(e.target.value))}
          required
        />
        </OrderForm>
        <OrderForm>
        <Label htmlFor="Street">House</Label>
        <OrderInput
          type="text"
          value={house}
          onChange={(e) => dispatch(updateHouse(e.target.value))}
          required
        />
        </OrderForm>
        <OrderButton
          label="Order"
          isActive={true}
          onClick={handleSubmitOrder}
        />
      </Form>
    </OrderPageContainer>
  );
};

export default OrderMainSection;

const EmptyCartContainer = styled.div`
  text-align: center;
  padding: 4rem;
  background-image: var(--background-mlo);
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EmptyCartMessage = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 2rem;
`;

const MenuLink = styled(Link)`
  font-size: 1.2rem;
  color: var(--text-color-turquoise);
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color:var(--text-color-turquoise);
  }
`;
const OrderPlacedContainer = styled.div`
  text-align: center;
  padding: 4rem;
  background-image: var(--background-mlo);
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;

`;
const OrderPlacedMessage = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 2rem;
`;

const OrderPageContainer = styled.main`
  padding: 4rem 4rem;
  background-image: var( --background-mlo);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 400;
  color: var(--text-color-turquoise);
  margin-top: 5rem;
`;

const OrderItems = styled.div`
  margin-bottom: 3rem;
`;

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
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const OrderForm = styled.form`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color-black);
  text-align: right;
  margin-right: 10px;
`;

const OrderInput = styled.input`
  width: 350px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
`;


const OrderButton = styled(Button)`
  width: 100%;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 1rem;
  border-radius: 8px;
`;
const ErrorText = styled.p`
  color: red;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
`;