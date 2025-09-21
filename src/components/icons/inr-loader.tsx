
import { cn } from '@/lib/utils';
import * as React from 'react';

export function InrLoader({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('animate-pulse', className)}
      {...props}
    >
      <style>
        {`
          @keyframes pulse-glow {
            0%, 100% {
              filter: drop-shadow(0 0 2px hsl(var(--primary)));
              stroke: hsl(var(--primary));
            }
            50% {
              filter: drop-shadow(0 0 5px hsl(var(--primary) / 0.7)) drop-shadow(0 0 10px hsl(var(--primary) / 0.5));
              stroke: hsl(var(--primary) / 0.8);
            }
          }
          .animate-pulse-glow {
            animation: pulse-glow 2s infinite ease-in-out;
          }
        `}
      </style>
      <g className="animate-pulse-glow">
        <path d="M6 3h12" />
        <path d="M6 8h12" />
        <path d="m6 13 8.5 8" />
        <path d="M6 13h4" />
        <path d="M18 13h-2.5" />
      </g>
    </svg>
  );
}
