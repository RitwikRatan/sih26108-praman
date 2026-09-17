import type {
  Analysis,
  AnalysisResult,
  DashboardStats,
  ExtractedRequirement,
  Notification,
} from '../types'
import { mockStandardsList } from './mockStandards'

export const mockDashboardStats: DashboardStats = {
  analyses: 24,
  savedStandards: 18,
  reports: 12,
  recentSearches: 8,
}

export const mockAnalyses: Analysis[] = [
  {
    id: 'analysis-1',
    product: 'Industrial Safety Helmet',
    status: 'completed',
    standardsFound: 6,
    createdAt: new Date().toISOString(),
    requirement: 'Industrial safety helmets for construction workers with impact protection and safety requirements.',
  },
  {
    id: 'analysis-2',
    product: 'Electrical Equipment',
    status: 'completed',
    standardsFound: 4,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    requirement: 'Electrical distribution panels for commercial buildings.',
  },
  {
    id: 'analysis-3',
    product: 'Office Furniture',
    status: 'needs-review',
    standardsFound: 3,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    requirement: 'Office chairs and desks for government office procurement.',
  },
  {
    id: 'analysis-4',
    product: 'Fire Extinguishers',
    status: 'processing',
    standardsFound: 0,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
]

const defaultExtracted: ExtractedRequirement = {
  product: 'Industrial Safety Helmet',
  application: 'Construction',
  purpose: 'Worker Protection',
  keyRequirements: ['Impact Protection', 'Industrial Use', 'Safety Compliance'],
  technicalRequirements: 'Helmets must withstand impact from falling objects',
  safetyRequirements: 'Compliance with head protection standards for construction sites',
  quantity: '500 units',
}

export const mockAnalysisResult: AnalysisResult = {
  id: 'analysis-1',
  requirement:
    'Industrial safety helmets for construction workers with impact protection and safety requirements.',
  extracted: defaultExtracted,
  recommendations: [
    {
      id: 'rec-1',
      isNumber: 'IS 2925 : 1984',
      title: 'Industrial Safety Helmets',
      relevance: 'very-high',
      score: 96,
      reasons: ['Product matches', 'Application matches', 'Safety requirement matches', 'Technical requirement matches'],
      matchScores: [
        { category: 'Product match', level: 'high', score: 95 },
        { category: 'Application match', level: 'high', score: 92 },
        { category: 'Safety match', level: 'high', score: 98 },
        { category: 'Technical match', level: 'medium', score: 78 },
      ],
      evidence: [
        {
          id: 'ev-1',
          source: 'Standard document (Demo)',
          section: 'Scope — Clause 1',
          text: 'This standard covers requirements for industrial safety helmets for protection against falling objects.',
          status: 'verified',
        },
      ],
      latestVersion: '1984',
      status: 'Active',
    },
    {
      id: 'rec-2',
      isNumber: 'IS 4151 : 1993',
      title: 'Specification for Industrial Safety Helmets (Revision)',
      relevance: 'very-high',
      score: 94,
      reasons: ['Product matches', 'Updated requirements', 'Safety requirement matches'],
      matchScores: [
        { category: 'Product match', level: 'high', score: 94 },
        { category: 'Application match', level: 'high', score: 90 },
        { category: 'Safety match', level: 'high', score: 96 },
        { category: 'Technical match', level: 'high', score: 85 },
      ],
      evidence: [
        {
          id: 'ev-2',
          source: 'Standard document (Demo)',
          section: 'General — Clause 2',
          text: 'Revised requirements for industrial safety helmets.',
          status: 'verified',
        },
      ],
      latestVersion: '1993',
      status: 'Active',
    },
    {
      id: 'rec-3',
      isNumber: 'IS 2745 : 1983',
      title: 'Non-Metal Helmets for Firemen and Civil Defence Personnel',
      relevance: 'high',
      score: 72,
      reasons: ['Related safety equipment', 'Helmet category match'],
      evidence: [{ id: 'ev-3', source: 'Standard document (Demo)', status: 'verified' }],
      latestVersion: '1983',
      status: 'Active',
    },
    {
      id: 'rec-4',
      isNumber: 'IS 15298-1 : 2011',
      title: 'Personal Eye-Protection — General Requirements',
      relevance: 'medium',
      score: 58,
      reasons: ['Allied PPE standard', 'Often procured together'],
      evidence: [{ id: 'ev-4', source: 'Standard document (Demo)', status: 'verified' }],
      latestVersion: '2011',
      status: 'Active',
    },
    {
      id: 'rec-5',
      isNumber: 'IS 15844 : 2010',
      title: 'High Visibility Warning Clothes for Professional Use',
      relevance: 'medium',
      score: 52,
      reasons: ['Construction site safety', 'Complementary PPE'],
      evidence: [{ id: 'ev-5', source: 'Standard document (Demo)', status: 'verified' }],
      latestVersion: '2010',
      status: 'Active',
    },
    {
      id: 'rec-6',
      isNumber: 'IS 15644 : 2006',
      title: 'Personal Protective Equipment — Helmets for Miners',
      relevance: 'needs-review',
      score: 35,
      reasons: ['Different application context', 'Requires officer review'],
      evidence: [{ id: 'ev-6', source: 'Standard document (Demo)', status: 'unavailable', text: 'Evidence not available in the current knowledge base.' }],
      latestVersion: '2006',
      status: 'Active',
    },
  ],
  relatedStandards: [
    { id: 'std-2', isNumber: 'IS 4151 : 1993', title: 'Industrial Safety Helmets (Revision)', relationship: 'related' },
    { id: 'std-5', isNumber: 'IS 15298-1 : 2011', title: 'Personal Eye-Protection', relationship: 'safety' },
    { id: 'std-3', isNumber: 'IS 2745 : 1983', title: 'Non-Metal Helmets for Firemen', relationship: 'testing' },
    { id: 'std-6', isNumber: 'IS 15844 : 2010', title: 'High Visibility Warning Clothes', relationship: 'related' },
  ],
  specificationCheck: {
    coverage: 78,
    items: [
      { label: 'Product identified', status: 'complete' },
      { label: 'Application identified', status: 'complete' },
      { label: 'Technical requirements', status: 'complete' },
      { label: 'Safety requirements', status: 'complete' },
      { label: 'Testing requirements', status: 'partial' },
      { label: 'Applicable standards', status: 'partial' },
      { label: 'Quantity', status: 'complete' },
    ],
  },
  summary: {
    total: 6,
    highlyRelevant: 3,
    related: 2,
    needsReview: 1,
  },
  status: 'completed',
  createdAt: new Date().toISOString(),
}

export function getMockAnalysisResult(id: string): AnalysisResult | null {
  if (id === 'analysis-1' || id.startsWith('new-')) {
    return { ...mockAnalysisResult, id }
  }
  const analysis = mockAnalyses.find((a) => a.id === id)
  if (!analysis) return null
  return {
    ...mockAnalysisResult,
    id,
    requirement: analysis.requirement ?? mockAnalysisResult.requirement,
    extracted: {
      ...defaultExtracted,
      product: analysis.product,
    },
    status: analysis.status === 'processing' ? 'processing' : analysis.status,
  }
}

export function getMockExtractedRequirement(text: string): ExtractedRequirement {
  if (text.toLowerCase().includes('helmet')) {
    return defaultExtracted
  }
  return {
    product: text.slice(0, 50) || 'Product',
    application: 'General Procurement',
    purpose: 'Standard Compliance',
    keyRequirements: ['Quality standards', 'Safety compliance'],
  }
}

export const mockNotifications: Notification[] = [
  {
    id: 'n-1',
    title: 'Analysis completed',
    message: 'Tender analysis is ready.',
    type: 'success',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'n-2',
    title: 'Report generated',
    message: 'Your standards report is ready.',
    type: 'info',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'n-3',
    title: 'Review needed',
    message: 'One recommendation requires review.',
    type: 'warning',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
]

export { mockStandardsList }
