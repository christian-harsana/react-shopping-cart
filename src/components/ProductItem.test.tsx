import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductItem from './ProductItem';
import { CartContext } from '../contexts/CartContext';
import type { ProductType } from '../types/common.type';

describe('ProductItem Component', () => {

    it('should render', () => {

        // Arrange
        const mockItem = {
            id: '1',
            name: 'Product 1',
            imageURLSmall: 'img/product-1-sm.jpg',
            price: 1.99,
            quantityToAdd: 1
        }
       
        // Act
        render(
            <ProductItem product={mockItem} onQuantityChange={vi.fn()} />
        )

        screen.debug();

        // Assert
        expect(screen.getByAltText("Product 1 image")).toBeInTheDocument();
        expect(screen.getByText("Product 1 (1)")).toBeInTheDocument();
        expect(screen.getByText("$1.99")).toBeInTheDocument();
        expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    });


    it('should render the substract button as disabled and unable to be clicked when the quantity is 1', async () => {
        
        // Arrange
        const mockItem = {
            id: '1',
            name: 'Product 1',
            imageURLSmall: 'img/product-1-sm.jpg',
            price: 1.99,
            quantityToAdd: 1
        };
        const user = userEvent.setup();
        const onQuantityChange = vi.fn();

        // Act
        render(
            <ProductItem product={mockItem} onQuantityChange={onQuantityChange} />
        )

        // Assert
        const substractButton = screen.getByRole("button", { name: /substract quantity/i });
        expect(substractButton).toBeInTheDocument();
        expect(substractButton).toBeDisabled();
        await user.click(substractButton);
        expect(onQuantityChange).not.toHaveBeenCalled();

    });

    it('should call onQuantityChange when add button or substract button is clicked', async () => {
        
        // Arrange
        const mockItem = {
            id: '1',
            name: 'Product 1',
            imageURLSmall: 'img/product-1-sm.jpg',
            price: 1.99,
            quantityToAdd: 2
        };
        const onQuantityChange = vi.fn();
        const user = userEvent.setup();
       
        // Act
        render(
            <ProductItem product={mockItem} onQuantityChange={onQuantityChange} />
        )

        // Assert
        const addButton = screen.getByRole("button", { name: /add quantity/i });
        expect(addButton).toBeInTheDocument();
        await user.click(addButton);
        expect(onQuantityChange).toHaveBeenCalled();

        const substractButton = screen.getByRole("button", { name: /substract quantity/i });
        expect(substractButton).toBeInTheDocument();
        await user.click(substractButton);
        expect(onQuantityChange).toHaveBeenCalled();

        expect(onQuantityChange).toHaveBeenCalledTimes(2);
    });


    it('should call onQuantityChange when user change the quantity from the quantity textbox', async () => {
        
        // Arrange
        const mockItem = {
            id: '1',
            name: 'Product 1',
            imageURLSmall: 'img/product-1-sm.jpg',
            price: 1.99,
            quantityToAdd: 1
        };
        const onQuantityChange = vi.fn();
        const user = userEvent.setup();
            
        // Act
        render(
            <ProductItem product={mockItem} onQuantityChange={onQuantityChange} />
        )

        // Assert
        const quantityInput = screen.getByLabelText(/quantity for product 1/i);
        expect(quantityInput).toBeInTheDocument();
        await user.type(quantityInput, '5');
        expect(onQuantityChange).toHaveBeenCalled();
        expect(onQuantityChange).toHaveBeenCalledTimes(1);
    });

    it('should render the "add to cart" button as disabled and unable to be clicked when the price value is "not available"', async () => {
        
        // Arrange
        const mockItem: ProductType = {
            id: '1',
            name: 'Product 1',
            imageURLSmall: 'img/product-1-sm.jpg',
            price: 'not available',
            quantityToAdd: 1
        };

        const onAddToCart = vi.fn();
        const mockContextValue = {
            cartItems: [],
            removeFromCart: vi.fn(),
            updateCartQuantity: vi.fn(),
            addToCart: onAddToCart,
        };

        const user = userEvent.setup();

        // Act
        render(
            <CartContext value={mockContextValue}>
                <ProductItem product={mockItem} onQuantityChange={vi.fn()} />
            </CartContext>
        )

        // Assert
        const addToCartButton = screen.getByRole("button", { name: /add to cart/i });
        expect(addToCartButton).toBeInTheDocument();
        expect(addToCartButton).toBeDisabled();
        await user.click(addToCartButton);
        expect(onAddToCart).not.toHaveBeenCalled();

    });

    it('should render "add to cart" button and call onAddToCart when clicked ', async () => {
        
        // Arrange
        const mockItem: ProductType = {
            id: '1',
            name: 'Product 1',
            imageURLSmall: 'img/product-1-sm.jpg',
            price: 1.99,
            quantityToAdd: 1
        };

        const onAddToCart = vi.fn();
        const mockContextValue = {
            cartItems: [],
            removeFromCart: vi.fn(),
            updateCartQuantity: vi.fn(),
            addToCart: onAddToCart,
        };

        const user = userEvent.setup();

        // Act
        render(
            <CartContext value={mockContextValue}>
                <ProductItem product={mockItem} onQuantityChange={vi.fn()} />
            </CartContext>
        )

        // Assert
        const addToCartButton = screen.getByRole("button", { name: /add to cart/i });
        expect(addToCartButton).toBeInTheDocument();
        await user.click(addToCartButton);
        expect(onAddToCart).toHaveBeenCalled();

    });
})