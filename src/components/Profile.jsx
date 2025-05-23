import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { getMyProfile } from '../gqloperations/queries';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();



  const { error, loading, data } = useQuery(getMyProfile, {
    fetchPolicy: 'cache-and-network',
  });
    useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="center-align" style={{ marginTop: '12%' }}>
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-grey-only">
            <div className="circle-clipper left"><div className="circle"></div></div>
            <div className="gap-patch"><div className="circle"></div></div>
            <div className="circle-clipper right"><div className="circle"></div></div>
          </div>
        </div>
        <h5 className="grey-text text-darken-1" style={{ marginTop: '25px' }}>Loading profile...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container center-align red-text text-darken-2" style={{ marginTop: '12%' }}>
        <i className="material-icons large pulse">error_outline</i>
        <h5 className="grey-text text-darken-3">Failed to load profile.</h5>
      </div>
    );
  }

  if (!data || !data.ppf) {
    return <h5 className="center-align grey-text text-darken-2">No profile data found.</h5>;
  }

  const { firstname, lastname, email, quotes } = data.ppf;

  return (
    <div className="container profile-container">
      <div className="card z-depth-2 profile-card">
        <div className="card-content center-align">
          <img
            className="circle responsive-img profile-img"
            src={`https://robohash.org/${firstname}`}
            alt="Profile"
          />
          <h5 className="blue-grey-text text-darken-3">{firstname} {lastname}</h5>
          <h6 className="pink-text text-darken-2">✉️ {email}</h6>
        </div>
      </div>

      <div className="quotes-section">
        <h5 className="blue-grey-text text-darken-3">📝 Your Quotes</h5>
        <div className="divider" style={{ margin: '15px 0' }}></div>

        {quotes.length > 0 ? (
          quotes.map((quote, index) => (
            <div key={index} className="card z-depth-1 quote-card hoverable">
              <div className="card-content">
                <blockquote className="custom-blockquote">
                  <p className="quote-text">“{quote.name}”</p>
                </blockquote>
              </div>
            </div>
          ))
        ) : (
          <p className="grey-text text-darken-1">You haven't created any quotes yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
