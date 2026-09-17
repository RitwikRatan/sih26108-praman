import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Download, Save, ArrowLeft } from 'lucide-react'
import { Button } from '../../components/common/Button'
import { Card } from '../../components/common/Card'
import { RelevanceBadge } from '../../components/common/Badge'
import { SpecificationChecker } from '../../components/analysis/SpecificationChecker'
import { ExtractionReview } from '../../components/analysis/ExtractionReview'
import { RelatedStandardsList } from '../../components/standards/RelatedStandards'
import { AIReviewNotice } from '../../components/common/DemoBanner'
import { SkeletonCard } from '../../components/common/Skeleton'
import { reportService } from '../../services/reportService'
import { useToast } from '../../context/ToastContext'

export function ReportDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()

  const { data: report, isLoading } = useQuery({
    queryKey: ['report', id],
    queryFn: () => reportService.getReport(id!),
    enabled: !!id,
  })

  const handleDownload = async () => {
    if (!id) return
    await reportService.downloadReport(id)
    toast('Report saved', 'success')
  }

  if (isLoading) return <SkeletonCard />
  if (!report) return null

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/reports')} className="mb-2">
            <ArrowLeft className="h-4 w-4" /> Back to Reports
          </Button>
          <h1 className="text-2xl font-bold">Procurement Standards Report</h1>
          <p className="text-text-muted">{report.product} — {new Date(report.date).toLocaleDateString('en-IN')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4" /> Download PDF
          </Button>
          <Button onClick={() => toast('Report saved', 'success')}>
            <Save className="h-4 w-4" /> Save Report
          </Button>
        </div>
      </div>

      <AIReviewNotice />

      <Card>
        <h2 className="font-semibold mb-2">Procurement Requirement</h2>
        <p className="text-sm text-text-muted">{report.requirement}</p>
      </Card>

      <Card>
        <h2 className="font-semibold mb-4">Detected Requirements</h2>
        <ExtractionReview extracted={report.extracted} />
      </Card>

      <div>
        <h2 className="font-semibold mb-4">Recommended Standards</h2>
        <div className="space-y-3">
          {report.recommendations.map((rec) => (
            <Card key={rec.id} padding="sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-primary">{rec.isNumber}</p>
                  <p className="font-medium">{rec.title}</p>
                  <ul className="mt-2 space-y-0.5">
                    {rec.reasons.slice(0, 3).map((r) => (
                      <li key={r} className="text-xs text-text-muted">✓ {r}</li>
                    ))}
                  </ul>
                </div>
                <RelevanceBadge relevance={rec.relevance} />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <h2 className="font-semibold mb-4">Related Standards</h2>
        <RelatedStandardsList standards={report.relatedStandards} />
      </Card>

      <SpecificationChecker check={report.specificationCheck} />

      <Card className="border-warning/30 bg-orange-50/50">
        <h2 className="font-semibold mb-2">Review Notice</h2>
        <p className="text-sm text-text-muted leading-relaxed">
          This report was generated using AI-assisted analysis of the available standards knowledge base.
          The procurement authority must review all recommendations and make the final determination.
          Demo data is used for prototype demonstration purposes only.
        </p>
      </Card>
    </div>
  )
}
