import { cn } from '../../utils/cn'

interface ProgressProps {
  value: number
  className?: string
  showLabel?: boolean
}

export function Progress({ value, className, showLabel }: ProgressProps) {
  return (
    <div className={cn('space-y-1', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Progress</span>
          <span className="font-medium">{value}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}

interface StepProgressProps {
  steps: { id: string; label: string; status: 'pending' | 'active' | 'completed' }[]
}

export function StepProgress({ steps }: StepProgressProps) {
  return (
    <div className="space-y-3">
      {steps.map((step) => (
        <div key={step.id} className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors',
              step.status === 'completed' && 'bg-success text-white',
              step.status === 'active' && 'bg-primary text-white',
              step.status === 'pending' && 'border-2 border-gray-200 text-text-muted',
            )}
          >
            {step.status === 'completed' ? '✓' : step.status === 'active' ? '●' : '○'}
          </div>
          <span
            className={cn(
              'text-sm transition-colors',
              step.status === 'completed' && 'text-text',
              step.status === 'active' && 'font-medium text-primary',
              step.status === 'pending' && 'text-text-muted',
            )}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  )
}
