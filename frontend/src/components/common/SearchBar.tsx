import { Search } from 'lucide-react'
import { cn } from '../../utils/cn'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  hint?: string
  className?: string
}

export function SearchBar({ value, onChange, placeholder = 'Search...', hint, className }: SearchBarProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex h-10 w-full rounded-lg border border-border bg-surface pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label={placeholder}
        />
      </div>
      {hint && <p className="text-xs text-text-muted">{hint}</p>}
    </div>
  )
}
