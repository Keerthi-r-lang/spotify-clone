import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Player from './components/Player';

import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [currentSong, setCurrentSong] = useState(null);

  const handlePlay = (song) => {
    console.log('Playing:', song.title);
    setCurrentSong(song);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <>
          <Routes>

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home
                    currentSong={currentSong}
                    onPlay={handlePlay}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

          </Routes>

          <Player song={currentSong} />
        </>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;