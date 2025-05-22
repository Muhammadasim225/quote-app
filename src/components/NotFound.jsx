import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className="container center-align" style={{ marginTop: '10%' }}>
      <iframe src="https://giphy.com/embed/lqFHf5fYMSuKcSOJph"
      width="480" 
      height="271" 
      frameBorder="0" 
      className="giphy-embed" 
      allowFullScreen>
        
      </iframe>

      <h5 className="grey-text text-darken-1">Oops! The page you're looking for doesn't exist.</h5>
      <Link to="/" className="btn red lighten-1 waves-effect waves-light" style={{ marginTop: '20px' }}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
