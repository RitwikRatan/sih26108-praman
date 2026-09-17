import { Link, useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { FileOutput, Network } from 'lucide-react'
import { Button } from '../../components/common/Button'
import { Card } from '../../components/common/Card'
import { StandardCard } from '../../components/standards/StandardCard'
import { RelatedStandardsList } from '../../components/standards/RelatedStandards'
import { SpecificationChecker } from '../../components/analysis/SpecificationChecker'
import { AIReviewNotice } from '../../components/common/DemoBanner'
import { SkeletonCard } from '../../components/common/Skeleton'
import { ErrorState } from '../../components/common/EmptyState'
import { analysisService } from '../../services/analysisService'
import { reportService } from '../../services/reportService'
import { useToast } from '../../context/ToastContext'

export function AnalysisResult() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()

  const { data: result, isLoading, error, refetch } = useQuery({
    queryKey: ['analysis-result', id],
    queryFn: () => analysisService.getAnalysis(id!),
    enabled: !!id,
  })

  const handleGenerateReport = async () => {
    if (!id) return
    try {
      const report = await reportService.createReport(id)
      toast('Report generated', 'success')
      navigate(`/reports/${report.id}`)
    } catch {
      toast('Unable to generate report', 'error')
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    )
  }

  if (error || !result) {
    return (
      <ErrorState
        onRetry={() => refetch()}
        onBack={() => navigate('/dashboard')}
      />
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Recommended Standards</h1>
          <p className="text-text-muted mt-1">Based on the procurement requirements you provided.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleGenerateReport}>
            <FileOutput className="h-4 w-4" />
            Generate Report
          </Button>
          <Link to={`/analysis/${id}/graph`}>
            <Button variant="outline">
              <Network className="h-4 w-4" />
              View Graph
            </Button>
          </Link>
        </div>
      </div>

      <Card padding="sm" className="flex flex-wrap gap-4">
        <div><span className="text-2xl font-bold text-primary">{result.summary.total}</span> <span className="text-sm text-text-muted">standards found</span></div>
        <div><span className="text-lg font-semibold text-success">{result.summary.highlyRelevant}</span> <span className="text-sm text-text-muted">highly relevant</span></div>
        <div><span className="text-lg font-semibold">{result.summary.related}</span> <span className="text-sm text-text-muted">related</span></div>
        <div><span className="text-lg font-semibold text-warning">{result.summary.needsReview}</span> <span className="text-sm text-text-muted">needs review</span></div>
      </Card>

      <AIReviewNotice />

      <div className="space-y-4">
        {result.recommendations.map((rec, i) => (
          <StandardCard
            key={rec.id}
            standard={rec}
            index={i}
            onViewDetails={() => navigate(`/standards/${rec.id.replace('rec-', 'std-')}`)}
          />
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Related Standards</h2>
        <RelatedStandardsList
          standards={result.relatedStandards}
          onView={(sid) => navigate(`/standards/${sid}`)}
        />
      </div>

      <SpecificationChecker check={result.specificationCheck} onImprove={() => navigate('/analyze')} />
    </div>
  )
}
