import { Routes, Route } from 'react-router-dom';
import Navbar from './features/navigation/Navbar';
import HomePage from './features/home/HomePage';
import LoginPage from './features/auth/LoginPage';
import ProfilePage from './features/profile/ProfilePage';
import FavouritesPage from './features/favourites/FavouritesPage';
import NotFoundPage from './features/not-found/NotFoundPage';
import ProtectedRoute from './features/auth/ProtectedRoute';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<div style={{ padding: 16 }}>Movies (luego)</div>} />
        <Route path="/tvshows" element={<div style={{ padding: 16 }}>TV Shows (luego)</div>} />
        <Route path="/search" element={<div style={{ padding: 16 }}>Search (luego)</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favourites"
          element={
            <ProtectedRoute>
              <FavouritesPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}