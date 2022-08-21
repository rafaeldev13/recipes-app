import React from 'react';
import { useHistory } from 'react-router-dom';
import { getFromStorage } from '../helpers/handleLocalStorage';

function Profile() {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="profile-container">
      <p data-testid="profile-email" className="profile-email">
        {getFromStorage('user')}
      </p>
      <button
        data-testid="profile-done-btn"
        className="profile-done-btn"
        type="submit"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        className="profile-favorite-btn"
        type="submit"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        className="profile-logout-btn"
        type="submit"
        onClick={ handleLogout }
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
