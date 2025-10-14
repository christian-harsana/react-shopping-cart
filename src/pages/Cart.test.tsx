import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from "@testing-library/user-event";
import Cart from './Cart.tsx';
import { CartBody } from './Cart.tsx';


describe('Cart component', () => {
    it('should render correct heading', () => {
        render(
            <MemoryRouter>
                <Cart />
            </MemoryRouter>
        );

        // Check if Cart component renders "Cart" heading
        expect(screen.getByRole("heading").textContent).toMatch(/cart/i); 
    });
});

describe('CartBody component', () => {
    it('should render cart empty message when there is no item in the cart', () => {
        render(
            <MemoryRouter>
                <table>
                    <tbody>
                        <CartBody 
                            cartItems={[]} 
                            onRemoveItem={vi.fn()} 
                            onQuantityChange={vi.fn()} />
                    </tbody>
                </table>
            </MemoryRouter>
        )

        expect(screen.getByText(/There is currently no item in the cart/i)).toBeInTheDocument();
    });


    it('should render the same number of remove buttons as the number of items in the cart', () => {
        
        // Arrange
        const mockCartItems = [
            {id: '1', name: 'product 1', imageURLSmall: 'image/product-1.jpg', price: 1, quantityInCart: 1},
            {id: '2', name: 'product 2', imageURLSmall: 'image/product-2.jpg', price: 1.5, quantityInCart: 2}
        ];
            
        // Act
        render(
            <MemoryRouter>
                <table>
                    <tbody>
                        <CartBody 
                            cartItems={mockCartItems} 
                            onRemoveItem={vi.fn()} 
                            onQuantityChange={vi.fn()} />
                    </tbody>
                </table>
            </MemoryRouter>
        )

        // Assert
        const removeButtons = screen.getAllByRole("button", { name: /remove/i });
        expect(removeButtons).toHaveLength(mockCartItems.length);
    });


    it('should call onRemoveItem when remove button is clicked', async () => {
        
        // Arrange
        const mockCartItems = [ {id: '1', name: 'product 1', imageURLSmall: 'image/product-1.jpg', price: 1, quantityInCart: 1} ];
        const onRemoveItem = vi.fn();
        const user = userEvent.setup();
            
        // Act
        render(
            <MemoryRouter>
                <table>
                    <tbody>
                        <CartBody 
                            cartItems={mockCartItems} 
                            onRemoveItem={onRemoveItem} 
                            onQuantityChange={vi.fn()} />
                    </tbody>
                </table>
            </MemoryRouter>
        )

        // Assert
        const removeButton = screen.getByRole("button", { name: /remove/i });
        expect(removeButton).toBeInTheDocument();
        await user.click(removeButton);
        expect(onRemoveItem).toHaveBeenCalled();
    });


    it('should call onQuantityChange when add button or substract button is clicked', async () => {
        
        // Arrange
        const mockCartItems = [ {id: '1', name: 'product 1', imageURLSmall: 'image/product-1.jpg', price: 1, quantityInCart: 1} ];
        const onQuantityChange = vi.fn();
        const user = userEvent.setup();
            
        // Act
        render(
            <MemoryRouter>
                <table>
                    <tbody>
                        <CartBody 
                            cartItems={mockCartItems} 
                            onRemoveItem={vi.fn()} 
                            onQuantityChange={onQuantityChange} />
                    </tbody>
                </table>
            </MemoryRouter>
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
        const mockCartItems = [ {id: '1', name: 'product 1', imageURLSmall: 'image/product-1.jpg', price: 1, quantityInCart: 1} ];
        const onQuantityChange = vi.fn();
        const user = userEvent.setup();
            
        // Act
        render(
            <MemoryRouter>
                <table>
                    <tbody>
                        <CartBody 
                            cartItems={mockCartItems} 
                            onRemoveItem={vi.fn()} 
                            onQuantityChange={onQuantityChange} />
                    </tbody>
                </table>
            </MemoryRouter>
        )

        // Assert
        const quantityInput = screen.getByLabelText(/quantity for product 1/i);
        expect(quantityInput).toBeInTheDocument();
        await user.type(quantityInput, '5');
        expect(onQuantityChange).toHaveBeenCalled();
        expect(onQuantityChange).toHaveBeenCalledTimes(1);
    });

});