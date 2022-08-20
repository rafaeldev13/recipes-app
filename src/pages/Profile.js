import React from 'react';
import { getFromStorage } from '../helpers/handleLocalStorage';

function Profile() {
  const getEmail = () => {
    const email = getFromStorage('user');
    return Object.values(JSON.parse(email));
  };

  return (
    <div>
      <p data-testid="profile-email">{ getEmail() }</p>
    </div>
  );
}

export default Profile;
