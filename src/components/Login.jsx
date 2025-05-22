import { useApolloClient, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { get_login } from '../gqloperations/mutations';
import { getMyProfile } from '../gqloperations/queries';

const Login = () => {
  const client=useApolloClient();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [signInUser, { error, loading, data }] = useMutation(get_login,{
        refetchQueries: [
          { query: 
            getMyProfile
          },
        ]
      });

  if (data) {
    localStorage.setItem('token', data.loginUser.token);
    navigate('/');
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    signInUser({
      variables: {
        userSignIn: formData
      }
    });
    await client.resetStore();
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '8%' }}>
      <div className="card z-depth-3">
        <div className="card-content">
          <h4 className="center-align blue-grey-text text-darken-3">🔐 Login</h4>
          <h4 className="center-align blue-grey-text text-darken-3">🔐 Login</h4>
          <div className="divider" style={{ margin: '20px 0' }}></div>

          {error && (
            <div className="card-panel red lighten-2 white-text center-align">
              {error.message}
            </div>
          )}

          {loading && (
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-field">
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="right-align" style={{ marginBottom: '20px' }}>
              <Link to="/signup" className="blue-text text-darken-2">
                Don’t have an account?
              </Link>
            </div>

            <button
              className="btn waves-effect waves-light blue-grey darken-2 z-depth-1"
              type="submit"
              style={{ width: '100%' }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
