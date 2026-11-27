import { Link } from 'react-router-dom';
import useDocumentMeta from '../lib/useDocumentMeta';
import { site } from '../data/site';

export default function NotFound() {
  useDocumentMeta(`Page not found | ${site.name}`, site.description);
  return (
    <main className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="text-6xl font-semibold tracking-tight">404</p>
      <p className="mt-4 text-lg font-medium">This page isn’t on the shelf.</p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">The tool may have moved, or the link has a typo.</p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        Browse all tools
      </Link>
    </main>
  );
}
