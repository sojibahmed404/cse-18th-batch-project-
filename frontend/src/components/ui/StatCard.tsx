import React from 'react';
import { Card, CardContent } from './Card';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'primary' | 'accent' | 'warning' | 'danger';
  className?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  color = 'primary',
  className,
  delay = 0,
}: StatCardProps) {
  const colorClasses = {
    primary: 'text-primary bg-primary/10',
    accent: 'text-accent bg-accent/10',
    warning: 'text-warning bg-warning/10',
    danger: 'text-danger bg-danger/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className={cn('card-hover', className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
              <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
              {trend && (
                <p
                  className={cn(
                    'text-sm mt-2 font-medium',
                    trend.isPositive ? 'text-accent' : 'text-danger'
                  )}
                >
                  {trend.isPositive ? '+' : '-'}{trend.value} from last month
                </p>
              )}
            </div>
            <div className={cn('p-4 rounded-xl', colorClasses[color])}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
