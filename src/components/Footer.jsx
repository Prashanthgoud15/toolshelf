import { site } from '../data/site';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 py-6 dark:border-gray-800">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-1.5 px-4 text-sm text-gray-500 sm:flex-row sm:px-6 dark:text-gray-400">
        <p>No ads, no sign-ups. Most tools run in your browser.</p>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded transition hover:text-black dark:hover:text-white"
        >
          Built by <span className="font-medium">{site.author}</span>
        </a>
      </div>
    </footer>
  );
}
