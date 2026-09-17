import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { theme } from '../../config/theme'
import { cn } from '../../utils/cn'

interface LogoProps {
  className?: string
  showSubtitle?: boolean
}

export function Logo({ className, showSubtitle = false }: LogoProps) {
  return (
    <Link to="/" className={cn('flex items-center gap-2.5', className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
        <Shield className="h-5 w-5 text-white" />
      </div>
      <div>
        <span className="font-semibold text-text leading-tight">{theme.brand.name}</span>
        {showSubtitle && (
          <p className="text-[10px] text-text-muted leading-tight">{theme.brand.prototype}</p>
        )}
      </div>
    </Link>
  )
}
