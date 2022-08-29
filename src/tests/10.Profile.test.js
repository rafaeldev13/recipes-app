import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Profile from '../pages/Profile';
import RecipesProvider from '../context/RecipesProvider';

describe('Testa a página Profile', () => {

    beforeEach(() => localStorage.setItem("user", "{\"email\":\"teste@teste.com\"}"));

    it('Verifica se o email salvo no localStorage é renderizado ', () => {
        render(
            <RecipesProvider>
                <Profile />
            </RecipesProvider>
            );
        expect(screen.getByTestId("profile-email").textContent).toBe("teste@teste.com");
    })

    it('Verifica se todos os botões são renderizados', () => {
        render(
            <RecipesProvider>
                <Profile />
            </RecipesProvider>
            );
        expect(screen.getByRole('button', { name: "Done Recipes" })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: "Favorite Recipes" })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: "Logout" })).toBeInTheDocument();
    })

    it('Verifica se ao clicar em "Done Recipes" redireciona para "/done-recipes"', () => {
        const { history } = renderWithRouter(
            <RecipesProvider>
                <Profile />
            </RecipesProvider>
            );
        const button = screen.getByRole('button', { name: "Done Recipes" });

        userEvent.click(button);
        expect(history.location.pathname).toBe("/done-recipes");
    })

    it('Verifica se ao clicar em "Favorite Recipes" redireciona para "/favorite-recipes"', () => {
        const { history } = renderWithRouter(
            <RecipesProvider>
                <Profile />
            </RecipesProvider>
            );
        const button = screen.getByRole('button', { name: "Favorite Recipes" });

        userEvent.click(button);
        expect(history.location.pathname).toBe("/favorite-recipes");
    })

    it('Verifica se ao clicar em "Logout" apaga o localStorage e redireciona para login("/")', () => {
        const { history } = renderWithRouter(
        <RecipesProvider>
            <Profile />
        </RecipesProvider>
        );

        const button = screen.getByRole('button', { name: "Logout" });
        userEvent.click(button);

        expect(localStorage).toHaveLength(0);
        expect(history.location.pathname).toBe("/");
    })

})
