import type { RelatedStandard } from '../../types'
import { Badge } from '../common/Badge'
import { Card } from '../common/Card'

const relationshipLabels: Record<string, string> = {
  testing: 'Testing',
  safety: 'Safety',
  installation: 'Installation',
  'normative-reference': 'Normative Reference',
  related: 'Related',
}

const relationshipColors: Record<string, 'info' | 'success' | 'warning' | 'default' | 'outline'> = {
  testing: 'info',
  safety: 'success',
  installation: 'warning',
  'normative-reference': 'default',
  related: 'outline',
}

interface RelatedStandardsProps {
  standards: RelatedStandard[]
  onView?: (id: string) => void
}

export function RelatedStandardsList({ standards, onView }: RelatedStandardsProps) {
  const grouped = standards.reduce<Record<string, RelatedStandard[]>>((acc, s) => {
    const key = s.relationship
    if (!acc[key]) acc[key] = []
    acc[key].push(s)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([relationship, items]) => (
        <div key={relationship}>
          <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
            {relationshipLabels[relationship] ?? relationship}
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((std) => (
              <Card key={std.id} hover padding="sm" className="cursor-pointer" onClick={() => onView?.(std.id)}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-primary">{std.isNumber}</p>
                    <p className="text-sm text-text mt-0.5">{std.title}</p>
                  </div>
                  <Badge variant={relationshipColors[relationship] ?? 'outline'}>
                    {relationshipLabels[relationship]}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
