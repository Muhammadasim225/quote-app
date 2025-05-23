import { useApolloClient, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { get_login } from '../gqloperations/mutations';
import { getMyProfile } from '../gqloperations/queries';

const Login = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
const [signInUser, { error, loading }] = useMutation(get_login, {
    onCompleted: async (data) => {
      const token = data?.loginUser?.token;

      if (token) {
        localStorage.setItem('token', token);      // ✅ 1. Set token first
        await client.clearStore();                 // ✅ 2. Clear old cache
        await client.refetchQueries({              // ✅ 3. Optionally refetch active queries
          include: [getMyProfile],
        });
        navigate('/profile');                      // ✅ 4. Navigate to profile
      }
    }
  });



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signInUser({
      variables: { userSignIn: formData }
    });
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '8%' }}>
      <div className="card z-depth-3 hoverable animated fadeIn">
        <div className="card-content">
          <h4 className="center-align deep-purple-text text-darken-3">🔐 Login</h4>
          <div className="divider" style={{ margin: '20px 0' }}></div>

          {error && (
            <div className="card-panel red lighten-2 white-text center-align">
              {error.message}
            </div>
          )}

          {loading && (
            <div className="progress pink lighten-3">
              <div className="indeterminate pink darken-1"></div>
            </div>
          )}

          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="input-field">
              <input
                type="email"
                name="email"
                id="email"
                className="validate"
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
                className="validate"
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="right-align" style={{ marginBottom: '20px' }}>
              <Link to="/signup" className="pink-text text-lighten-1">
                Don’t have an account?
              </Link>
            </div>

            <button
              className="btn waves-effect waves-light deep-purple darken-2 z-depth-1"
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
