import { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { StandardRecommendation } from '../../types'
import { Card } from '../common/Card'
import { RelevanceBadge } from '../common/Badge'
import { Button } from '../common/Button'
import { cn } from '../../utils/cn'

interface StandardCardProps {
  standard: StandardRecommendation
  index?: number
  onViewDetails?: (id: string) => void
}

export function StandardCard({ standard, index = 0, onViewDetails }: StandardCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
    >
      <Card hover className="overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <p className="text-sm font-semibold text-primary">{standard.isNumber}</p>
            <h3 className="text-lg font-semibold text-text mt-0.5">{standard.title}</h3>
          </div>
          <RelevanceBadge relevance={standard.relevance} />
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-text mb-2">Why recommended?</p>
          <ul className="space-y-1">
            {standard.reasons.map((reason) => (
              <li key={reason} className="flex items-center gap-2 text-sm text-text-muted">
                <span className="text-success">✓</span>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {standard.latestVersion && (
          <p className="text-sm text-text-muted mb-4">
            Latest version: <span className="font-medium text-text">{standard.latestVersion}</span>
            {standard.score !== undefined && (
              <span className="ml-3 text-xs">({standard.score}% match)</span>
            )}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            Why recommended?
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          {onViewDetails && (
            <Button size="sm" onClick={() => onViewDetails(standard.id)}>
              View Details
            </Button>
          )}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                {standard.matchScores && standard.matchScores.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Why this standard?</p>
                    {standard.matchScores.map((score) => (
                      <div key={score.category}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-text-muted">{score.category}</span>
                          <span className="font-medium capitalize">{score.level}</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className={cn(
                              'h-full rounded-full transition-all',
                              score.level === 'high' ? 'bg-success' : score.level === 'medium' ? 'bg-warning' : 'bg-gray-300',
                            )}
                            style={{ width: `${score.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium mb-2">Supporting evidence</p>
                  {standard.evidence.length > 0 ? (
                    standard.evidence.map((ev) => (
                      <div key={ev.id} className="rounded-lg bg-background p-3 text-sm">
                        {ev.status === 'unavailable' ? (
                          <p className="text-text-muted italic">
                            Evidence not available in the current knowledge base.
                          </p>
                        ) : (
                          <>
                            <p><span className="font-medium">Source:</span> {ev.source}</p>
                            {ev.section && <p className="mt-1"><span className="font-medium">Section:</span> {ev.section}</p>}
                            {ev.text && <p className="mt-2 text-text-muted">{ev.text}</p>}
                            <p className="mt-2 text-xs text-success">Verified in knowledge base (Demo)</p>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-text-muted italic">
                      Evidence not available in the current knowledge base.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

export function EvidenceCard({ evidence }: { evidence: import('../../types').Evidence }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="text-sm font-medium mb-3">Why this result?</p>
      {evidence.status === 'unavailable' ? (
        <p className="text-sm text-text-muted italic">
          Evidence not available in the current knowledge base.
        </p>
      ) : (
        <dl className="space-y-2 text-sm">
          <div><dt className="inline font-medium">Source: </dt><dd className="inline text-text-muted">{evidence.source}</dd></div>
          {evidence.section && (
            <div><dt className="inline font-medium">Relevant section: </dt><dd className="inline text-text-muted">{evidence.section}</dd></div>
          )}
          {evidence.text && (
            <div><dt className="font-medium">Evidence: </dt><dd className="text-text-muted mt-1">{evidence.text}</dd></div>
          )}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-success">Verified in knowledge base (Demo)</span>
            <button className="text-xs text-primary flex items-center gap-1 hover:underline">
              View Source <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </dl>
      )}
    </div>
  )
}
