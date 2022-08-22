import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, hideSearchIcon }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const history = useHistory();

  function toggleSearchBar() {
    setShowSearchBar(!showSearchBar);
  }

  return (
    <div>
      <input
        type="image"
        id="profileIcon"
        src={ profileIcon }
        alt="profile icon"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
      />

      <h1 data-testid="page-title">{title}</h1>

      {!hideSearchIcon && (
        <input
          type="image"
          id="searchIcon"
          src={ searchIcon }
          alt="search icon"
          data-testid="search-top-btn"
          onClick={ toggleSearchBar }
        />)}

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
