import { useState } from 'react';
import api from '../services/api';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  const res = await api.post('/auth/login/', form);

  console.log("LOGIN RESPONSE:", res.data);

  localStorage.setItem('access_token', res.data.access);
  localStorage.setItem('refresh_token', res.data.refresh);

  console.log("Saved token:", localStorage.getItem('access_token'));

  onLogin();
} catch (err) {
  console.log(err.response);
  setError('Invalid username or password');
}
  };

  return (
    <div style={{ maxWidth: 360, margin: '80px auto', padding: 24 }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder='Username' value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })} /><br/><br/>
        <input type='password' placeholder='Password' value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} /><br/><br/>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}