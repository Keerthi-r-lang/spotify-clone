import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      console.log('Submitting:', form);

      const res = await api.post('/auth/login/', form);

      console.log('LOGIN SUCCESS:', res.data);

      login(res.data, {
        username: form.username,
      });

      console.log('USER IN LOCALSTORAGE:', localStorage.getItem('user'));

      console.log('Navigating...');

      navigate('/');
    } catch (err) {
      console.log('LOGIN ERROR:', err.response);
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: 360,
      margin: '80px auto',
      padding: 24,
    }}>
      <h2>Login</h2>

      {error && (
        <p style={{ color: 'red' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value,
            })
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <br />

      <p>
        No account?{' '}
        <Link to="/register">
          Register
        </Link>
      </p>
    </div>
  );
}