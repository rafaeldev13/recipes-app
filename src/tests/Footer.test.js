import React from 'react';
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import RecipesProvider from '../context/RecipesProvider';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o componente Footer', () => {
  it('Deve redirecionar para as rotas devidas', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Footer />
      </RecipesProvider>
    );
    userEvent.click(screen.getByTestId('drinks-bottom-btn'));
    expect(history.location.pathname).toBe('/drinks');

    userEvent.click(screen.getByTestId('food-bottom-btn'));
    expect(history.location.pathname).toBe('/foods');
  });
});