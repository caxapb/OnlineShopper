import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import './Header.css'
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import Logo from '../assets/images/logo.png'
import MobileLogo from '../assets/images/mobile-logo.png'

export function Header({ cart }) {
  const [searchText, setSearchText] = useState('');
  const updateSearchText = (event) => {
    setSearchText(event.target.value);
  }

  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const navigate = useNavigate();
  const startSearch = () => {
    navigate(`/?search=${searchText}`);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      startSearch();
    } else if (event.key === 'Escape') {
      setSearchText('');
    }
  }

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo"
              src={Logo} 
              alt="logo icon"/>
            <img className="mobile-logo" 
              src={MobileLogo} 
              alt="mobile logo icon"/>
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" 
                  value={searchText}
                  onChange={updateSearchText}
                  onKeyDown={handleKeyDown}/>

          <button className="search-button"
            onClick={startSearch}
            >
            <img className="search-icon" src={SearchIcon} alt="search icon"/>
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">

            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={CartIcon} alt="cart icon" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}