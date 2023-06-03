import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container text-center">
      <div className="error-page">
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Page Not Found</h2>
        <p className="error-description">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
