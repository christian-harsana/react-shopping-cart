import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Shop from './Shop.tsx';


describe('Shop component', () => {
    it('renders correct heading', () => {
        render(
            <MemoryRouter>
                <Shop />
            </MemoryRouter>
        );

        // screen.debug();

        // Check if Shop component renders "Shop" heading
        expect(screen.getByRole("heading").textContent).toMatch(/shop/i); 
    });
});