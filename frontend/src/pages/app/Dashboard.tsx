import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Plus, Search, Upload, FileText, BarChart3, Bookmark, FileCheck, History } from 'lucide-react'
import { Button } from '../../components/common/Button'
import { Card } from '../../components/common/Card'
import { StatusBadge } from '../../components/common/Badge'
import { SkeletonCard, SkeletonTable } from '../../components/common/Skeleton'
import { EmptyState } from '../../components/common/EmptyState'
import { useLanguage } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import { analysisService } from '../../services/analysisService'
import { formatDate } from '../../utils/format'

const statIcons = {
  analyses: BarChart3,
  savedStandards: Bookmark,
  reports: FileCheck,
  recentSearches: History,
}

export function Dashboard() {
  const { t } = useLanguage()
  const { user } = useAuth()

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => analysisService.getDashboardStats(),
  })

  const { data: analyses, isLoading: analysesLoading } = useQuery({
    queryKey: ['analyses'],
    queryFn: () => analysisService.getAnalyses(),
  })

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return t.dashboard.greeting
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const statItems = stats
    ? [
        { key: 'analyses', label: t.dashboard.analyses, value: stats.analyses },
        { key: 'savedStandards', label: t.dashboard.savedStandards, value: stats.savedStandards },
        { key: 'reports', label: t.dashboard.reports, value: stats.reports },
        { key: 'recentSearches', label: t.dashboard.recentSearches, value: stats.recentSearches },
      ]
    : []

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{greeting()}, {user?.name?.split(' ')[0]}</h1>
          <p className="text-text-muted mt-1">{t.dashboard.subtitle}</p>
        </div>
        <Link to="/analyze">
          <Button>
            <Plus className="h-4 w-4" />
            {t.dashboard.analyzeRequirement}
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : statItems.map((stat) => {
              const Icon = statIcons[stat.key as keyof typeof statIcons]
              return (
                <Card key={stat.key} padding="sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">{t.dashboard.quickActions}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { to: '/analyze', icon: FileText, title: 'Analyze Requirement', desc: 'Enter a product or procurement requirement' },
            { to: '/analyze?tab=upload', icon: Upload, title: 'Upload Tender', desc: 'Upload a PDF or document' },
            { to: '/standards', icon: Search, title: 'Explore Standards', desc: 'Search the standards knowledge base' },
          ].map((action) => (
            <Link key={action.title} to={action.to}>
              <Card hover className="h-full">
                <action.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold">{action.title}</h3>
                <p className="text-sm text-text-muted mt-1">{action.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Analysis */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{t.dashboard.recentAnalysis}</h2>
          <Link to="/history" className="text-sm text-primary hover:underline">View all</Link>
        </div>

        {analysesLoading ? (
          <SkeletonTable rows={4} />
        ) : !analyses?.length ? (
          <EmptyState
            title={t.dashboard.noAnalyses}
            description={t.dashboard.noAnalysesDesc}
            actionLabel={t.dashboard.analyzeRequirement}
            onAction={() => window.location.href = '/analyze'}
          />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="w-full text-sm">
              <thead className="bg-background">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-text-muted">Product</th>
                  <th className="px-4 py-3 text-left font-medium text-text-muted">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-text-muted hidden sm:table-cell">Standards Found</th>
                  <th className="px-4 py-3 text-left font-medium text-text-muted">Date</th>
                  <th className="px-4 py-3 text-right font-medium text-text-muted">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {analyses.slice(0, 5).map((a) => (
                  <tr key={a.id} className="hover:bg-background/50">
                    <td className="px-4 py-3 font-medium">{a.product}</td>
                    <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                    <td className="px-4 py-3 hidden sm:table-cell">{a.standardsFound} standards</td>
                    <td className="px-4 py-3 text-text-muted">{formatDate(a.createdAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <Link to={`/analysis/${a.id}/results`}>
                        <Button variant="ghost" size="sm">View</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
