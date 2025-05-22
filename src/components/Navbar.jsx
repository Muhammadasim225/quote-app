import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import { useApolloClient } from '@apollo/client';

const Navbar = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Initialize sidenav for Materialize
    M.Sidenav.init(document.querySelectorAll('.sidenav'), {
      edge: 'left',
      draggable: true,
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    client.clearStore();
    navigate('/login');
  };

  return (
    <>
      <nav className="nav-wrapper deep-purple darken-4 z-depth-3">
        <div className="container">
          <Link to="/" className="brand-logo" style={{ fontWeight: 600 }}>
            QuoteApp
          </Link>
          <a href="#!" data-target="mobile-nav" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {token ? (
              <>
                <li>
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/create-quote">
                    Create
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-small pink lighten-1 waves-effect waves-light logout-btn"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link className="nav-link" to="/login">Login</Link></li>
                <li><Link className="nav-link" to="/signup">Signup</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Mobile Nav */}
      <ul className="sidenav deep-purple darken-3" id="mobile-nav">
        {token ? (
          <>
            <li><Link className="white-text" to="/profile">Profile</Link></li>
            <li><Link className="white-text" to="/create-quote">Create</Link></li>
            <li>
              <button
                onClick={handleLogout}
                className="btn pink lighten-2 waves-effect waves-light"
                style={{ width: '90%', margin: '10px auto' }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link className="white-text" to="/login">Login</Link></li>
            <li><Link className="white-text" to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </>
  );
};

export default Navbar;
