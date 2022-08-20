import React from 'react';
import { getFromStorage } from '../helpers/handleLocalStorage';

function Profile() {
  const getEmail = () => {
    const email = getFromStorage('user');
    return Object.values(JSON.parse(email));
  };

  return (
    <div className="profile-container">
      <p data-testid="profile-email" className="profile-email">{getEmail()}</p>
      <button
        data-testid="profile-done-btn"
        className="profile-done-btn"
        type="submit"
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        className="profile-favorite-btn"
        type="submit"
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        className="profile-logout-btn"
        type="submit"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
