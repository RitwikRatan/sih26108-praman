import { Info } from 'lucide-react'
import { cn } from '../../utils/cn'

interface DemoBannerProps {
  className?: string
}

export function DemoBanner({ className }: DemoBannerProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg border border-warning/30 bg-orange-50 px-4 py-2.5 text-sm text-orange-800',
        className,
      )}
      role="note"
    >
      <Info className="h-4 w-4 shrink-0" />
      <span>
        <strong>Demo Mode:</strong> Data shown is for SIH26108 prototype demonstration only. Not authoritative BIS data.
      </span>
    </div>
  )
}

export function AIReviewNotice({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-lg border border-primary/20 bg-blue-50/50 px-5 py-4',
        className,
      )}
    >
      <p className="text-sm font-medium text-primary mb-1">AI-assisted recommendation</p>
      <p className="text-sm text-text-muted leading-relaxed">
        These recommendations are generated from the available standards knowledge base and supporting evidence.
        The procurement authority should review and make the final determination.
      </p>
    </div>
  )
}
