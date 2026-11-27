import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../lib/theme';
import { site } from '../data/site';

export default function Header() {
  const { dark, toggle } = useTheme();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 rounded-md">
          <img src="/favicon.svg" alt="" className="h-7 w-7 rounded-md" />
          <span className="font-semibold tracking-tight">{site.name}</span>
        </Link>

        <button
          onClick={toggle}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 transition hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-900"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
