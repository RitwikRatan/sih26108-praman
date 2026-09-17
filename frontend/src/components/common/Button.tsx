import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-hover shadow-xs hover:shadow-md hover-glow',
  secondary: 'bg-secondary text-white hover:bg-primary-hover shadow-xs',
  outline: 'border border-border bg-surface text-text hover:border-primary/50 hover:text-primary hover:bg-surface-hover shadow-xs',
  ghost: 'text-text-muted hover:bg-surface-hover hover:text-text',
  danger: 'bg-error text-white hover:bg-red-600 shadow-xs',
}

const sizes = {
  sm: 'h-8 px-3.5 text-xs font-medium',
  md: 'h-10 px-4 text-sm font-medium',
  lg: 'h-12 px-6 text-base font-semibold',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 active:scale-[0.98] cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  ),
)
Button.displayName = 'Button'
