import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import RecipesProvider from '../context/RecipesProvider';
import Recipes from '../pages/Recipes';

describe('Testa a página de receitas', () => {
  it('Deve mostrar o resultado apropriado ao clicar nos filtros', async () => {
    render(<RecipesProvider><Recipes /></RecipesProvider>);

    // Categoria Beef
    await waitFor(() => {
      userEvent.click(screen.getByTestId('Beef-category-filter'));
    });
    await waitFor(() => {
      expect(screen.getByText(/Beef and Mustard Pie/i)).toBeInTheDocument();
      expect(screen.getByText(/Beef and Oyster pie/i)).toBeInTheDocument();
      expect(screen.getByText(/Beef Rendang/i)).toBeInTheDocument();
    });

    // Categoria All
    userEvent.click(screen.getByTestId('All-category-filter'));
    await waitFor(() => {
      expect(screen.getByText(/Corba/i)).toBeInTheDocument();
      expect(screen.getByText(/Burek/i)).toBeInTheDocument();
      expect(screen.getByText(/Kumpir/i)).toBeInTheDocument();
    });

    // Categoria Breakfast
    userEvent.click(screen.getByTestId('Breakfast-category-filter'));
    await waitFor(() => {
      expect(screen.getByText(/Breakfast Potatoes/i)).toBeInTheDocument();
      expect(screen.getByText(/Smoked Haddock Kedgeree/i)).toBeInTheDocument();
      expect(screen.getByText(/Fruit and Cream Cheese Breakfast Pastries/i)).toBeInTheDocument();
    });

    // Deve retornar as receitas da categoria All caso clique duas vezes em um filtro
    userEvent.click(screen.getByTestId('Breakfast-category-filter'));
    await waitFor(() => {
      expect(screen.getByText(/Corba/i)).toBeInTheDocument();
      expect(screen.getByText(/Burek/i)).toBeInTheDocument();
      expect(screen.getByText(/Kumpir/i)).toBeInTheDocument();
    });
  });

  it('Testa os filtros da página de bebidas', async () => {
    render(
      <RecipesProvider>
        <Recipes foodOrDrink='Drinks' />
      </RecipesProvider>
    );

    // Categoria Shake
    await waitFor(() => {
      userEvent.click(screen.getByTestId('Shake-category-filter'));
    });
    await waitFor(() => {
      expect(screen.getByText(/151 Florida Bushwacker/i)).toBeInTheDocument();
      expect(screen.getByText(/Avalanche/i)).toBeInTheDocument();
      expect(screen.getByText(/Baby Eskimo/i)).toBeInTheDocument();
    });
  });
});