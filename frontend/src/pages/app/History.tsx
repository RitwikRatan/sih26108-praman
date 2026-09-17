import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { StatusBadge } from '../../components/common/Badge'
import { Button } from '../../components/common/Button'
import { SkeletonTable } from '../../components/common/Skeleton'
import { EmptyState } from '../../components/common/EmptyState'
import { analysisService } from '../../services/analysisService'
import { formatDate } from '../../utils/format'

export function History() {
  const { data: analyses, isLoading } = useQuery({
    queryKey: ['analyses'],
    queryFn: () => analysisService.getAnalyses(),
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analysis History</h1>
        <p className="text-text-muted mt-1">View all your past procurement analyses.</p>
      </div>

      {isLoading ? (
        <SkeletonTable rows={6} />
      ) : !analyses?.length ? (
        <EmptyState
          title="No analysis history"
          description="Your completed analyses will appear here."
          actionLabel="Analyze Requirement"
          onAction={() => window.location.href = '/analyze'}
        />
      ) : (
        <div className="space-y-3">
          {analyses.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between rounded-lg border border-border bg-surface p-4 hover:bg-background/50 transition-colors"
            >
              <div>
                <p className="font-medium">{a.product}</p>
                <div className="flex items-center gap-3 mt-1">
                  <StatusBadge status={a.status} />
                  <span className="text-sm text-text-muted">{formatDate(a.createdAt)}</span>
                  {a.standardsFound > 0 && (
                    <span className="text-sm text-text-muted">{a.standardsFound} standards</span>
                  )}
                </div>
              </div>
              <Link to={`/analysis/${a.id}/results`}>
                <Button variant="outline" size="sm">View</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
