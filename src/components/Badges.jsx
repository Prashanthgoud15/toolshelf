import { ShieldCheck, Cloud } from 'lucide-react';
import { PRIVACY } from '../data/tools';
import { cn } from '../lib/utils';

export function Pill({ children, tone = 'neutral', className }) {
  const tones = {
    neutral: 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400',
    green: 'bg-green-500/10 text-green-700 dark:text-green-400',
    amber: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  };
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium leading-none', tones[tone], className)}>
      {children}
    </span>
  );
}

export function PrivacyBadge({ privacy, className }) {
  const info = PRIVACY[privacy];
  if (!info) return null;
  const local = privacy === 'local';
  const Icon = local ? ShieldCheck : Cloud;
  return (
    <span
      title={info.detail}
      className={cn(
        'inline-flex items-center gap-1.5 text-xs',
        local ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400',
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {info.label}
    </span>
  );
}
