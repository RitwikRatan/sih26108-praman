import type { LoginCredentials, User } from '../types'
import { env } from '../config/env'
import { api, delay } from './api'

const MOCK_USER: User = {
  id: 'user-1',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@praman.in',
  organization: 'Central Procurement Division',
  role: 'Procurement Officer',
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    if (env.useMock) {
      await delay(800)
      if (!credentials.email || !credentials.password) {
        throw new Error('Please enter email and password')
      }
      localStorage.setItem('standardsai_token', 'mock-token-demo')
      localStorage.setItem('standardsai_user', JSON.stringify(MOCK_USER))
      return MOCK_USER
    }

    const response = await api.post<{ user: User; token: string }>('/auth/login', credentials)
    localStorage.setItem('standardsai_token', response.token)
    localStorage.setItem('standardsai_user', JSON.stringify(response.user))
    return response.user
  },

  logout() {
    localStorage.removeItem('standardsai_token')
    localStorage.removeItem('standardsai_user')
  },

  getStoredUser(): User | null {
    const stored = localStorage.getItem('standardsai_user')
    if (!stored) return null
    try {
      return JSON.parse(stored) as User
    } catch {
      return null
    }
  },
}
