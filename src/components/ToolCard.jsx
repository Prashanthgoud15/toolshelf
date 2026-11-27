import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ToolIcon from './ToolIcon';
import { Pill, PrivacyBadge } from './Badges';
import { isNew } from '../lib/utils';

export default function ToolCard({ tool }) {
  const soon = tool.status === 'soon';

  return (
    <article
      className={
        'relative flex flex-col rounded-xl border border-gray-200 bg-white p-4 transition-colors dark:border-gray-800 dark:bg-black ' +
        (soon
          ? 'opacity-60'
          : 'hover:border-gray-400 focus-within:border-gray-400 dark:hover:border-gray-600 dark:focus-within:border-gray-600')
      }
    >
      <div className="flex items-start justify-between gap-2">
        <ToolIcon name={tool.icon} />
        <div className="flex flex-wrap justify-end gap-1">
          {soon && <Pill tone="amber">Coming soon</Pill>}
          {isNew(tool) && <Pill tone="green">New</Pill>}
          {tool.week && <Pill>Week {tool.week}</Pill>}
        </div>
      </div>

      <h3 className="mt-3 font-semibold tracking-tight">
        {soon ? (
          tool.name
        ) : (
          <Link to={`/tools/${tool.slug}`} className="rounded after:absolute after:inset-0 after:rounded-xl after:content-['']">
            {tool.name}
          </Link>
        )}
      </h3>
      <p className="mt-0.5 text-sm leading-snug text-gray-500 dark:text-gray-400">{tool.tagline}</p>

      <div className="mt-auto flex items-center justify-between gap-2 pt-4">
        <PrivacyBadge privacy={tool.privacy} />
        {!soon && (
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${tool.name} in a new tab`}
            className="relative z-10 inline-flex items-center gap-0.5 rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
          >
            Open <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
