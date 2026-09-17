import { Link, useLocation } from 'react-router-dom'
import { Search, Bell, User, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Logo } from './Logo'
import { Button } from '../common/Button'
import { cn } from '../../utils/cn'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { languages } from '../../i18n/translations'
import { mockNotifications } from '../../data/mockAnalysis'

const publicLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/standards', label: 'Standards' },
  { to: '/help', label: 'Help' },
]

const appLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/analyze', label: 'Analyze' },
  { to: '/standards', label: 'Standards' },
  { to: '/reports', label: 'Reports' },
]

export function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { language, setLanguage } = useLanguage()

  return (
    <header className="sticky top-0 z-50 border-b border-border glass-navbar shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo showSubtitle />

        <nav className="hidden md:flex items-center gap-1.5" aria-label="Main navigation">
          {publicLinks.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive
                    ? 'text-primary bg-primary/10 font-semibold shadow-xs'
                    : 'text-text-muted hover:text-text hover:bg-surface-hover',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as typeof language)}
            className="h-9 rounded-lg border border-border bg-surface px-2.5 text-sm transition-colors hover:border-primary/50 focus:border-primary cursor-pointer shadow-xs"
            aria-label="Language"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
          <Link to="/standards" className="p-2 text-text-muted hover:text-primary transition-colors rounded-lg hover:bg-surface-hover" aria-label="Search">
            <Search className="h-5 w-5" />
          </Link>
          <Link to="/login">
            <Button size="sm" className="shadow-xs hover-lift">Login</Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-text-muted hover:bg-surface-hover transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-surface/95 backdrop-blur-md px-4 py-4 space-y-1.5 animate-slide-up">
          {publicLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-surface-hover transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/login" onClick={() => setMobileOpen(false)} className="block pt-2">
            <Button className="w-full">Login</Button>
          </Link>
        </nav>
      )}
    </header>
  )
}

export function AppNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()
  const unread = mockNotifications.filter((n) => !n.read).length

  return (
    <header className="sticky top-0 z-50 border-b border-border glass-navbar shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo showSubtitle />

        <nav className="hidden md:flex items-center gap-1.5" aria-label="App navigation">
          {appLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.to)
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive
                    ? 'text-primary bg-primary/10 font-semibold shadow-xs'
                    : 'text-text-muted hover:text-text hover:bg-surface-hover',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/standards" className="p-2 text-text-muted hover:text-primary transition-colors rounded-lg hover:bg-surface-hover" aria-label="Search">
            <Search className="h-5 w-5" />
          </Link>
          <div className="relative">
            <button
              className="relative p-2 text-text-muted hover:text-primary transition-colors rounded-lg hover:bg-surface-hover"
              onClick={() => setNotifOpen(!notifOpen)}
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-error border-2 border-surface animate-pulse-subtle" />
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border bg-surface shadow-xl z-50 animate-scale-in overflow-hidden">
                <div className="p-3.5 border-b border-border font-semibold text-sm bg-surface-hover/50 flex justify-between items-center">
                  <span>Notifications</span>
                  {unread > 0 && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                      {unread} new
                    </span>
                  )}
                </div>
                {mockNotifications.map((n) => (
                  <div key={n.id} className="px-4 py-3 border-b border-border-subtle last:border-0 hover:bg-surface-hover/70 transition-colors">
                    <p className="text-sm font-medium text-text">{n.title}</p>
                    <p className="text-xs text-text-muted mt-0.5">{n.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link to="/profile" className="flex items-center gap-2.5 p-1.5 pr-3 rounded-lg hover:bg-surface-hover transition-colors">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <User className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-semibold hidden lg:block text-text">{user?.name?.split(' ')[0]}</span>
          </Link>
        </div>

        <button className="md:hidden p-2 rounded-lg text-text-muted hover:bg-surface-hover transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-surface/95 backdrop-blur-md px-4 py-4 space-y-1.5 animate-slide-up">
          {appLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-surface-hover transition-colors">
              {link.label}
            </Link>
          ))}
          <Link to="/profile" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-text-muted hover:text-text">Profile</Link>
          <button onClick={logout} className="block w-full text-left px-3 py-2 text-sm font-medium text-error hover:bg-error-light/50 rounded-lg transition-colors">Logout</button>
        </nav>
      )}
    </header>
  )
}

export function MobileBottomNav() {
  const location = useLocation()
  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/analyze', label: 'Analyze' },
    { to: '/standards', label: 'Standards' },
    { to: '/reports', label: 'Reports' },
    { to: '/profile', label: 'Profile' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface" aria-label="Mobile navigation">
      <div className="flex">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              'flex-1 py-3 text-center text-xs font-medium transition-colors',
              location.pathname.startsWith(link.to) ? 'text-primary' : 'text-text-muted',
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
