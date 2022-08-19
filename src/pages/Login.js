import React from 'react';

function Login() {
  return (
    <div>
      <input
        data-testid="email-input"
        type="email"
        placeholder="Digite seu email"
      />
      <input
        data-testid="password-input"
        type="password"
        placeholder="Digite sua senha"
      />
      <button
        data-testid="login-submit-btn"
        type="button"
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
