import { describe, it, expect } from 'vitest';
import cartReducer, { addToCart, removeFromCart, updateQuantity, updateTemporaryQuantity, clearCart } from '../features/cart/cartSlice';

describe('cartSlice Reducer', () => {
  it('adds a new item to the cart', () => {
    const initialState = {
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      temporaryQuantities: {},
    };

    const action = addToCart({
      id: '1',
      name: 'Pasta',
      price: '$12.99 USD',
      image: '/pasta.jpg',
      quantity: 2,
    });

    const state = cartReducer(initialState, action);
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.totalQuantity).toBe(2);
    expect(state.items[0].totalItemPrice).toBe(25.98);
  });

  it('increments quantity of an existing item instead of adding a duplicate', () => {
    const initialState = {
      items: [{ id: '1', name: 'Pasta', price: '$12.99 USD', image: '/pasta.jpg', quantity: 2, totalItemPrice: 25.98 }],
      totalQuantity: 2,
      totalPrice: 25.98,
      temporaryQuantities: {},
    };

    const action = addToCart({
      id: '1',
      name: 'Pasta',
      price: '$12.99 USD',
      image: '/pasta.jpg',
      quantity: 1,
    });

    const state = cartReducer(initialState, action);
    expect(state.items).toHaveLength(1); // Не добавляется новый, увеличивается существующий
    expect(state.items[0].quantity).toBe(3);
    expect(state.totalQuantity).toBe(3);
  });

  it('removes an item from the cart', () => {
    const initialState = {
      items: [{ id: '1', name: 'Pasta', price: '$12.99 USD', image: '/pasta.jpg', quantity: 2, totalItemPrice: 25.98 }],
      totalQuantity: 2,
      totalPrice: 25.98,
      temporaryQuantities: {},
    };

    const action = removeFromCart('1');
    const state = cartReducer(initialState, action);

    expect(state.items).toHaveLength(0);
    expect(state.totalQuantity).toBe(0);
    expect(state.totalPrice).toBe(0);
  });

  it('does not crash when removing a non-existent item', () => {
    const initialState = {
      items: [{ id: '1', name: 'Pasta', price: '$12.99 USD', image: '/pasta.jpg', quantity: 2, totalItemPrice: 25.98 }],
      totalQuantity: 2,
      totalPrice: 25.98,
      temporaryQuantities: {},
    };

    const action = removeFromCart('2'); 
    const state = cartReducer(initialState, action);

    expect(state.items).toHaveLength(1);
    expect(state.totalQuantity).toBe(2);
    expect(state.totalPrice).toBe(25.98);
  });

  it('updates item quantity correctly', () => {
    const initialState = {
      items: [{ id: '1', name: 'Pasta', price: '$12.99 USD', image: '/pasta.jpg', quantity: 2, totalItemPrice: 25.98 }],
      totalQuantity: 2,
      totalPrice: 25.98,
      temporaryQuantities: {},
    };

    const action = updateQuantity({ id: '1', quantity: 3 });
    const state = cartReducer(initialState, action);

    expect(state.items[0].quantity).toBe(3);
    expect(state.totalQuantity).toBe(3);
    expect(state.totalPrice).toBeCloseTo(38.97);
  });

  it('does nothing when updating quantity of a non-existent item', () => {
    const initialState = {
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      temporaryQuantities: {},
    };

    const action = updateQuantity({ id: '1', quantity: 3 });
    const state = cartReducer(initialState, action);

    expect(state.items).toHaveLength(0);
    expect(state.totalQuantity).toBe(0);
    expect(state.totalPrice).toBe(0);
  });

  it('updates temporary quantity', () => {
    const initialState = {
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      temporaryQuantities: {},
    };

    const action = updateTemporaryQuantity({ id: '1', quantity: 3 });
    const state = cartReducer(initialState, action);

    expect(state.temporaryQuantities['1']).toBe(3);
  });

  it('clears the cart', () => {
    const initialState = {
      items: [{ id: '1', name: 'Pasta', price: '$12.99 USD', image: '/pasta.jpg', quantity: 2, totalItemPrice: 21.98 }],
      totalQuantity: 2,
      totalPrice: 25.98,
      temporaryQuantities: { '1': 2 },
    };

    const action = clearCart();
    const state = cartReducer(initialState, action);

    expect(state.items).toHaveLength(0);
    expect(state.totalQuantity).toBe(0);
    expect(state.totalPrice).toBe(0);
    expect(Object.keys(state.temporaryQuantities)).toHaveLength(0);
  });
  it('increments quantity of an existing item instead of adding a duplicate', () => {
    const initialState = {
      items: [{ 
        id: '1', 
        name: 'Pasta', 
        price: '$12.99 USD', 
        image: '/pasta.jpg', 
        quantity: 2, 
        totalItemPrice: 25.98 
      }],
      totalQuantity: 2,
      totalPrice: 25.98,
      temporaryQuantities: {},
    };
  
    const action = addToCart({
      id: '1',  
      name: 'Pasta',
      price: '$12.99 USD',
      image: '/pasta.jpg',
      quantity: 1, 
    });
  
    const state = cartReducer(initialState, action);
    
    expect(state.items).toHaveLength(1); 
    expect(state.items[0].quantity).toBe(3); 
    expect(state.items[0].totalItemPrice).toBeCloseTo(38.97); 
  });
  it('updates temporary quantity', () => {
    const initialState = {
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      temporaryQuantities: {},
    };
  
    const action = updateTemporaryQuantity({ id: '1', quantity: 3 });
    const state = cartReducer(initialState, action);
  
    expect(state.temporaryQuantities['1']).toBe(3);
  });
  
  
});
