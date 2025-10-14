import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Home from './Home.tsx';


describe('Home component', () => {
    it('renders correct heading', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        // screen.debug();

        // Check if Home component renders "Welcome" heading
        expect(screen.getByRole("heading").textContent).toMatch(/welcome/i); 
    });
});