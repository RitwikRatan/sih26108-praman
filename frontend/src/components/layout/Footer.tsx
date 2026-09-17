import { Link } from 'react-router-dom'
import { Logo } from '../navigation/Logo'
import { theme } from '../../config/theme'

const footerLinks = [
  { to: '/about', label: 'About' },
  { to: '/help', label: 'Help' },
  { to: '#', label: 'Privacy' },
  { to: '#', label: 'Terms' },
  { to: '#', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-text-muted max-w-xs">
              {theme.brand.subtitle}
            </p>
            <p className="mt-2 text-xs text-text-muted">{theme.brand.prototype}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-text-muted hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Workflow</h4>
            <p className="text-sm text-text-muted leading-relaxed">
              Requirement → Extraction → AI Understanding → Semantic Search →
              Recommendation → Related Standards → Report
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-text-muted">
          © {new Date().getFullYear()} {theme.brand.name} — {theme.brand.prototype}. For demonstration purposes only.
        </div>
      </div>
    </footer>
  )
}
