import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { PublicLayout } from '../layouts/PublicLayout'
import { AppLayout } from '../layouts/AppLayout'
import { ProtectedRoute } from './ProtectedRoute'
import { Skeleton } from '../components/common/Skeleton'

const Home = lazy(() => import('../pages/public/Home').then((m) => ({ default: m.Home })))
const About = lazy(() => import('../pages/public/About').then((m) => ({ default: m.About })))
const HowItWorks = lazy(() => import('../pages/public/HowItWorks').then((m) => ({ default: m.HowItWorks })))
const Standards = lazy(() => import('../pages/public/Standards').then((m) => ({ default: m.StandardsExplorer })))
const Help = lazy(() => import('../pages/public/Help').then((m) => ({ default: m.Help })))
const Login = lazy(() => import('../pages/public/Login').then((m) => ({ default: m.Login })))

const Dashboard = lazy(() => import('../pages/app/Dashboard').then((m) => ({ default: m.Dashboard })))
const Analyze = lazy(() => import('../pages/app/Analyze').then((m) => ({ default: m.Analyze })))
const AnalysisResult = lazy(() => import('../pages/app/AnalysisResult').then((m) => ({ default: m.AnalysisResult })))
const StandardDetails = lazy(() => import('../pages/app/StandardDetails').then((m) => ({ default: m.StandardDetails })))
const RelationshipGraphPage = lazy(() => import('../pages/app/RelationshipGraphPage').then((m) => ({ default: m.RelationshipGraphPage })))
const Reports = lazy(() => import('../pages/app/Reports').then((m) => ({ default: m.Reports })))
const ReportDetail = lazy(() => import('../pages/app/ReportDetail').then((m) => ({ default: m.ReportDetail })))
const History = lazy(() => import('../pages/app/History').then((m) => ({ default: m.History })))
const Profile = lazy(() => import('../pages/app/Profile').then((m) => ({ default: m.Profile })))
const Settings = lazy(() => import('../pages/app/Settings').then((m) => ({ default: m.Settings })))

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <Skeleton className="h-8 w-48" />
    </div>
  )
}

function LazyPage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <LazyPage><Home /></LazyPage> },
      { path: '/about', element: <LazyPage><About /></LazyPage> },
      { path: '/how-it-works', element: <LazyPage><HowItWorks /></LazyPage> },
      { path: '/standards', element: <LazyPage><Standards /></LazyPage> },
      { path: '/help', element: <LazyPage><Help /></LazyPage> },
      { path: '/login', element: <LazyPage><Login /></LazyPage> },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/dashboard', element: <LazyPage><Dashboard /></LazyPage> },
      { path: '/analyze', element: <LazyPage><Analyze /></LazyPage> },
      { path: '/analysis/:id/results', element: <LazyPage><AnalysisResult /></LazyPage> },
      { path: '/standards/:id', element: <LazyPage><StandardDetails /></LazyPage> },
      { path: '/standards/:id/graph', element: <LazyPage><RelationshipGraphPage /></LazyPage> },
      { path: '/analysis/:id/graph', element: <LazyPage><RelationshipGraphPage /></LazyPage> },
      { path: '/reports', element: <LazyPage><Reports /></LazyPage> },
      { path: '/reports/:id', element: <LazyPage><ReportDetail /></LazyPage> },
      { path: '/history', element: <LazyPage><History /></LazyPage> },
      { path: '/profile', element: <LazyPage><Profile /></LazyPage> },
      { path: '/settings', element: <LazyPage><Settings /></LazyPage> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
