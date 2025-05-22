import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { create_signup } from "../gqloperations/mutations";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [signupUser, { loading, error, data }] = useMutation(create_signup);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser({
      variables: {
        userNnew: formData,
      },
    });
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '8%' }}>
      <div className="card z-depth-3 hoverable animated fadeIn">
        <div className="card-content">
          <h4 className="center-align deep-purple-text text-darken-3">📝 Sign Up</h4>
          <div className="divider" style={{ margin: "20px 0" }}></div>

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

          {data && data.user && (
            <div className="card-panel green lighten-2 white-text center-align">
              {data.user.firstname} is signed up! You can now{" "}
              <Link to="/login" className="white-text text-bold">login</Link>.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="text"
                name="firstname"
                id="firstname"
                required
                onChange={handleChange}
              />
              <label htmlFor="firstname">First Name</label>
            </div>

            <div className="input-field">
              <input
                type="text"
                name="lastname"
                id="lastname"
                required
                onChange={handleChange}
              />
              <label htmlFor="lastname">Last Name</label>
            </div>

            <div className="input-field">
              <input
                type="email"
                name="email"
                id="email"
                required
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-field">
              <input
                type="password"
                name="password"
                id="password"
                required
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="right-align" style={{ marginBottom: "20px" }}>
              <Link to="/login" className="pink-text text-lighten-1">
                Already have an account?
              </Link>
            </div>

            <button
              className="btn waves-effect waves-light deep-purple darken-2 z-depth-1"
              type="submit"
              style={{ width: "100%" }}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
