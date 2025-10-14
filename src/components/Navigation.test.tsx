import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CartContext } from "../contexts/CartContext";
import { MemoryRouter } from 'react-router';
import Navigation from './Navigation.tsx';

describe('Navigation component', () => {
    it('should render logo', () => {
        render(
            <MemoryRouter>
                <Navigation />
            </MemoryRouter>
        );

        // screen.debug();

        // Assert
        const logo = screen.getByAltText(/JCH Card Shop Logo/i);
        expect(logo).toBeInTheDocument();
    });

    it('should render the total item as 0 when there is no item in the cart', () => {

        // Arrange
        const mockContextValue = {
            cartItems: [],
            removeFromCart: vi.fn(),
            updateCartQuantity: vi.fn(),
            addToCart: vi.fn(),
        };

        // Act
        render(
            <MemoryRouter>
                <CartContext value={mockContextValue}>
                    <Navigation />
                </CartContext>
            </MemoryRouter>
        )

        // Assert
        expect(screen.getByText('(0)')).toBeInTheDocument();
    });

    it('should render the total item quantity in the cart', () => {

        // Arrange

        // Mock cartItems with 3 items in total
        const mockCartItems = [
            {id: '1', name: 'product 1', imageURLSmall: 'image/product-1.jpg', price: 1, quantityInCart: 1},
            {id: '2', name: 'product 2', imageURLSmall: 'image/product-2.jpg', price: 1.5, quantityInCart: 2}
        ];

        const mockContextValue = {
            cartItems: mockCartItems,
            removeFromCart: vi.fn(),
            updateCartQuantity: vi.fn(),
            addToCart: vi.fn(),
        };

        // Act
        render(
            <MemoryRouter>
                <CartContext value={mockContextValue}>
                    <Navigation />
                </CartContext>
            </MemoryRouter>
        )

        // Assert
        expect(screen.getByText('(3)')).toBeInTheDocument();
    });
});