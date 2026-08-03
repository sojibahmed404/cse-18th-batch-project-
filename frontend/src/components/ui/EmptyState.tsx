import React from 'react';
import { cn } from '../../lib/utils';

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  className,
  icon,
  title,
  description,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center animate-fade-in',
        className
      )}
      {...props}
    >
      <div className="mb-4 rounded-full bg-surface-2 p-4 text-text-secondary border border-surface-3">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-text-primary">{title}</h3>
      {description && <p className="mb-6 max-w-sm text-sm text-text-secondary">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
