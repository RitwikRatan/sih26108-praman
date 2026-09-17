import type { ExtractedRequirement } from '../../types'
import { Card } from '../common/Card'
import { Input } from '../common/Input'
import { Textarea } from '../common/Textarea'

interface ExtractionReviewProps {
  extracted: ExtractedRequirement
  editable?: boolean
  onChange?: (extracted: ExtractedRequirement) => void
}

export function ExtractionReview({ extracted, editable, onChange }: ExtractionReviewProps) {
  const update = (field: keyof ExtractedRequirement, value: string | string[]) => {
    onChange?.({ ...extracted, [field]: value })
  }

  if (editable) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Product"
          value={extracted.product ?? ''}
          onChange={(e) => update('product', e.target.value)}
        />
        <Input
          label="Application"
          value={extracted.application ?? ''}
          onChange={(e) => update('application', e.target.value)}
        />
        <Input
          label="Purpose"
          value={extracted.purpose ?? ''}
          onChange={(e) => update('purpose', e.target.value)}
        />
        <Input
          label="Quantity"
          value={extracted.quantity ?? ''}
          onChange={(e) => update('quantity', e.target.value)}
        />
        <div className="sm:col-span-2">
          <Textarea
            label="Technical Requirements"
            value={extracted.technicalRequirements ?? ''}
            onChange={(e) => update('technicalRequirements', e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea
            label="Safety Requirements"
            value={extracted.safetyRequirements ?? ''}
            onChange={(e) => update('safetyRequirements', e.target.value)}
          />
        </div>
      </div>
    )
  }

  const cards = [
    { label: 'Product', value: extracted.product },
    { label: 'Application', value: extracted.application },
    { label: 'Purpose', value: extracted.purpose },
    {
      label: 'Key Requirements',
      value: extracted.keyRequirements?.join(', '),
    },
  ].filter((c) => c.value)

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((card) => (
        <Card key={card.label} padding="sm">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wide">{card.label}</p>
          <p className="text-base font-medium text-text mt-1">{card.value}</p>
        </Card>
      ))}
    </div>
  )
}
