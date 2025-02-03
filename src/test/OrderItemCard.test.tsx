import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import OrderItemCard from '../components/Card/OrderItemCard';
import { MemoryRouter } from 'react-router-dom';

describe('OrderItemCard Component', () => {
  const product = {
    id: '1',
    name: 'Pasta',
    image: '/pasta.jpg',
    quantity: 2,
    totalItemPrice: 25.98,
  };

  const mockOnQuantityChange = vi.fn();
  const mockOnRemove = vi.fn();

  it('renders product details', () => {
    render(
      <MemoryRouter>
        <OrderItemCard item={product} onQuantityChange={mockOnQuantityChange} onRemove={mockOnRemove} />
      </MemoryRouter>
    );

    expect(screen.getByText('Pasta')).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('25.98'))).toBeInTheDocument();
  });

  it('calls onRemove when delete button is clicked', () => {
    render(
      <MemoryRouter>
        <OrderItemCard item={product} onQuantityChange={mockOnQuantityChange} onRemove={mockOnRemove} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole('button', { name: /x/i });
    fireEvent.click(deleteButton);
    expect(mockOnRemove).toHaveBeenCalledWith('1');
  });
});
