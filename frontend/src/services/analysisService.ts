import type {
  Analysis,
  AnalysisResult,
  DashboardStats,
  ExtractedRequirement,
  TextAnalysisRequest,
} from '../types'
import { env } from '../config/env'
import { api, delay } from './api'
import {
  mockAnalyses,
  mockAnalysisResult,
  mockDashboardStats,
  getMockAnalysisResult,
  getMockExtractedRequirement,
} from '../data/mockAnalysis'

export const analysisService = {
  async getDashboardStats(): Promise<DashboardStats> {
    if (env.useMock) {
      await delay(400)
      return mockDashboardStats
    }
    return api.get<DashboardStats>('/dashboard/stats')
  },

  async getAnalyses(): Promise<Analysis[]> {
    if (env.useMock) {
      await delay(500)
      return mockAnalyses
    }
    return api.get<Analysis[]>('/analysis')
  },

  async getAnalysis(id: string): Promise<AnalysisResult> {
    if (env.useMock) {
      await delay(400)
      const result = getMockAnalysisResult(id)
      if (!result) throw new Error('Analysis not found')
      return result
    }
    return api.get<AnalysisResult>(`/analysis/${id}`)
  },

  async extractRequirements(text: string): Promise<ExtractedRequirement> {
    if (env.useMock) {
      await delay(1500)
      return getMockExtractedRequirement(text)
    }
    return api.post<ExtractedRequirement>('/analysis/extract', { requirement: text })
  },

  async analyzeText(data: TextAnalysisRequest): Promise<AnalysisResult> {
    if (env.useMock) {
      await delay(2000)
      const id = `new-${Date.now()}`
      return { ...mockAnalysisResult, id, requirement: data.requirement }
    }
    return api.post<AnalysisResult>('/analysis/text', data)
  },

  async uploadDocument(file: File): Promise<{ id: string; extracted: ExtractedRequirement }> {
    if (env.useMock) {
      await delay(2500)
      return {
        id: `upload-${Date.now()}`,
        extracted: getMockExtractedRequirement('uploaded document'),
      }
    }
    const formData = new FormData()
    formData.append('file', file)
    return api.postForm('/analysis/upload', formData)
  },

  async runAnalysis(id: string, extracted: ExtractedRequirement): Promise<AnalysisResult> {
    if (env.useMock) {
      await delay(2500)
      return {
        ...mockAnalysisResult,
        id,
        extracted,
      }
    }
    return api.post<AnalysisResult>(`/analysis/${id}/run`, { extracted })
  },
}
