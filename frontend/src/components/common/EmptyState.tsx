import { AlertCircle, FileSearch } from 'lucide-react'
import { Button } from './Button'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  icon?: 'search' | 'alert'
}

export function EmptyState({ title, description, actionLabel, onAction, icon = 'search' }: EmptyStateProps) {
  const Icon = icon === 'alert' ? AlertCircle : FileSearch
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background mb-4">
        <Icon className="h-7 w-7 text-text-muted" />
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-sm text-text-muted max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  )
}

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  onBack?: () => void
}

export function ErrorState({
  title = "We couldn't complete the analysis",
  description = 'Please try again or check the uploaded document.',
  onRetry,
  onBack,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 mb-4">
        <AlertCircle className="h-7 w-7 text-error" />
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-sm text-text-muted max-w-md mb-6">{description}</p>
      <div className="flex gap-3">
        {onRetry && <Button onClick={onRetry}>Try Again</Button>}
        {onBack && <Button variant="outline" onClick={onBack}>Back</Button>}
      </div>
    </div>
  )
}
