import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { SignupPage } from './pages/Signup';
import { AuthProvider } from './utils/context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

