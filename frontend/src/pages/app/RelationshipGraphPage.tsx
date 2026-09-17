import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../../components/common/Button'
import { RelationshipGraph } from '../../components/standards/RelationshipGraph'
import { SkeletonCard } from '../../components/common/Skeleton'
import { standardsService } from '../../services/standardsService'

export function RelationshipGraphPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: graphData, isLoading } = useQuery({
    queryKey: ['graph', id],
    queryFn: () => standardsService.getRelations(id!),
    enabled: !!id,
  })

  const { data: standard } = useQuery({
    queryKey: ['standard', id],
    queryFn: () => standardsService.getById(id!),
    enabled: !!id,
  })

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Standards Relationship Graph</h1>
        {standard && (
          <p className="text-text-muted mt-1">
            {standard.isNumber} — {standard.title}
          </p>
        )}
      </div>

      {isLoading ? (
        <SkeletonCard />
      ) : graphData ? (
        <RelationshipGraph
          data={graphData}
          onNodeClick={(node) => navigate(`/standards/${node.id}`)}
        />
      ) : null}
    </div>
  )
}
