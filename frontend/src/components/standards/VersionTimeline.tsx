import { motion } from 'framer-motion'
import type { StandardVersion } from '../../types'
import { cn } from '../../utils/cn'

interface VersionTimelineProps {
  versions: StandardVersion[]
}

export function VersionTimeline({ versions }: VersionTimelineProps) {
  if (versions.length === 0) {
    return (
      <p className="text-sm text-text-muted italic">
        Version information unavailable in the current knowledge base.
      </p>
    )
  }

  return (
    <div className="relative pl-8">
      <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border" />
      {versions.map((version, i) => (
        <motion.div
          key={version.year + version.label}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          className="relative pb-8 last:pb-0"
        >
          <div
            className={cn(
              'absolute -left-5 top-1 h-4 w-4 rounded-full border-2 bg-surface',
              version.type === 'latest' ? 'border-primary bg-primary' : 'border-border',
            )}
          />
          <div
            className={cn(
              'rounded-lg border p-4',
              version.type === 'latest' ? 'border-primary/30 bg-primary/5' : 'border-border bg-surface',
            )}
          >
            <p className="text-lg font-bold text-text">{version.year}</p>
            <p className={cn('font-medium', version.type === 'latest' ? 'text-primary' : 'text-text')}>
              {version.label}
              {version.type === 'latest' && (
                <span className="ml-2 text-xs font-normal bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  Latest Available
                </span>
              )}
              {version.type === 'amendment' && (
                <span className="ml-2 text-xs font-normal bg-warning/10 text-warning px-2 py-0.5 rounded-full">
                  Amendment
                </span>
              )}
              {version.label?.toLowerCase().includes('under revision') && (
                <span className="ml-2 text-xs font-normal bg-error/10 text-error px-2 py-0.5 rounded-full">
                  Under Revision
                </span>
              )}
            </p>
            {version.description && (
              <p className="text-sm text-text-muted mt-1">{version.description}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
