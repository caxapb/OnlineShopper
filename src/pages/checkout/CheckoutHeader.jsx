import { Link } from 'react-router-dom';
import './CheckoutHeader.css'
import CheckoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png';
import Logo from '../../assets/images/logo-white.png';
import MobileLogo from '../../assets/images/mobile-logo-white.png';

export function CheckoutHeader() {
  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src={Logo} alt="logo icon" />
              <img className="mobile-logo" src={MobileLogo} alt="mobile logo icon" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link"
              to="/">3 items</Link>)
          </div>

          <div className="checkout-header-right-section">
            <img src={CheckoutLockIcon} alt="decorative cart icon"/>
          </div>
        </div>
      </div>
    </>
  );
}