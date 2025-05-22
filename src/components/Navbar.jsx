import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import { useApolloClient } from '@apollo/client';

const Navbar = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Initialize Materialize sidenav
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, { edge: 'left', draggable: true });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    client.clearStore();
    navigate('/login');
  };

  return (
    <>
      <nav className="nav-wrapper deep-purple darken-4 z-depth-2">
        <div className="container">
          <Link to="/" className="brand-logo" style={{ fontWeight: 600 }}>
            QuoteApp
          </Link>
          <a href="#!" data-target="mobile-nav" className="sidenav-trigger right">
            <i className="material-icons">menu</i>
          </a>

          <ul className="right hide-on-med-and-down">
            {token ? (
              <>
                <li><Link to="/profile" className="nav-link">Profile</Link></li>
                <li><Link to="/create-quote" className="nav-link">Create</Link></li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn pink lighten-2 waves-effect waves-light"
                    style={{ marginTop: "8px" }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="nav-link">Login</Link></li>
                <li><Link to="/signup" className="nav-link">Signup</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <ul className="sidenav deep-purple darken-4" id="mobile-nav">
        {token ? (
          <>
            <li><Link className="white-text" to="/profile">Profile</Link></li>
            <li><Link className="white-text" to="/create-quote">Create</Link></li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <button
                onClick={handleLogout}
                className="btn pink lighten-2 waves-effect waves-light"
                style={{ margin: 0 }}
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
