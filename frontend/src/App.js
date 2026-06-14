import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [authed, setAuthed] = useState(!!localStorage.getItem('access_token'));

  const logout = () => {
    localStorage.clear();
    setAuthed(false);
  };

  return (
    <BrowserRouter>
      {authed && <button onClick={logout} style={{ position:'fixed', top:10, right:10 }}>Logout</button>}
      <Routes>
        <Route path='/login' element={authed ? <Navigate to='/' /> : <Login onLogin={() => setAuthed(true)} />} />
        <Route path='/' element={authed ? <Home /> : <Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;