import React from 'react';
import ReactDOM from 'react-dom/client';
import "./utils/styles/index.css"
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import { Login } from './pages/Login';
import { SignupPage } from './pages/Signup';
import { UserAuthContextProvider } from './utils/context/AuthContext';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import { NavigationBar } from './components/Navbar/NavigationBar';
import { UpdateProfile } from './pages/UpdateProfile';
import { ForgotPasswordPage } from './pages/ForgetPasswordPage';
import { ChatPage } from './pages/ChatPage';
import { NewRoom } from './pages/NewRoom';
import { Rooms } from './pages/Rooms';
import { NotificationsPage } from './pages/Notifications';
import { ProfilePage } from './pages/ProfilePage';
import { NotFound } from './pages/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
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

        <Route path="/chatroom/:currentRoom" element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        } ></Route>

        <Route path="/new-room" element={
          <ProtectedRoute>
            <NewRoom />
          </ProtectedRoute>
        } ></Route>

        <Route path="/rooms-list" element={
          <ProtectedRoute>
            <Rooms />
          </ProtectedRoute>
            }>
          </Route>

          <Route path="/notifications" element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
            }>
          </Route>

          <Route path="/user/:id" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
            }>
          </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>

        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </UserAuthContextProvider>
    </HashRouter>
  </React.StrictMode>
);

