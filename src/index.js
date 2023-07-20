import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="910842626574-u0rfn64efe1pbpttba4b7c3kf463shii.apps.googleusercontent.com">
  {/* 910842626574-u0rfn64efe1pbpttba4b7c3kf463shii.apps.googleusercontent.com */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
