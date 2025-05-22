import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import { useApolloClient } from '@apollo/client';
const Navbar = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Initialize sidenav for mobile responsiveness
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    client.clearStore(); // This clears the cache
    navigate('/login');
  };

  return (
    <>
      <nav className="blue-grey darken-3">
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo">QuoteApp</Link>
          <a href="#!" data-target="mobile-nav" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {token ? (
              <>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/create-quote">Create</Link></li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn red lighten-1 waves-effect waves-light"
                    style={{ marginTop: '8px' }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <ul className="sidenav" id="mobile-nav">
        {token ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/create-quote">Create</Link></li>
            <li>
              <button
                onClick={handleLogout}
                className="btn red lighten-1 waves-effect waves-light"
                style={{ width: '100%', marginTop: '7px' }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </>
  );
};

export default Navbar;
