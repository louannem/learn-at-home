import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { SignupPage } from './pages/Signup';
import { UserAuthContextProvider } from './utils/context/AuthContext';
import { Home } from './pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
    </UserAuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

