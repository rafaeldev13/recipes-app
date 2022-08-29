import React from 'react';
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';
import RecipesProvider from '../context/RecipesProvider';

const localStorageMock = [{
    id: '52771',
    type: 'food',
    nationality: 'French',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Brie wrapped in prosciutto & brioche',
    image: 'https://www.themealdb.com/images/media/meals/qqpwsy1511796276.jpg',
    doneDate: '20/08/2022',
    tags: ['SideDish', 'Treat', 'Baking'],
},
{
    id: '3200',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Alcoholic',
    name: 'Owen\'s Grandmother\'s Revenge',
    image: 'https://www.thecocktaildb.com/images/media/drink/0wt4uo1503565321.jpg',
    doneDate: '20/08/2022',
    tags: [],
}];
beforeEach(() => localStorage.setItem('doneRecipes', JSON.stringify(localStorageMock)));

Object.assign(navigator, {
    clipboard: {
        writeText: () => { },
    },
});

describe('Testa a página Done Recipes', () => {


    it('Verifica se os botões de filtro são renderizados', () => {
        renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>)
        const filterAll = screen.getByTestId('filter-by-all-btn');
        const filterFood = screen.getByTestId('filter-by-food-btn');
        const filterDrink = screen.getByTestId('filter-by-drink-btn');
        expect(screen.getByRole('button', { name: /all/i })).toBe(filterAll);
        expect(screen.getByRole('button', { name: /food/i })).toBe(filterFood);
        expect(screen.getByRole('button', { name: /drinks/i })).toBe(filterDrink);
    })

    it('Verifica se os filtros tem o comportamento esperado', () => {
        renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>)
        userEvent.click(screen.getByRole('button', { name: /food/i }));
        expect(screen.getByRole('link', { name: /brie/i })).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /owen's/i })).not.toBeInTheDocument();


        userEvent.click(screen.getByRole('button', { name: /drinks/i }));
        expect(screen.getByRole('link', { name: /owen's/i })).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /brie/i })).not.toBeInTheDocument();


        userEvent.click(screen.getByRole('button', { name: /all/i }));
        expect(screen.getByRole('link', { name: /brie/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /owen's/i })).toBeInTheDocument();
    });

    it('Verifica se redireciona para a página de detalhes da receita ao clicar no link', async () => {
        const { history } = renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);

        userEvent.click(screen.getByTestId('0-horizontal-name'));
        expect(history.location.pathname).toBe('/foods/52771');

        userEvent.click(screen.getByTestId('1-horizontal-name'));
        expect(history.location.pathname).toBe('/drinks/3200');
    });

    it('Verifica se o card de comida renderiza "nacionalidade - categoria" e de bebida se é alcoólico', async () => {
        renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);

        const food = 'French - Side'
        const drink = 'Alcoholic'

        expect(screen.getByTestId('0-horizontal-top-text').textContent).toBe(food);
        expect(screen.getByTestId('1-horizontal-top-text').textContent).toBe(drink);
    });

    it('Verifica se renderiza as tags corretamente', async () => {
        renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);

        const food = ['SideDish', 'Treat', 'Baking'];
        const drink = [];

        food.forEach((tag) => expect(screen.getByTestId(`0-${tag}-horizontal-tag`)).toBeInTheDocument());
    });

    it('Verifica se o botão compartilhar copia a URL correta e renderiza "Link copied!"', async () => {
        const { history } = renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);

        jest.spyOn(navigator.clipboard, "writeText");

        userEvent.click(screen.getAllByRole('button', { name: /share icon/i })[0]);
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith("http://localhost:3000/foods/52771");
        expect(screen.getByTestId('0-copy-text').textContent).toMatch(/Link Copied!/i);

        userEvent.click(screen.getAllByRole('button', { name: /share icon/i })[1]);
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith("http://localhost:3000/drinks/3200");
        expect(screen.getByTestId('1-copy-text').textContent).toMatch(/Link Copied!/i);
    });
})