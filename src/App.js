import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Screens
import LoginScreen from './screens/LoginScreen';
import AdminHomeScreen from './screens/admin/AdminHomeScreen';
import DoorStatusScreen from './screens/admin/DoorStatusScreen';
import ManageCardsScreen from './screens/admin/ManageCardsScreen';
import ManageUsersScreen from './screens/admin/ManageUsersScreen';
import ManageDoorsScreen from './screens/admin/ManageDoorsScreen';

import UserHomeScreen from './screens/user/UserHomeScreen';
import CardStatusScreen from './screens/user/CardStatusScreen';
import AccessHistoryScreen from './screens/user/AccessHistoryScreen';

// Protected route
import ProtectedRoute from './navigation/ProtectedRoute';

// Componente wrapper para LoginScreen que tiene acceso a useNavigate
function LoginWrapper({ setRole }) {
  const navigate = useNavigate();
  
  return <LoginScreen setRole={setRole} navigate={navigate} />;
}

function App() {
  const [role, setRole] = useState(null); // 'admin' o 'user'

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginWrapper setRole={setRole} />}
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role={role} allowedRole="admin">
              <AdminHomeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/doors"
          element={
            <ProtectedRoute role={role} allowedRole="admin">
              <DoorStatusScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/cards"
          element={
            <ProtectedRoute role={role} allowedRole="admin">
              <ManageCardsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role={role} allowedRole="admin">
              <ManageUsersScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-doors"
          element={
            <ProtectedRoute role={role} allowedRole="admin">
              <ManageDoorsScreen />
            </ProtectedRoute>
          }
        />

        {/* User routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role={role} allowedRole="user">
              <UserHomeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/cards"
          element={
            <ProtectedRoute role={role} allowedRole="user">
              <CardStatusScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/history"
          element={
            <ProtectedRoute role={role} allowedRole="user">
              <AccessHistoryScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;