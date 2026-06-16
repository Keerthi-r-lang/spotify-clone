export default function SongCard({ song, onPlay, isPlaying }) {
  const formatDur = (s) => {
    if (!s) return '--:--';

    const m = Math.floor(s / 60);
    const sec = String(s % 60).padStart(2, '0');

    return `${m}:${sec}`;
  };

  return (
    <div
      onClick={() => onPlay(song)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition group ${
        isPlaying
          ? 'bg-brand/10'
          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
      }`}
    >
      <div className='w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden shrink-0 flex items-center justify-center'>
        {song.cover_url ? (
          <img
            src={song.cover_url}
            alt={song.title}
            className='w-full h-full object-cover'
          />
        ) : (
          <span className='text-gray-400 text-lg'>♪</span>
        )}
      </div>

      <div className='flex-1 min-w-0'>
        <p
          className={`text-sm font-medium truncate ${
            isPlaying
              ? 'text-brand'
              : 'text-gray-900 dark:text-white'
          }`}
        >
          {song.title}
        </p>

        <p className='text-xs text-gray-500 truncate'>
          {song.artist}
        </p>
      </div>

      <span className='text-xs text-gray-400 shrink-0'>
        {formatDur(song.duration)}
      </span>
    </div>
  );
}