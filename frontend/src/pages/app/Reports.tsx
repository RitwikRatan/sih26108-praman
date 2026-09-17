import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Download, Trash2, Eye } from 'lucide-react'
import { Button } from '../../components/common/Button'
import { StatusBadge } from '../../components/common/Badge'
import { SkeletonTable } from '../../components/common/Skeleton'
import { EmptyState } from '../../components/common/EmptyState'
import { reportService } from '../../services/reportService'
import { useToast } from '../../context/ToastContext'
import { formatDate } from '../../utils/format'

export function Reports() {
  const { toast } = useToast()

  const { data: reports, isLoading, refetch } = useQuery({
    queryKey: ['reports'],
    queryFn: () => reportService.getReports(),
  })

  const handleDownload = async (id: string) => {
    try {
      await reportService.downloadReport(id)
      toast('Report download started', 'success')
    } catch {
      toast('Unable to download report', 'error')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await reportService.deleteReport(id)
      toast('Report deleted', 'success')
      refetch()
    } catch {
      toast('Unable to delete report', 'error')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-text-muted mt-1">View and download your procurement standards reports.</p>
      </div>

      {isLoading ? (
        <SkeletonTable rows={4} />
      ) : !reports?.length ? (
        <EmptyState
          title="No reports yet"
          description="Complete an analysis and generate a report to see it here."
          actionLabel="Analyze Requirement"
          onAction={() => window.location.href = '/analyze'}
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full text-sm">
            <thead className="bg-background">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-text-muted">Report</th>
                <th className="px-4 py-3 text-left font-medium text-text-muted hidden sm:table-cell">Product</th>
                <th className="px-4 py-3 text-left font-medium text-text-muted">Date</th>
                <th className="px-4 py-3 text-left font-medium text-text-muted">Status</th>
                <th className="px-4 py-3 text-right font-medium text-text-muted">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reports.map((r) => (
                <tr key={r.id} className="hover:bg-background/50">
                  <td className="px-4 py-3 font-medium">{r.title}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">{r.product}</td>
                  <td className="px-4 py-3 text-text-muted">{formatDate(r.date)}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Link to={`/reports/${r.id}`}>
                        <Button variant="ghost" size="sm" aria-label="View"><Eye className="h-4 w-4" /></Button>
                      </Link>
                      <Button variant="ghost" size="sm" onClick={() => handleDownload(r.id)} aria-label="Download">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(r.id)} aria-label="Delete">
                        <Trash2 className="h-4 w-4 text-error" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
