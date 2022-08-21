import React from 'react';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Login from '../pages/Login';

describe('Testa a página Login', () => {


    it('Verifica se renderiza os inputs e o botão de Entrar', () => {
        render(<Login />);
        expect(screen.getByTestId('email-input')).toBeInTheDocument();
        expect(screen.getByTestId('password-input')).toBeInTheDocument();
        expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
    })

    it('Verifica se o botão é desabilitado quando email em formato incorreto e senha menor que 7', () => {
        render(<Login />);
        const email = screen.getByTestId('email-input');
        const password = screen.getByTestId('password-input');
        const button = screen.getByTestId('login-submit-btn');

        userEvent.type(email, 'teste');
        userEvent.type(password, '123456');
        expect(button).toBeDisabled();

        userEvent.type(email, 'teste@teste.com');
        userEvent.type(password, '1234567');
        expect(button).toBeEnabled();
    })

    it('Verifica se os dados são salvos corretamente no localStorage ao logar', () => {
        renderWithRouter(<Login />);
        Storage.prototype.setItem = jest.fn();

        const email = screen.getByTestId('email-input');
        const password = screen.getByTestId('password-input');
        const button = screen.getByTestId('login-submit-btn');

        userEvent.type(email, 'teste@teste.com');
        userEvent.type(password, '1234567');
        userEvent.click(button);

        expect(localStorage.setItem).toHaveBeenCalledTimes(3);
        expect(localStorage.setItem).toBeCalledWith("user", ["teste@teste.com"]);
        expect(localStorage.setItem).toBeCalledWith("mealsToken", 1);
        expect(localStorage.setItem).toBeCalledWith("cocktailsToken", 1);
    })

    it('Verifica se redireciona para a página "/foods" ao logar', () => {
        const { history } = renderWithRouter(<Login />);
        const email = screen.getByTestId('email-input');
        const password = screen.getByTestId('password-input');
        const button = screen.getByTestId('login-submit-btn');

        userEvent.type(email, 'teste@teste.com');
        userEvent.type(password, '1234567');
        userEvent.click(button);
        
        expect(history.location.pathname).toBe("/foods");
    })
});