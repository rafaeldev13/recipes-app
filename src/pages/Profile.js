import React from 'react';
import { useHistory } from 'react-router-dom';
import { getFromStorage } from '../helpers/handleLocalStorage';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();

  const getEmail = () => {
    const email = getFromStorage('user');
    if (email !== null) {
      return Object.values(JSON.parse(email));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="profile-container">
      <Header title="Profile" hideSearchIcon />
      <p data-testid="profile-email" className="profile-email">{getEmail()}</p>
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
      <Footer />
    </div>
  );
}

export default Profile;
