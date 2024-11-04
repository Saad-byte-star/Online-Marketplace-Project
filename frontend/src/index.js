import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { AuthProvider } from './components/store/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </AuthProvider>
);

library.add(far);
library.add(fas);
library.add(fab);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
