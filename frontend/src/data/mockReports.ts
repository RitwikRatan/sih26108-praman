import type { Report, ReportDetail } from '../types'
import { mockAnalysisResult } from './mockAnalysis'

export const mockReports: Report[] = [
  {
    id: 'report-1',
    title: 'Procurement Standards Report — Safety Helmets',
    product: 'Industrial Safety Helmet',
    date: new Date().toISOString(),
    status: 'ready',
    analysisId: 'analysis-1',
  },
  {
    id: 'report-2',
    title: 'Procurement Standards Report — Electrical Equipment',
    product: 'Electrical Equipment',
    date: new Date(Date.now() - 86400000).toISOString(),
    status: 'ready',
    analysisId: 'analysis-2',
  },
  {
    id: 'report-3',
    title: 'Procurement Standards Report — Office Furniture',
    product: 'Office Furniture',
    date: new Date(Date.now() - 172800000).toISOString(),
    status: 'draft',
    analysisId: 'analysis-3',
  },
]

export function getMockReportDetail(id: string): ReportDetail | null {
  const report = mockReports.find((r) => r.id === id)
  if (!report) return null

  return {
    ...report,
    requirement: mockAnalysisResult.requirement,
    extracted: mockAnalysisResult.extracted,
    recommendations: mockAnalysisResult.recommendations,
    relatedStandards: mockAnalysisResult.relatedStandards,
    specificationCheck: mockAnalysisResult.specificationCheck,
  }
}
