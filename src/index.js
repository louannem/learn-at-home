import React from 'react';
import ReactDOM from 'react-dom/client';
import "./utils/styles/index.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { SignupPage } from './pages/Signup';
import { UserAuthContextProvider } from './utils/context/AuthContext';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import { NavigationBar } from './components/NavigationBar';
import { UpdateProfile } from './pages/UpdateProfile';
import { ForgotPasswordPage } from './pages/ForgetPasswordPage';
import { ChatPage } from './pages/ChatPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserAuthContextProvider>
      <NavigationBar />
      <Routes>

        <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
        } ></Route>

        <Route path="/update-profile" element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        } ></Route>

        <Route path="/chat" element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        } ></Route>


        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
      </Routes>
    </UserAuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

