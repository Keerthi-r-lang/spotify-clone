import { useEffect, useState } from 'react';
import api from '../services/api';
import SongCard from '../components/SongCard';

export default function Home({ currentSong, onPlay }) {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await api.get(`/songs/?q=${search}`);

        setSongs(res.data);
      } catch (err) {
        console.log(err.response);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className='flex-1 overflow-y-auto p-6'>
      <h1 className='text-2xl font-medium text-gray-900 dark:text-white mb-6'>
        All songs
      </h1>

      <div className='relative mb-6'>
        <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
          ⌕
        </span>

        <input
          className='w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand'
          placeholder='Search songs or artists...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className='text-sm text-gray-400'>
          Loading...
        </p>
      ) : songs.length === 0 ? (
        <p className='text-sm text-gray-400'>
          No songs found.
        </p>
      ) : (
        <div className='space-y-1'>
          {songs.map((s) => (
            <SongCard
  key={s.id}
  song={s}
  onPlay={onPlay}
  isPlaying={currentSong?.id === s.id}
/>
          ))}
        </div>
      )}
    </div>
  );
}