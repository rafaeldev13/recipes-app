import React from 'react';
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import RecipesProvider from '../context/RecipesProvider';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente SearchBar', () => {
  it('Deve mostrar as receitas de acordo com a busca na página de comidas', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/foods');

    // Busca por ingrediente
    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.type(screen.getByTestId('search-input'), 'beef');
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByRole('button', { name: /buscar/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Beef and Mustard Pie/i)).toBeInTheDocument();
      expect(screen.getByText(/Beef and Oyster pie/i)).toBeInTheDocument();
      expect(screen.getByText(/Beef Rendang/i)).toBeInTheDocument();
    });

    // Busca por nome
    userEvent.clear(screen.getByTestId('search-input'));
    userEvent.type(screen.getByTestId('search-input'), 'lasagne');
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.click(screen.getByRole('button', { name: /buscar/i }));

    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/52844');
    });

    // Busca por primeira letra
    history.push('/foods');
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.type(screen.getByTestId('search-input'), 'e');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByRole('button', { name: /buscar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Eton Mess/i)).toBeInTheDocument();
      expect(screen.getByText(/Eccles Cakes/i)).toBeInTheDocument();
      expect(screen.getByText(/English Breakfast/i)).toBeInTheDocument();
    });
  });

  it('Deve mostrar as receitas de acordo com a busca na página de bebidas', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/drinks');

    // Busca por ingrediente
    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.type(screen.getByTestId('search-input'), 'wine');
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByRole('button', { name: /buscar/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Archbishop/i)).toBeInTheDocument();
      expect(screen.getByText(/Berry Deadly/i)).toBeInTheDocument();
      expect(screen.getByText(/Clove Cocktail/i)).toBeInTheDocument();
    });

    // Busca por nome
    userEvent.clear(screen.getByTestId('search-input'));
    userEvent.type(screen.getByTestId('search-input'), 'Whisky Mac');
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.click(screen.getByRole('button', { name: /buscar/i }));

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/12518');
    });

    // Busca por primeira letra
    history.push('/drinks');
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.type(screen.getByTestId('search-input'), 'a');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByRole('button', { name: /buscar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Avalon/i)).toBeInTheDocument();
      expect(screen.getByText(/Abilene/i)).toBeInTheDocument();
      expect(screen.getByText(/Acid/i)).toBeInTheDocument();
    });
  });

  it('Deve exibir mensagem de não encontrado para comidas não existentes', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/foods');
    
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const NOT_FOUND = 'Sorry, we haven\'t found any recipes for these filters.';

    // Busca por ingrediente
    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.type(screen.getByTestId('search-input'), 'NotFound');
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByRole('button', { name: /buscar/i }));
    
    await waitFor(() => {
      expect(global.alert).toBeCalledWith(NOT_FOUND);
    })

    // Busca por nome
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.click(screen.getByRole('button', { name: /buscar/i }));

    await waitFor(() => {
      expect(global.alert).toBeCalledWith(NOT_FOUND);
    })

    // Busca por primeira letra
    userEvent.type(screen.getByTestId('search-input'), 'z');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByRole('button', { name: /buscar/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenNthCalledWith(3, NOT_FOUND);
    })
  });

  it('Deve exibir mensagem de não encontrado para bebidas não existentes', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/drinks');
    
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const NOT_FOUND = 'Sorry, we haven\'t found any recipes for these filters.';

    // Busca por ingrediente
    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.type(screen.getByTestId('search-input'), 'NotFound');
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByRole('button', { name: /buscar/i }));
    
    await waitFor(() => {
      expect(global.alert).toBeCalledWith(NOT_FOUND);
    })

    // Busca por nome
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.click(screen.getByRole('button', { name: /buscar/i }));

    await waitFor(() => {
      expect(global.alert).toBeCalledWith(NOT_FOUND);
    })

    // Busca por primeira letra
    userEvent.type(screen.getByTestId('search-input'), 'x');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByRole('button', { name: /buscar/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenNthCalledWith(3, NOT_FOUND);
    })
  });
});