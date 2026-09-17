import { useEffect, useRef, useState, useCallback } from 'react'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import type { GraphData, GraphNode } from '../../types'
import { Button } from '../common/Button'
import { cn } from '../../utils/cn'

const typeColors: Record<string, string> = {
  main: 'border-primary bg-primary/5 ring-2 ring-primary/20',
  testing: 'border-blue-300',
  safety: 'border-green-300',
  reference: 'border-purple-300',
  installation: 'border-orange-300',
  related: 'border-gray-300',
}

interface RelationshipGraphProps {
  data: GraphData
  onNodeClick?: (node: GraphNode) => void
  selectedId?: string
}

export function RelationshipGraph({ data, onNodeClick, selectedId }: RelationshipGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const childNodes = data.nodes.filter((n) => n.type !== 'main')

  const layoutNodes = data.nodes.map((node, i) => {
    if (node.type === 'main') return { ...node, x: 300, y: 80 }
    const angle = ((i - 1) / Math.max(childNodes.length, 1)) * Math.PI * 1.5 - Math.PI / 4
    const radius = 180
    return {
      ...node,
      x: 300 + Math.cos(angle) * radius,
      y: 200 + Math.sin(angle) * radius * 0.8,
    }
  })

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-node]')) return
    setDragging(true)
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging) return
      setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
    },
    [dragging, dragStart],
  )

  const handleMouseUp = useCallback(() => setDragging(false), [])

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [dragging, handleMouseMove, handleMouseUp])

  const resetView = () => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  return (
    <div className="space-y-4">
      <div className="hidden md:block">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-text-muted">Interactive standards relationship graph</p>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => setScale((s) => Math.min(s + 0.2, 2))} aria-label="Zoom in">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setScale((s) => Math.max(s - 0.2, 0.5))} aria-label="Zoom out">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={resetView} aria-label="Reset view">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div
          ref={containerRef}
          className="relative h-[400px] overflow-hidden rounded-lg border border-border bg-background cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, transformOrigin: 'center' }}
          >
            {data.edges.map((edge, i) => {
              const from = layoutNodes.find((n) => n.id === edge.from)
              const to = layoutNodes.find((n) => n.id === edge.to)
              if (!from?.x || !to?.x) return null
              return (
                <motion.line
                  key={i}
                  x1={from.x}
                  y1={from.y! + 30}
                  x2={to.x}
                  y2={to.y! + 20}
                  stroke="#CBD5E1"
                  strokeWidth={2}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                />
              )
            })}
          </svg>
          <div
            className="absolute inset-0"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, transformOrigin: 'center' }}
          >
            {layoutNodes.map((node, i) => (
              <motion.div
                key={node.id}
                data-node
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  'absolute w-[160px] -translate-x-1/2 rounded-lg border bg-surface p-3 shadow-sm cursor-pointer transition-all hover:shadow-md',
                  typeColors[node.type] ?? 'border-border',
                  selectedId === node.id && 'ring-2 ring-primary',
                )}
                style={{ left: node.x, top: node.y }}
                onClick={() => onNodeClick?.(node)}
              >
                <p className="text-xs font-semibold text-primary truncate">{node.isNumber}</p>
                <p className="text-xs text-text mt-0.5 line-clamp-2">{node.label}</p>
                {node.type !== 'main' && (
                  <span className="mt-1 inline-block text-[10px] uppercase tracking-wide text-text-muted">
                    {node.type}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile list alternative */}
      <div className="md:hidden space-y-3">
        <p className="text-sm font-medium">Standards Relationships</p>
        {layoutNodes.map((node) => (
          <div
            key={node.id}
            className={cn(
              'rounded-lg border bg-surface p-4 cursor-pointer',
              node.type === 'main' ? 'border-primary' : 'border-border',
            )}
            onClick={() => onNodeClick?.(node)}
          >
            <p className="text-sm font-semibold text-primary">{node.isNumber}</p>
            <p className="text-sm text-text">{node.label}</p>
            <Badge type={node.type} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Badge({ type }: { type: string }) {
  if (type === 'main') return <span className="text-xs text-primary font-medium mt-1 inline-block">Main Standard</span>
  return <span className="text-xs text-text-muted uppercase mt-1 inline-block">{type}</span>
}
