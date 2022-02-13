import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserAuthContextProvider } from './contexts/user-auth-context';
import ProtectedRoute from './components/ProtectedRoute';
import UserProtectedRoute from './components/UserProtectedRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
const App = () => {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/login'
            element={
              <UserProtectedRoute>
                <Login />
              </UserProtectedRoute>
            }
          />
          <Route
            path='/signup'
            element={
              <UserProtectedRoute>
                <Signup />
              </UserProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <UserProtectedRoute>
                <ForgotPassword />
              </UserProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
    </>
  );
};

export default App;
