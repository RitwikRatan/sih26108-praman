import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { SearchBar } from '../../components/common/SearchBar'
import { Select } from '../../components/common/Select'
import { StatusBadge } from '../../components/common/Badge'
import { SkeletonTable } from '../../components/common/Skeleton'
import { EmptyState } from '../../components/common/EmptyState'
import { DemoBanner } from '../../components/common/DemoBanner'
import { Button } from '../../components/common/Button'
import { standardsService } from '../../services/standardsService'
import { useAuth } from '../../context/AuthContext'

export function StandardsExplorer() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const { isAuthenticated } = useAuth()

  const { data: standards, isLoading } = useQuery({
    queryKey: ['standards', query, category, status],
    queryFn: () => standardsService.search(query, { category, status }),
  })

  const categories = [...new Set(standards?.map((s) => s.category) ?? [])]

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DemoBanner className="mb-8" />
        <h1 className="text-3xl font-bold mb-2">Standards Explorer</h1>
        <p className="text-text-muted mb-8">Search Indian Standards by product description or IS number.</p>

        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="md:col-span-2">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search Indian Standards..."
              hint="Searching by meaning and context"
            />
          </div>
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: '', label: 'All Categories' },
              ...categories.map((c) => ({ value: c, label: c })),
            ]}
          />
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: '', label: 'All Status' },
              { value: 'Active', label: 'Active' },
            ]}
          />
        </div>

        {isLoading ? (
          <SkeletonTable rows={6} />
        ) : !standards?.length ? (
          <EmptyState
            title="No standards found"
            description="Try a different search term or adjust your filters."
          />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="w-full text-sm">
              <thead className="bg-background sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-text-muted">IS Number</th>
                  <th className="px-4 py-3 text-left font-medium text-text-muted">Title</th>
                  <th className="px-4 py-3 text-left font-medium text-text-muted hidden md:table-cell">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-text-muted">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-text-muted hidden sm:table-cell">Year</th>
                  <th className="px-4 py-3 text-right font-medium text-text-muted">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {standards.map((s) => (
                  <tr key={s.id} className="hover:bg-background/50">
                    <td className="px-4 py-3 font-medium text-primary whitespace-nowrap">{s.isNumber}</td>
                    <td className="px-4 py-3">{s.title}</td>
                    <td className="px-4 py-3 text-text-muted hidden md:table-cell">{s.category}</td>
                    <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                    <td className="px-4 py-3 hidden sm:table-cell">{s.year}</td>
                    <td className="px-4 py-3 text-right">
                      <Link to={isAuthenticated ? `/standards/${s.id}` : '/login'}>
                        <Button variant="ghost" size="sm">View Standard</Button>
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
