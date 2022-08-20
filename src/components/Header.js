// import React from 'react';

// function Header() {
//   return (
//     <div>
//       Header
//     </div>
//   );
// }

// export default Header;
import React, { useState } from 'react';
import propTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, hideSearchIcon }) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  function toggleSearchBar() {
    setShowSearchBar(!showSearchBar);
  }

  return (
    <div>
      <a href="/profile">
        <img
          src={ profileIcon }
          alt="Ícone de perfil"
          data-testid="profile-top-btn"
        />
      </a>

      <h1 data-testid="page-title">{title}</h1>

      {!hideSearchIcon && (
        <a href onClick={ toggleSearchBar }>
          <img
            src={ searchIcon }
            alt="Ícone de pesquisa"
            data-testid="search-top-btn"
          />
        </a>)}

      {showSearchBar && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  title: propTypes.string,
  hideSearchIcon: propTypes.bool,
};

Header.defaultProps = {
  title: '',
  hideSearchIcon: false,
};

export default Header;
