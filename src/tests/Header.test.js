import React from 'react';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import RecipesProvider from '../context/RecipesProvider';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o componente Header', () => {
  it('Deve redirecionar para a página Profile', () => {
    const { history } = renderWithRouter(<Header />);
    userEvent.click(screen.getByTestId('profile-top-btn'));
    expect(history.location.pathname).toBe('/profile');
  });

  it('Deve mostrar e esconder a barra de busca', () => {
   render(<RecipesProvider><Header /></RecipesProvider>);
    userEvent.click(screen.getByTestId('search-top-btn'));
    expect(screen.getByText('Opções de busca')).toBeInTheDocument();
  });
});