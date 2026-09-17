export type Relevance = 'very-high' | 'high' | 'medium' | 'low' | 'needs-review'

export type AnalysisStatus = 'completed' | 'processing' | 'needs-review' | 'draft'

export type RelationshipType =
  | 'testing'
  | 'safety'
  | 'installation'
  | 'normative-reference'
  | 'related'

export interface Evidence {
  id: string
  source: string
  section?: string
  text?: string
  status: 'verified' | 'unavailable'
}

export interface MatchScore {
  category: string
  level: 'high' | 'medium' | 'low'
  score: number
}

export interface StandardRecommendation {
  id: string
  isNumber: string
  title: string
  relevance: Relevance
  score?: number
  reasons: string[]
  matchScores?: MatchScore[]
  evidence: Evidence[]
  latestVersion?: string
  status?: string
  category?: string
  year?: string
}

export interface RelatedStandard {
  id: string
  isNumber: string
  title: string
  relationship: RelationshipType
}

export interface StandardVersion {
  year: string
  label: string
  type: 'original' | 'revision' | 'amendment' | 'latest'
  description?: string
}

export interface CertificationInfo {
  type: string
  status: 'available' | 'not-identified' | 'not-applicable'
  description?: string
  isMandatory?: boolean
}

export interface StandardDetail extends StandardRecommendation {
  overview?: string
  scope?: string
  keyRequirements?: string[]
  clauses?: { number: string; title: string; description?: string }[]
  relatedStandards: RelatedStandard[]
  versions: StandardVersion[]
  certification: CertificationInfo[]
  sources?: { name: string; url?: string; status: string }[]
}

export interface ExtractedRequirement {
  product?: string
  application?: string
  purpose?: string
  keyRequirements?: string[]
  technicalRequirements?: string
  safetyRequirements?: string
  quantity?: string
}

export interface SpecificationCheck {
  coverage: number
  items: {
    label: string
    status: 'complete' | 'partial' | 'missing'
  }[]
}

export interface AnalysisResult {
  id: string
  requirement: string
  extracted: ExtractedRequirement
  recommendations: StandardRecommendation[]
  relatedStandards: RelatedStandard[]
  specificationCheck: SpecificationCheck
  summary: {
    total: number
    highlyRelevant: number
    related: number
    needsReview: number
  }
  status: AnalysisStatus
  createdAt: string
}

export interface Analysis {
  id: string
  product: string
  status: AnalysisStatus
  standardsFound: number
  createdAt: string
  requirement?: string
}

export interface Report {
  id: string
  title: string
  product: string
  date: string
  status: 'ready' | 'draft' | 'processing'
  analysisId?: string
}

export interface ReportDetail extends Report {
  requirement: string
  extracted: ExtractedRequirement
  recommendations: StandardRecommendation[]
  relatedStandards: RelatedStandard[]
  specificationCheck: SpecificationCheck
}

export interface StandardListItem {
  id: string
  isNumber: string
  title: string
  category: string
  status: string
  year: string
  type?: string
}

export interface User {
  id: string
  name: string
  email: string
  organization: string
  role: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface DashboardStats {
  analyses: number
  savedStandards: number
  reports: number
  recentSearches: number
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning'
  read: boolean
  createdAt: string
}

export interface GraphNode {
  id: string
  label: string
  isNumber: string
  type: 'main' | 'testing' | 'safety' | 'reference' | 'installation' | 'related'
  x?: number
  y?: number
}

export interface GraphEdge {
  from: string
  to: string
  label?: string
}

export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export interface StructuredInput {
  product?: string
  purpose?: string
  application?: string
  technicalRequirements?: string
  safetyRequirements?: string
  quantity?: string
}

export interface TextAnalysisRequest {
  requirement: string
  structured?: StructuredInput
}

export interface AnalysisProgressStep {
  id: string
  label: string
  status: 'pending' | 'active' | 'completed'
}
