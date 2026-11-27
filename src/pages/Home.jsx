import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ToolCard from '../components/ToolCard';
import { tools, CATEGORIES } from '../data/tools';
import { site } from '../data/site';
import { cn, matchesQuery } from '../lib/utils';
import useDocumentMeta from '../lib/useDocumentMeta';

export default function Home() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const rawCat = params.get('c') ?? 'All';

  useDocumentMeta(`${site.name} — Free online tools for PDFs, images and files`, site.description);

  const liveTools = tools.filter((t) => t.status === 'live');
  const categories = CATEGORIES.filter((c) => tools.some((t) => t.category === c));
  const category = rawCat === 'All' || categories.includes(rawCat) ? rawCat : 'All';

  const update = (next) => {
    const merged = { q: query, c: category, ...next };
    const clean = {};
    if (merged.q) clean.q = merged.q;
    if (merged.c && merged.c !== 'All') clean.c = merged.c;
    setParams(clean, { replace: true });
  };

  const { live, soon } = useMemo(() => {
    const filtered = tools.filter((t) => (category === 'All' || t.category === category) && matchesQuery(t, query));
    return {
      live: filtered.filter((t) => t.status === 'live'),
      soon: filtered.filter((t) => t.status === 'soon'),
    };
  }, [query, category]);

  const noResults = live.length === 0 && soon.length === 0;

  return (
    <main className="mx-auto max-w-7xl px-4 pb-4 pt-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Free online tools for PDFs, images and files</h1>
      <p className="mt-2 max-w-2xl text-gray-500 dark:text-gray-400">
        No ads or sign-ups. Most tools run in your browser, so your files stay on your device.
      </p>

      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchBar value={query} onChange={(q) => update({ q })} />

        <div role="tablist" aria-label="Filter by category" className="flex flex-wrap items-center gap-1.5">
          {['All', ...categories].map((c) => {
            const active = category === c;
            const count = c === 'All' ? liveTools.length : liveTools.filter((t) => t.category === c).length;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={active}
                onClick={() => update({ c })}
                className={cn(
                  'rounded-lg border px-3 py-1.5 text-sm transition',
                  active
                    ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900'
                )}
              >
                {c} <span className={cn('ml-0.5 text-xs', active ? 'opacity-60' : 'text-gray-400')}>{count}</span>
              </button>
            );
          })}
        </div>

        <span className="text-sm text-gray-500 lg:ml-auto dark:text-gray-400" aria-live="polite">
          {live.length} {live.length === 1 ? 'tool' : 'tools'}
        </span>
      </div>

      {live.length > 0 && (
        <section aria-label="Available tools" className="mt-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {live.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {soon.length > 0 && (
        <section aria-label="Coming soon" className="mt-10">
          <h2 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Coming soon</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {soon.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {noResults && (
        <div className="mt-6 rounded-xl border border-dashed border-gray-300 px-6 py-14 text-center dark:border-gray-700">
          <p className="font-medium">No tools match “{query}”</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try a different word, or suggest the tool you need.</p>
          <div className="mt-4 flex justify-center gap-2">
            <button
              onClick={() => update({ q: '', c: 'All' })}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-900"
            >
              Clear filters
            </button>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Suggest a tool
            </a>
          </div>
        </div>
      )}

      {!noResults && (
        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
          Need a tool that isn’t here?{' '}
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-black underline underline-offset-2 dark:text-white"
          >
            Tell me what to build next
          </a>
          .
        </p>
      )}
    </main>
  );
}
