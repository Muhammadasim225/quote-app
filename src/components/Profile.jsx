import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { getMyProfile } from '../gqloperations/queries';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [shouldFetch, setShouldFetch] = useState(false);

  const { error, loading, data, refetch } = useQuery(getMyProfile, {
    skip: !shouldFetch, // Don't execute immediately
    fetchPolicy: 'network-only', // Always fetch fresh data
    onError: (error) => {
      console.error("Profile fetch error:", error);
      // You could add automatic retry logic here if needed
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      // Wait briefly to ensure Apollo client has the token
      setTimeout(() => {
        setShouldFetch(true);
        refetch();
      }, 100);
    }
  }, [navigate]);

  // Improved error handling
  if (error) {
    return (
      <div className="container center-align" style={{ marginTop: '12%' }}>
        <i className="material-icons large red-text">error</i>
        <h5 className="grey-text text-darken-3">Failed to load profile</h5>
        <button 
          className="btn pink darken-1 waves-effect waves-light"
          onClick={() => refetch()}
          style={{ marginTop: '20px' }}
        >
          Retry
        </button>
      </div>
    );
  }

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
        <h5 className="grey-text text-darken-1" style={{ marginTop: '25px' }}>
          Loading profile...
        </h5>
      </div>
    );
  }

  if (!data?.ppf) {
    return (
      <h5 className="center-align grey-text text-darken-2">
        No profile data found.
      </h5>
    );
  }

  const { firstname, lastname, email, quotes } = data.ppf;

  return (
    <div className="container profile-container">
      {/* Rest of your profile UI remains the same */}
    </div>
  );
};

export default Profile;
