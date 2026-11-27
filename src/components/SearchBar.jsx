import { Search, X } from 'lucide-react';
import { isMac } from '../lib/utils';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full lg:w-72">
      <label htmlFor="tool-search" className="sr-only">Search tools</label>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
      <input
        id="tool-search"
        type="text"
        autoComplete="off"
        spellCheck="false"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Escape') { onChange(''); e.currentTarget.blur(); } }}
        placeholder="Search tools"
        className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-16 text-sm outline-none transition placeholder:text-gray-400 focus:border-black dark:border-gray-800 dark:bg-black dark:focus:border-white"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : (
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-gray-200 px-1.5 py-0.5 text-[10px] text-gray-400 sm:block dark:border-gray-800">
          {isMac() ? '⌘K' : 'Ctrl K'}
        </kbd>
      )}
    </div>
  );
}
