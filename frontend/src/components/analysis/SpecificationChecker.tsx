import { AlertTriangle, CheckCircle, MinusCircle } from 'lucide-react'
import type { SpecificationCheck } from '../../types'
import { Card } from '../common/Card'
import { Progress } from '../common/Progress'
import { Button } from '../common/Button'

const statusIcons = {
  complete: CheckCircle,
  partial: AlertTriangle,
  missing: MinusCircle,
}

const statusColors = {
  complete: 'text-success',
  partial: 'text-warning',
  missing: 'text-text-muted',
}

export function SpecificationChecker({ check, onImprove }: { check: SpecificationCheck; onImprove?: () => void }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-1">Specification Check</h3>
      <p className="text-sm text-text-muted mb-4">Specification Coverage</p>
      <Progress value={check.coverage} showLabel className="mb-6" />
      <ul className="space-y-3">
        {check.items.map((item) => {
          const Icon = statusIcons[item.status]
          return (
            <li key={item.label} className="flex items-center gap-3 text-sm">
              <Icon className={`h-4 w-4 shrink-0 ${statusColors[item.status]}`} />
              <span className={item.status === 'missing' ? 'text-text-muted' : 'text-text'}>
                {item.label}
              </span>
            </li>
          )
        })}
      </ul>
      {onImprove && (
        <Button variant="outline" className="mt-6" onClick={onImprove}>
          Improve Specification
        </Button>
      )}
    </Card>
  )
}
