import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Network } from 'lucide-react'
import { Button } from '../../components/common/Button'
import { Tabs } from '../../components/common/Tabs'
import { RelevanceBadge } from '../../components/common/Badge'
import { Card } from '../../components/common/Card'
import { RelatedStandardsList } from '../../components/standards/RelatedStandards'
import { VersionTimeline } from '../../components/standards/VersionTimeline'
import { CertificationPanel } from '../../components/standards/CertificationPanel'
import { EvidenceCard } from '../../components/standards/StandardCard'
import { SkeletonCard } from '../../components/common/Skeleton'
import { ErrorState } from '../../components/common/EmptyState'
import { AIReviewNotice } from '../../components/common/DemoBanner'
import { standardsService } from '../../services/standardsService'

export function StandardDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const { data: standard, isLoading, error, refetch } = useQuery({
    queryKey: ['standard', id],
    queryFn: () => standardsService.getById(id!),
    enabled: !!id,
  })

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'related', label: 'Related' },
    { id: 'updates', label: 'Updates' },
    { id: 'sources', label: 'Sources' },
  ]

  if (isLoading) return <SkeletonCard />
  if (error || !standard) {
    return <ErrorState onRetry={() => refetch()} onBack={() => navigate(-1)} />
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Results
        </button>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-primary">{standard.isNumber}</p>
            <h1 className="text-2xl font-bold">{standard.title}</h1>
          </div>
          <div className="flex gap-2">
            <RelevanceBadge relevance={standard.relevance} />
            <Link to={`/standards/${id}/graph`}>
              <Button variant="outline" size="sm">
                <Network className="h-4 w-4" />
                Relationship Graph
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="pt-4">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold mb-2">Overview</h3>
              <p className="text-sm text-text-muted leading-relaxed">{standard.overview}</p>
            </Card>
            {standard.scope && (
              <Card>
                <h3 className="font-semibold mb-2">Scope</h3>
                <p className="text-sm text-text-muted leading-relaxed">{standard.scope}</p>
              </Card>
            )}
            <CertificationPanel certification={standard.certification} />
            <AIReviewNotice />
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="space-y-6">
            {standard.keyRequirements && (
              <Card>
                <h3 className="font-semibold mb-3">Key Requirements</h3>
                <ul className="space-y-2">
                  {standard.keyRequirements.map((req) => (
                    <li key={req} className="flex items-start gap-2 text-sm">
                      <span className="text-success mt-0.5">✓</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            {standard.clauses && standard.clauses.length > 0 && (
              <Card>
                <h3 className="font-semibold mb-3">Clauses</h3>
                <div className="space-y-3">
                  {standard.clauses.map((clause) => (
                    <div key={clause.number} className="border-b border-border pb-3 last:border-0">
                      <p className="font-medium text-sm">Clause {clause.number}: {clause.title}</p>
                      {clause.description && <p className="text-sm text-text-muted mt-1">{clause.description}</p>}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'related' && (
          <RelatedStandardsList
            standards={standard.relatedStandards}
            onView={(sid) => navigate(`/standards/${sid}`)}
          />
        )}

        {activeTab === 'updates' && (
          <Card>
            <h3 className="font-semibold mb-4">Version & Amendment Timeline</h3>
            <VersionTimeline versions={standard.versions} />
          </Card>
        )}

        {activeTab === 'sources' && (
          <div className="space-y-4">
            {standard.evidence.map((ev) => (
              <EvidenceCard key={ev.id} evidence={ev} />
            ))}
            {standard.sources?.map((src) => (
              <Card key={src.name} padding="sm">
                <p className="font-medium text-sm">{src.name}</p>
                <p className="text-xs text-text-muted mt-1">{src.status}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
