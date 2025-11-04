import { useAuth } from '../auth/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const name = user?.user_metadata?.name ?? user?.email ?? 'Usuario';

  return <div style={{ padding: 16 }}>Bienvenido {name}, este es tu perfil.</div>;
}