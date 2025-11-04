import { useAuth } from './AuthContext';

export default function LoginPage() {
  const { signInWithGoogle, isLoading } = useAuth();

  return (
    <div style={{ padding: 16 }}>
      <h1>Login</h1>
      <button onClick={signInWithGoogle} disabled={isLoading}>
        {isLoading ? 'Abriendo Google...' : 'Continuar con Google'}
      </button>
    </div>
  );
}