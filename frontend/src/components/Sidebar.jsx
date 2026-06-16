import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', icon: '⌂', label: 'Home' },
  { to: '/search', icon: '⌕', label: 'Search' },
  { to: '/playlists', icon: '☰', label: 'Playlists' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className='w-52 shrink-0 h-screen sticky top-0 bg-gray-50 dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col p-4'>
      <div className='flex items-center gap-2 mb-8 px-2'>
        <span className='text-brand text-xl'>♪</span>
        <span className='font-medium text-gray-900 dark:text-white'>
          Soundwave
        </span>
      </div>

      <nav className='flex-1 space-y-1'>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                isActive
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800'
              }`
            }
          >
            <span>{l.icon}</span>
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className='border-t border-gray-100 dark:border-gray-800 pt-4 mt-4'>
        <p className='text-xs text-gray-400 px-3 mb-2 truncate'>
          {user?.username}
        </p>

        <button
          onClick={logout}
          className='flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-white dark:hover:bg-gray-800 w-full text-left transition'
        >
          ↩ Logout
        </button>
      </div>
    </aside>
  );
}