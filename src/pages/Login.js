import React, { useState } from 'react';
import { validate } from 'email-validator';
import { Redirect } from 'react-router-dom';
import { saveOnStorage } from '../helpers/handleLocalStorage';

function Login() {
  const MIN_PASSWORD_LENGTH = 7;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldRedirect, setRedirect] = useState(false);

  const handleClick = () => {
    saveOnStorage('user', JSON.stringify({ email }));
    saveOnStorage('mealsToken', 1);
    saveOnStorage('cocktailsToken', 1);
    setRedirect(true);
  };

  return (
    <div className="login-container">
      <input
        data-testid="email-input"
        type="email"
        name="email"
        value={ email }
        placeholder="Digite seu email"
        onChange={ (event) => setEmail(event.target.value) }
      />
      <input
        data-testid="password-input"
        type="password"
        name="password"
        value={ password }
        placeholder="Digite sua senha"
        onChange={ (event) => setPassword(event.target.value) }
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ !(validate(email) && password.length >= MIN_PASSWORD_LENGTH) }
        onClick={ handleClick }
      >
        Entrar
      </button>
      { shouldRedirect && <Redirect to="/foods" />}
    </div>
  );
}

export default Login;
