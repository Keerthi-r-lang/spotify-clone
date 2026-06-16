import { useEffect, useRef, useState } from 'react';

export default function Player({ song }) {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.src = song.audio_url;

      audioRef.current.play()
        .then(() => {
          setPlaying(true);
        })
        .catch((err) => {
          console.log('Playback error:', err);
        });
    }
  }, [song]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const onTimeUpdate = () => {
    if (!audioRef.current) return;

    setProgress(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  const seek = (e) => {
    if (!audioRef.current || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const ratio =
      (e.clientX - rect.left) / rect.width;

    audioRef.current.currentTime =
      ratio * duration;
  };

  const fmt = (seconds) => {
    if (!seconds || isNaN(seconds)) {
      return '0:00';
    }

    const mins = Math.floor(seconds / 60);

    const secs = String(
      Math.floor(seconds % 60)
    ).padStart(2, '0');

    return `${mins}:${secs}`;
  };

  if (!song) return null;

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0
        bg-white dark:bg-gray-900
        border-t border-gray-100 dark:border-gray-800
        px-6 py-3
        flex items-center gap-4
        z-50
      "
    >
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onTimeUpdate}
        onEnded={() => setPlaying(false)}
      />

      {/* Song Info */}
      <div className="flex items-center gap-3 w-52 shrink-0">
        <div
          className="
            w-10 h-10 rounded-lg
            bg-gray-100 dark:bg-gray-700
            overflow-hidden
            flex items-center justify-center
            shrink-0
          "
        >
          {song.cover_url ? (
            <img
              src={song.cover_url}
              alt={song.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">
              ♪
            </span>
          )}
        </div>

        <div className="min-w-0">
          <p
            className="
              text-sm font-medium
              text-gray-900 dark:text-white
              truncate
            "
          >
            {song.title}
          </p>

          <p
            className="
              text-xs text-gray-500
              truncate
            "
          >
            {song.artist}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div
        className="
          flex-1
          flex flex-col items-center
          gap-2
        "
      >
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="
              w-8 h-8 rounded-full
              bg-gray-900 dark:bg-white
              flex items-center justify-center
              text-white dark:text-gray-900
              hover:scale-105
              transition
            "
          >
            {playing ? '⏸' : '▶'}
          </button>
        </div>

        <div
          className="
            flex items-center gap-2
            w-full max-w-md
          "
        >
          <span
            className="
              text-xs text-gray-400
              w-8 text-right
            "
          >
            {fmt(progress)}
          </span>

          <div
            onClick={seek}
            className="
              flex-1 h-1
              bg-gray-200 dark:bg-gray-700
              rounded-full
              cursor-pointer
            "
          >
            <div
              className="
                h-full
                bg-green-500
                rounded-full
                transition-all
              "
              style={{
                width: `${
                  duration
                    ? (progress / duration) * 100
                    : 0
                }%`,
              }}
            />
          </div>

          <span
            className="
              text-xs text-gray-400
              w-8
            "
          >
            {fmt(duration)}
          </span>
        </div>
      </div>

      {/* Volume */}
      <div
        className="
          flex items-center gap-2
          w-32 justify-end
          shrink-0
        "
      >
        <span
          className="
            text-gray-400 text-sm
          "
        >
          🔊
        </span>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => {
            const newVolume =
              Number(e.target.value);

            setVolume(newVolume);

            if (audioRef.current) {
              audioRef.current.volume =
                newVolume;
            }
          }}
          className="
            w-20
            accent-green-500
          "
        />
      </div>
    </div>
  );
}