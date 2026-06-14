import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [current, setCurrent] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log("TOKEN:", localStorage.getItem("access_token"));

    api.get(`/songs/?q=${search}`)
      .then((res) => {
        console.log(res.data);
        setSongs(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [search]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Songs</h2>

      <input
        placeholder="Search songs or artists..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          marginTop: 16,
        }}
      >
        {songs.map((song) => (
          <li
            key={song.id}
            onClick={() => setCurrent(song)}
            style={{
              padding: '8px 0',
              cursor: 'pointer',
              borderBottom: '1px solid #eee',
            }}
          >
            {song.cover_url && (
  <img
    src={song.cover_url}
    alt={song.title}
    width={40}
    style={{
      marginRight: 10,
      verticalAlign: 'middle',
    }}
  />
)}
            

            <strong>{song.title}</strong> — {song.artist}
          </li>
        ))}
      </ul>

      {songs.length === 0 && (
        <p style={{ marginTop: 20 }}>
          No songs found. Upload songs through Django Admin.
        </p>
      )}

      {current && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#111',
            color: '#fff',
            padding: 16,
          }}
        >
          <p>
            {current.title} — {current.artist}
          </p>

          <audio
  controls
  autoPlay
  src={current.audio_url}
  style={{ width: '100%' }}
/>
        </div>
      )}
    </div>
  );
}