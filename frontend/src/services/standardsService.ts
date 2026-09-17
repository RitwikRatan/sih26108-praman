import type { GraphData, StandardDetail, StandardListItem } from '../types'
import { env } from '../config/env'
import { api, delay } from './api'
import {
  mockStandardsList,
  getMockStandardDetail,
  getMockGraphData,
} from '../data/mockStandards'

export const standardsService = {
  async search(query?: string, filters?: Record<string, string>): Promise<StandardListItem[]> {
    if (env.useMock) {
      await delay(600)
      let results = [...mockStandardsList]
      if (query) {
        const q = query.toLowerCase()
        results = results.filter(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.isNumber.toLowerCase().includes(q) ||
            s.category.toLowerCase().includes(q),
        )
      }
      if (filters?.category) {
        results = results.filter((s) => s.category === filters.category)
      }
      if (filters?.status) {
        results = results.filter((s) => s.status === filters.status)
      }
      return results
    }
    const params = new URLSearchParams({ ...(query ? { q: query } : {}), ...filters })
    return api.get<StandardListItem[]>(`/standards?${params}`)
  },

  async getById(id: string): Promise<StandardDetail> {
    if (env.useMock) {
      await delay(500)
      const detail = getMockStandardDetail(id)
      if (!detail) throw new Error('Standard not found')
      return detail
    }
    return api.get<StandardDetail>(`/standards/${id}`)
  },

  async getRelations(id: string): Promise<GraphData> {
    if (env.useMock) {
      await delay(400)
      return getMockGraphData(id)
    }
    return api.get<GraphData>(`/standards/${id}/relations`)
  },

  async getVersions(id: string) {
    if (env.useMock) {
      await delay(300)
      const detail = getMockStandardDetail(id)
      return detail?.versions ?? []
    }
    return api.get(`/standards/${id}/versions`)
  },
}
