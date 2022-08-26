import React from 'react';
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import RecipesProvider from '../context/RecipesProvider';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Testa a página de detalhes das receitas', () => {
  it('Deve realizar um fetch da com o endpoint correto para uma bebida', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/drinks/15997');

    await waitFor(() => {
      expect(screen.getByTestId('recipe-title')).toHaveTextContent('GG');
      expect(screen.getByRole('img', { name: /drinks/i })).toBeInTheDocument();
      expect(screen.getByTestId('recipe-category')).toHaveTextContent('Optional alcohol');
      expect(screen.getByTestId('0-ingredient-name-and-measure')).toHaveTextContent('- Galliano - 2 1/2 shots');
      expect(screen.getByTestId('1-ingredient-name-and-measure')).toHaveTextContent('- Ginger ale -');
      expect(screen.getByTestId('2-ingredient-name-and-measure')).toHaveTextContent('- Ice -');
    })
  })

  it('Deve realizar um fetch da com o endpoint correto para uma comida', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/foods/52977');

    await waitFor(() => {
      expect(screen.getByTestId('recipe-title')).toHaveTextContent('Corba');
      expect(screen.getByRole('img', { name: /meals/i })).toBeInTheDocument();
      expect(screen.getByTestId('recipe-category')).toHaveTextContent('Side');
      expect(screen.getByTestId('0-ingredient-name-and-measure')).toHaveTextContent('- Lentils - 1 cup');
      expect(screen.getByTestId('1-ingredient-name-and-measure')).toHaveTextContent('- Onion - 1 large');
      expect(screen.getByTestId('2-ingredient-name-and-measure')).toHaveTextContent('- Carrots - 1 large');
      expect(screen.getByTestId('3-ingredient-name-and-measure')).toHaveTextContent('- Tomato Puree - 1 tbs');
      expect(screen.getByTestId('4-ingredient-name-and-measure')).toHaveTextContent('- Cumin - 2 tsp');
      expect(screen.getByTestId('5-ingredient-name-and-measure')).toHaveTextContent('- Paprika - 1 tsp');
      expect(screen.getByTestId('6-ingredient-name-and-measure')).toHaveTextContent('- Mint - 1/2 tsp');
      expect(screen.getByTestId('7-ingredient-name-and-measure')).toHaveTextContent('- Thyme - 1/2 tsp');
      expect(screen.getByTestId('8-ingredient-name-and-measure')).toHaveTextContent('- Black Pepper - 1/4 tsp');
      expect(screen.getByTestId('9-ingredient-name-and-measure')).toHaveTextContent('- Red Pepper Flakes - 1/4 tsp');
      expect(screen.getByTestId('10-ingredient-name-and-measure')).toHaveTextContent('- Vegetable Stock - 4 cups');
      expect(screen.getByTestId('11-ingredient-name-and-measure')).toHaveTextContent('- Water - 1 cup');
      expect(screen.getByTestId('12-ingredient-name-and-measure')).toHaveTextContent('- Sea Salt - Pinch');
    })
  })

  it('Deve salvar receita de comida favoritada e aparecer na página de receitas favoritas', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/foods/52977');

    await waitFor(() => {
      expect(screen.getByTestId('recipe-title')).toHaveTextContent('Corba');   
    })

    await waitFor(() => {
      userEvent.click(screen.getByTestId('favorite-btn'));      
    })
    history.push('/favorite-recipes')
    await waitFor(() => {
      expect(screen.getByText(/Corba/i)).toBeInTheDocument();
    })
  })

  it('Deve salvar receita de bebida favoritada e aparecer na página de receitas favoritas', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/drinks/15997');

    await waitFor(() => {
      expect(screen.getByTestId('recipe-title')).toHaveTextContent('GG');   
    })

    await waitFor(() => {
      userEvent.click(screen.getByTestId('favorite-btn'));      
    })

    history.push('/favorite-recipes')
    await waitFor(() => {
      expect(screen.getByText(/GG/i)).toBeInTheDocument();
    })
  })

  it('Deve copiar o link ao clicar em compartilhar', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );

    jest.spyOn(navigator.clipboard, "writeText");
    
    history.push('/foods/52977');
    await waitFor(() => {
      expect(screen.getByText(/corba/i)).toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId('share-btn'));
    expect(navigator.clipboard.writeText).toHaveBeenCalled();

    history.push('/drinks/178319');
    await waitFor(() => {
      expect(screen.getByText(/aquamarine/i)).toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId('share-btn'));
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  })

  it('Deve conter o botão start recipe redirecionando para in progress', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/foods/52977');

    await waitFor(() => {
      expect(screen.getByText(/start recipe/i)).toBeInTheDocument();
      userEvent.click(screen.getByTestId('start-recipe-btn'));      
    })
    await waitFor(() => {      
      expect(history.location.pathname).toBe('/foods/52977/in-progress');
    })

    history.push('/drinks/178319');

    await waitFor(() => {
      expect(screen.getByText(/start recipe/i)).toBeInTheDocument();
      userEvent.click(screen.getByTestId('start-recipe-btn'));      
    })
    await waitFor(() => {      
      expect(history.location.pathname).toBe('/drinks/178319/in-progress');
    })
  })

  it('Deve ter o botão Continue Recipe que redireciona para a página in progress', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
    );
    history.push('/foods/53060');

    await waitFor(() => {
      expect(screen.getByText(/start recipe/i)).toBeInTheDocument();
      userEvent.click(screen.getByText(/start recipe/i));      
    })
    await waitFor(() => {      
      expect(history.location.pathname).toBe('/foods/53060/in-progress');
      history.push('/foods/53060');
    })
    await waitFor(() => {      
      expect(history.location.pathname).toBe('/foods/53060');
      expect(screen.getByText(/continue recipe/i)).toBeInTheDocument();
      userEvent.click(screen.getByText(/continue recipe/i));   
    })
    await waitFor(() => {      
      expect(history.location.pathname).toBe('/foods/53060/in-progress');
    })
  })
})
