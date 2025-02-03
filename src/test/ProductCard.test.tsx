import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/Card/ProductCard';
import cartReducer from '../features/cart/cartSlice';

describe('ProductCard Component', () => {
  const product = {
    id: '1',
    name: 'Pasta',
    price: '$12.99 USD',
    image: '/pasta.jpg',
  };

  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
        temporaryQuantities: {},
      },
    },
  });

  it('renders product details', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ProductCard product={product} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Pasta')).toBeInTheDocument();
    expect(screen.getByText('$12.99 USD')).toBeInTheDocument();
  });

  it('adds product to cart when "Add to Cart" button is clicked', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ProductCard product={product} />
        </Provider>
      </MemoryRouter>
    );

    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);

    // Проверяем, что состояние корзины обновилось
    const state = store.getState().cart;
    expect(state.items.length).toBe(1);
    expect(state.totalQuantity).toBe(1);
  });

  it('updates temporary quantity when input changes', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ProductCard product={product} />
        </Provider>
      </MemoryRouter>
    );
  
    const quantityInput = screen.getByRole('spinbutton'); 
    fireEvent.change(quantityInput, { target: { value: '3' } });
  
    expect(store.getState().cart.temporaryQuantities['1']).toBe(3);
  });

  it('adds product with updated quantity to cart', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ProductCard product={product} />
        </Provider>
      </MemoryRouter>
    );
  
    await screen.findByText((content, node) => node?.textContent === 'Pasta');
  
    const quantityInput = await screen.findByRole('spinbutton');
    fireEvent.change(quantityInput, { target: { value: '4' } });
  
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);
  
    await waitFor(() => {
      const state = store.getState().cart;
      expect(state.items.length).toBe(1);
      expect(state.items[0].quantity).toBe(5);
    });
  });
  
  
  it('clears temporary quantity after adding to cart', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ProductCard product={product} />
        </Provider>
      </MemoryRouter>
    );
  
    await screen.findByText((content, node) => node?.textContent === 'Pasta');
  
    const quantityInput = await screen.findByRole('spinbutton');
    fireEvent.change(quantityInput, { target: { value: '3' } });
  
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);
  
    await waitFor(() => {
      expect(store.getState().cart.temporaryQuantities['1']).toBeUndefined();
    }, { timeout: 1500 });
  });
  

  it('does not allow quantity lower than 1', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ProductCard product={product} />
        </Provider>
      </MemoryRouter>
    );
  
    const quantityInput = screen.getByRole('spinbutton');
    fireEvent.change(quantityInput, { target: { value: '0' } });
  
    expect(store.getState().cart.temporaryQuantities['1']).toBe(1);
  
    fireEvent.change(quantityInput, { target: { value: '-5' } });
    expect(store.getState().cart.temporaryQuantities['1']).toBe(1);
  });
  
  
});
