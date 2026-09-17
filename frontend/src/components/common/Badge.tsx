import { cn } from '../../utils/cn'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700',
  success: 'bg-green-50 text-green-700 border border-green-200',
  warning: 'bg-orange-50 text-orange-700 border border-orange-200',
  error: 'bg-red-50 text-red-700 border border-red-200',
  info: 'bg-blue-50 text-blue-700 border border-blue-200',
  outline: 'border border-border text-text-muted bg-surface',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, BadgeVariant> = {
    completed: 'success',
    ready: 'success',
    processing: 'info',
    'needs-review': 'warning',
    draft: 'outline',
    Active: 'success',
  }
  const labels: Record<string, string> = {
    completed: 'Completed',
    processing: 'Processing',
    'needs-review': 'Needs Review',
    ready: 'Ready',
    draft: 'Draft',
  }
  return (
    <Badge variant={map[status] ?? 'default'}>
      {labels[status] ?? status}
    </Badge>
  )
}

export function RelevanceBadge({ relevance }: { relevance: string }) {
  const map: Record<string, BadgeVariant> = {
    'very-high': 'success',
    high: 'info',
    medium: 'warning',
    low: 'outline',
    'needs-review': 'warning',
  }
  const labels: Record<string, string> = {
    'very-high': 'Very High Match',
    high: 'High Match',
    medium: 'Medium Match',
    low: 'Low Match',
    'needs-review': 'Needs Review',
  }
  return (
    <Badge variant={map[relevance] ?? 'default'}>
      {labels[relevance] ?? relevance}
    </Badge>
  )
}
