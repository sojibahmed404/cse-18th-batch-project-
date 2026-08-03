import React from 'react';
import { cn } from '../../lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, initials, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-14 w-14 text-base',
      xl: 'h-24 w-24 text-2xl',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 overflow-hidden rounded-full bg-surface-2 items-center justify-center border-2 border-surface-3',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <span className="font-semibold text-text-secondary uppercase">
            {initials || '?'}
          </span>
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export { Avatar };
