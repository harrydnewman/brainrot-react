// RedirectTo.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectTo = ({ target }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the target page
    navigate(target);
  }, [navigate, target]);

  return null; // Render nothing since we are redirecting
};

export default RedirectTo;
