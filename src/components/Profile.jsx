import { useQuery, NetworkStatus } from '@apollo/client';
import React, { useEffect } from 'react';
import { getMyProfile } from '../gqloperations/queries';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

const Profile = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const token = localStorage.getItem('token');

  const { 
    loading, 
    error, 
    data, 
    refetch, 
    networkStatus,
    startPolling,
    stopPolling
  } = useQuery(getMyProfile, {
    fetchPolicy: 'network-only', // Always fetch from network first
    nextFetchPolicy: 'cache-first', // Then use cache for subsequent requests
    notifyOnNetworkStatusChange: true, // Track loading states
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    },
    onError: (error) => {
      console.error('Profile fetch error:', error);
      if (error.graphQLErrors?.some(e => e.extensions?.code === 'UNAUTHENTICATED')) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    // Start polling every 5 seconds (optional)
    startPolling(5000);

    return () => {
      stopPolling();
    };
  }, [navigate, token, startPolling, stopPolling]);

  const handleRefresh = async () => {
    try {
      await client.resetStore(); // Clear entire cache
      await refetch(); // Force fresh fetch
    } catch (err) {
      console.error('Refresh failed:', err);
    }
  };

  // Special loading state for refetch
  if (networkStatus === NetworkStatus.refetch) {
    return (
      <div className="center-align" style={{ marginTop: '12%' }}>
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-blue-grey-only">
            <div className="circle-clipper left"><div className="circle"></div></div>
            <div className="gap-patch"><div className="circle"></div></div>
            <div className="circle-clipper right"><div className="circle"></div></div>
          </div>
        </div>
        <h5 className="grey-text text-darken-1">Refreshing profile...</h5>
      </div>
    );
  }

  // Initial loading state
  if (loading && !data) {
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

  // Error state
  if (error) {
    return (
      <div className="container center-align" style={{ marginTop: '12%' }}>
        <i className="material-icons large red-text">error_outline</i>
        <h5 className="grey-text text-darken-3">Failed to load profile</h5>
        <p className="red-text text-lighten-2">{error.message}</p>
        
        <div style={{ marginTop: '30px' }}>
          <button
            className="btn waves-effect waves-light deep-purple darken-2"
            onClick={handleRefresh}
            style={{ marginRight: '10px' }}
          >
            <i className="material-icons left">refresh</i> Try Again
          </button>
          
          <button
            className="btn waves-effect waves-light pink darken-1"
            onClick={() => {
              localStorage.removeItem('token');
              client.resetStore();
              navigate('/login');
            }}
          >
            <i className="material-icons left">exit_to_app</i> Re-login
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!data?.ppf) {
    return (
      <div className="container center-align" style={{ marginTop: '12%' }}>
        <i className="material-icons large grey-text">account_circle</i>
        <h5 className="grey-text text-darken-2">No profile data found</h5>
        <button
          className="btn waves-effect waves-light deep-purple darken-2"
          onClick={handleRefresh}
        >
          <i className="material-icons left">refresh</i> Refresh Data
        </button>
      </div>
    );
  }

  // Success state - render profile
  const { firstname, lastname, email, quotes } = data.ppf;

  return (
    <div className="container profile-container" style={{ maxWidth: '800px', marginTop: '2%' }}>
      <div className="card z-depth-2 profile-card hoverable">
        <div className="card-content center-align">
          <img
            className="circle responsive-img profile-img"
            src={`https://robohash.org/${firstname}?size=150x150&set=set4`}
            alt="Profile"
            style={{ width: '150px', height: '150px', marginTop: '20px' }}
          />
          <h4 className="blue-grey-text text-darken-3" style={{ marginTop: '20px' }}>
            {firstname} {lastname}
          </h4>
          <h6 className="pink-text text-darken-2">
            <i className="material-icons tiny">email</i> {email}
          </h6>
          
          <button
            className="btn-floating btn-small waves-effect waves-light deep-purple darken-2"
            onClick={handleRefresh}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
            title="Refresh profile"
          >
            <i className="material-icons">refresh</i>
          </button>
        </div>
      </div>

      <div className="quotes-section" style={{ marginTop: '40px' }}>
        <h5 className="blue-grey-text text-darken-3">
          <i className="material-icons left">format_quote</i> Your Quotes
        </h5>
        <div className="divider" style={{ margin: '15px 0 30px 0' }}></div>

        {quotes.length > 0 ? (
          <div className="row">
            {quotes.map((quote, index) => (
              <div key={index} className="col s12 m6 l4">
                <div className="card z-depth-1 hoverable">
                  <div className="card-content">
                    <blockquote className="blue-grey-text text-darken-2">
                      "{quote.name}"
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-panel grey lighten-4">
            <p className="grey-text text-darken-2 center-align">
              <i className="material-icons large">sentiment_dissatisfied</i>
              <br />
              You haven't created any quotes yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
