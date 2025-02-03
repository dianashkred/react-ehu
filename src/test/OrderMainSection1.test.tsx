import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import OrderMainSection from '../components/Order/OrderMainSection';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';

// Определяем интерфейс состояния для тестового store
interface TestState {
  cart: {
    items: Array<{
      id: string;
      name: string;
      price: string;
      image: string;
      quantity: number;
      totalItemPrice: number;
    }>;
    totalQuantity: number;
    totalPrice: number;
    temporaryQuantities: Record<string, number>;
  };
  order: {
    street: string;
    house: string;
    error: string | null;
    orderPlaced: boolean;
  };
}

// Функция для создания нового store с заданным состоянием
const createTestStore = (preloadedState: TestState) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      order: orderReducer,
    },
    preloadedState,
  });
};

// Функция-обёртка для рендера компонента с Provider и MemoryRouter
const renderWithStore = (preloadedState: TestState) => {
  const store = createTestStore(preloadedState);
  return { store, ...render(
    <MemoryRouter>
      <Provider store={store}>
        <OrderMainSection />
      </Provider>
    </MemoryRouter>
  ) };
};

describe('OrderMainSection Component', () => {
  it('renders order page with items', () => {
    const preloadedState: TestState = {
      cart: {
        items: [
          {
            id: '1',
            name: 'Pasta',
            price: '$12.99 USD',
            image: '/pasta.jpg',
            quantity: 2,
            totalItemPrice: 25.98,
          },
        ],
        totalQuantity: 2,
        totalPrice: 25.98,
        temporaryQuantities: {},
      },
      order: { street: '', house: '', error: null, orderPlaced: false },
    };

    renderWithStore(preloadedState);

    expect(screen.getByText('Finish your order')).toBeInTheDocument();
    expect(screen.getByText('Pasta')).toBeInTheDocument();
  });

  it('updates quantity when input changes', async () => {
    const preloadedState: TestState = {
      cart: {
        items: [
          {
            id: '1',
            name: 'Pasta',
            price: '$12.99 USD',
            image: '/pasta.jpg',
            quantity: 2,
            totalItemPrice: 25.98,
          },
        ],
        totalQuantity: 2,
        totalPrice: 25.98,
        temporaryQuantities: {},
      },
      order: { street: '', house: '', error: null, orderPlaced: false },
    };

    const { store } = renderWithStore(preloadedState);

    // Находим поле ввода типа number (role "spinbutton")
    const quantityInput = screen.getByRole('spinbutton');
    fireEvent.change(quantityInput, { target: { value: '5' } });

    await waitFor(() => {
      expect(store.getState().cart.items[0].quantity).toBe(5);
    });
  });

  it('removes item when delete button is clicked', () => {
    const preloadedState: TestState = {
      cart: {
        items: [
          {
            id: '1',
            name: 'Pasta',
            price: '$12.99 USD',
            image: '/pasta.jpg',
            quantity: 2,
            totalItemPrice: 25.98,
          },
        ],
        totalQuantity: 2,
        totalPrice: 25.98,
        temporaryQuantities: {},
      },
      order: { street: '', house: '', error: null, orderPlaced: false },
    };

    const { store } = renderWithStore(preloadedState);

    const deleteButton = screen.getByText('X');
    fireEvent.click(deleteButton);

    expect(store.getState().cart.items).toHaveLength(0);
  });

  it('updates quantity (temporary quantity scenario) when input changes', async () => {
    const preloadedState: TestState = {
      cart: {
        items: [
          {
            id: '1',
            name: 'Pasta',
            price: '$12.99 USD',
            image: '/pasta.jpg',
            quantity: 2,
            totalItemPrice: 25.98,
          },
        ],
        totalQuantity: 2,
        totalPrice: 25.98,
        temporaryQuantities: {},
      },
      order: { street: '', house: '', error: null, orderPlaced: false },
    };

    const { store } = renderWithStore(preloadedState);

    await waitFor(() => {
      expect(screen.getByText(/Pasta/i)).toBeInTheDocument();
    });
    const quantityInput = screen.getByRole('spinbutton');
    fireEvent.change(quantityInput, { target: { value: '5' } });
    await waitFor(() => {
      expect(store.getState().cart.items[0].quantity).toBe(5);
    });
  });

  it('clears cart when order is placed', async () => {
    const preloadedState: TestState = {
      cart: {
        items: [
          {
            id: '1',
            name: 'Pasta',
            price: '$12.99 USD',
            image: '/pasta.jpg',
            quantity: 2,
            totalItemPrice: 25.98,
          },
        ],
        totalQuantity: 2,
        totalPrice: 25.98,
        temporaryQuantities: {},
      },
      order: { street: '', house: '', error: null, orderPlaced: false },
    };

    const { store } = renderWithStore(preloadedState);

    await waitFor(() => {
      expect(screen.getByText(/Pasta/i)).toBeInTheDocument();
    });

    // Поиск полей ввода адреса по placeholder; убедитесь, что они заданы в компоненте
    const streetInput = screen.getByPlaceholderText('Street');
    const houseInput = screen.getByPlaceholderText('House');

    fireEvent.change(streetInput, { target: { value: 'Main St' } });
    fireEvent.change(houseInput, { target: { value: '123' } });

    const placeOrderButton = screen.getByRole('button', { name: /Order/i });
    fireEvent.click(placeOrderButton);

    await waitFor(() => {
      expect(store.getState().cart.items).toHaveLength(0);
      expect(store.getState().cart.totalQuantity).toBe(0);
    });
  });

  it('renders empty cart message when there are no items', () => {
    const emptyState: TestState = {
      cart: { items: [], totalQuantity: 0, totalPrice: 0, temporaryQuantities: {} },
      order: { street: '', house: '', error: null, orderPlaced: false },
    };
    const store = createTestStore(emptyState);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <OrderMainSection />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('Your cart is empty. Choose something to order!')).toBeInTheDocument();
  });
});
