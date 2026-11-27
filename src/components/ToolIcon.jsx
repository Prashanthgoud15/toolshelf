import { getIcon } from '../lib/icons';
import { cn } from '../lib/utils';

export default function ToolIcon({ name, size = 'md', className }) {
  const Icon = getIcon(name);
  const sizes = { md: 'h-9 w-9 rounded-lg', lg: 'h-12 w-12 rounded-xl' };
  const iconSizes = { md: 'h-[18px] w-[18px]', lg: 'h-6 w-6' };
  return (
    <div className={cn('flex shrink-0 items-center justify-center bg-gray-100 dark:bg-gray-900', sizes[size], className)}>
      <Icon className={iconSizes[size]} aria-hidden="true" />
    </div>
  );
}
