import type { Report, ReportDetail } from '../types'
import { env } from '../config/env'
import { api, delay } from './api'
import { mockReports, getMockReportDetail } from '../data/mockReports'

export const reportService = {
  async getReports(): Promise<Report[]> {
    if (env.useMock) {
      await delay(500)
      return mockReports
    }
    return api.get<Report[]>('/reports')
  },

  async getReport(id: string): Promise<ReportDetail> {
    if (env.useMock) {
      await delay(400)
      const report = getMockReportDetail(id)
      if (!report) throw new Error('Report not found')
      return report
    }
    return api.get<ReportDetail>(`/reports/${id}`)
  },

  async createReport(analysisId: string): Promise<Report> {
    if (env.useMock) {
      await delay(1000)
      return {
        id: `report-${Date.now()}`,
        title: 'Procurement Standards Report',
        product: 'Industrial Safety Helmet',
        date: new Date().toISOString(),
        status: 'ready',
        analysisId,
      }
    }
    return api.post<Report>('/reports', { analysisId })
  },

  async downloadReport(id: string): Promise<void> {
    if (env.useMock) {
      await delay(800)
      return
    }
    window.open(`${import.meta.env.VITE_API_BASE_URL}/reports/${id}/download`, '_blank')
  },

  async deleteReport(id: string): Promise<void> {
    if (env.useMock) {
      await delay(400)
      return
    }
    await api.delete(`/reports/${id}`)
  },
}
