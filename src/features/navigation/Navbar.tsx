import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <header style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
      <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/tvshows">TV Shows</Link>
        <Link to="/search">Search</Link>
        {user && <Link to="/profile">Profile</Link>}
        {user && <Link to="/favourites">Favourites</Link>}
        <div style={{ marginLeft: 'auto' }}>
          {user ? (
            <button type="button" onClick={handleSignOut}>
              Cerrar sesión
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}