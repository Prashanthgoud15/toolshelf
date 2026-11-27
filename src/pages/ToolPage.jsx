import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, Share2, Eye, EyeOff, Linkedin } from 'lucide-react';
import ToolIcon from '../components/ToolIcon';
import ToolCard from '../components/ToolCard';
import { Pill, PrivacyBadge } from '../components/Badges';
import { tools, PRIVACY } from '../data/tools';
import { site } from '../data/site';
import { copyToClipboard, isNew } from '../lib/utils';
import useDocumentMeta from '../lib/useDocumentMeta';
import NotFound from './NotFound';

export default function ToolPage() {
  const { slug } = useParams();
  const tool = tools.find((t) => t.slug === slug);
  const [preview, setPreview] = useState(false);
  const [shared, setShared] = useState(false);

  useDocumentMeta(
    tool ? `${tool.name} — free online tool | ${site.name}` : `Not found | ${site.name}`,
    tool ? `${tool.tagline}. ${tool.description}` : site.description
  );

  if (!tool) return <NotFound />;

  const soon = tool.status === 'soon';
  const related = tools
    .filter((t) => t.slug !== tool.slug && t.status === 'live')
    .sort((a, b) => Number(b.category === tool.category) - Number(a.category === tool.category))
    .slice(0, 3);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: tool.name, text: tool.tagline, url });
        return;
      } catch { /* user cancelled, fall through to copy */ }
    }
    if (await copyToClipboard(url)) {
      setShared(true);
      setTimeout(() => setShared(false), 1800);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 pb-4 pt-10 sm:px-6">
      <Link to="/" className="inline-flex items-center gap-1.5 rounded text-sm text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All tools
      </Link>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
        <ToolIcon name={tool.icon} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            <Pill>{tool.category}</Pill>
            {tool.week && <Pill>Week {tool.week}</Pill>}
            {isNew(tool) && <Pill tone="green">New</Pill>}
            {soon && <Pill tone="amber">Coming soon</Pill>}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{tool.name}</h1>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">{tool.tagline}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {soon ? (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" /> Follow for the launch
              </a>
            ) : (
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                Launch tool <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            <button
              onClick={share}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium transition hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-900"
            >
              {shared ? <Check className="h-4 w-4 text-green-500" aria-hidden="true" /> : <Share2 className="h-4 w-4" aria-hidden="true" />}
              {shared ? 'Link copied' : 'Share'}
            </button>
            {!soon && (
              <button
                onClick={() => setPreview((p) => !p)}
                aria-expanded={preview}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium transition hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-900"
              >
                {preview ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                {preview ? 'Hide preview' : 'Try it here'}
              </button>
            )}
          </div>
        </div>
      </div>

      {preview && !soon && (
        <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <iframe
            src={tool.url}
            title={`${tool.name} preview`}
            loading="lazy"
            allow="clipboard-read; clipboard-write"
            sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups allow-modals"
            className="h-[70vh] min-h-[520px] w-full bg-white"
          />
          <p className="border-t border-gray-200 px-4 py-2.5 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
            Some features work best in the full tool.{' '}
            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Open in a new tab</a>
          </p>
        </div>
      )}

      <section className="mt-12 grid gap-10 sm:grid-cols-5">
        <div className="sm:col-span-3">
          <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">About</h2>
          <p className="mt-3 leading-relaxed">{tool.description}</p>

          <h2 className="mt-10 text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Highlights</h2>
          <ul className="mt-3 space-y-2.5">
            {tool.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="sm:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/50">
            <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Privacy</h2>
            <PrivacyBadge privacy={tool.privacy} className="mt-3 text-sm font-medium" />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{PRIVACY[tool.privacy]?.detail}</p>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="mt-20" aria-label="More tools">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">More tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t, i) => (
              <ToolCard key={t.slug} tool={t} index={i} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
