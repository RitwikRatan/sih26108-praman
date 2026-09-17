import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search, Upload, Network, FileCheck, Shield, Eye, Award, ChevronRight,
  ArrowRight, Zap, Target, RefreshCw, FileText,
} from 'lucide-react'
import { Button } from '../../components/common/Button'
import { Card } from '../../components/common/Card'
import { useLanguage } from '../../context/LanguageContext'
import { mockStandardsList } from '../../data/mockStandards'

const features = [
  { icon: Search, title: 'AI Standard Search', desc: 'Find standards using natural language descriptions' },
  { icon: Upload, title: 'Tender Analysis', desc: 'Upload tender documents for automatic requirement extraction' },
  { icon: Network, title: 'Related Standards', desc: 'Discover allied, testing, and safety standards' },
  { icon: RefreshCw, title: 'Latest Versions', desc: 'View current versions and amendment information' },
  { icon: Eye, title: 'Evidence & Reasons', desc: 'Understand why each standard was recommended' },
  { icon: Award, title: 'Certification Guidance', desc: 'Get certification information where available' },
]

const benefits = [
  { icon: Zap, title: 'Faster search', desc: 'Find relevant standards in minutes, not hours' },
  { icon: Target, title: 'Better coverage', desc: 'Discover standards you might have missed' },
  { icon: RefreshCw, title: 'Current information', desc: 'Latest versions and amendments' },
  { icon: FileCheck, title: 'Clear evidence', desc: 'Evidence-backed recommendations' },
]

function HeroVisual() {
  const steps = [
    { label: 'Procurement Requirement', color: 'bg-primary/10 border-primary/30' },
    { label: 'AI Analysis', color: 'bg-secondary/10 border-secondary/30' },
    { label: 'Recommended Standards', color: 'bg-success/10 border-green-300' },
    { label: 'Evidence & Related Standards', color: 'bg-warning/10 border-orange-300' },
  ]

  return (
    <div className="relative hidden lg:block">
      <div className="space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className={`rounded-lg border p-4 ${step.color}`}
          >
            <p className="text-sm font-medium text-text">{step.label}</p>
          </motion.div>
        ))}
      </div>
      <svg className="absolute -left-8 top-0 h-full w-8 opacity-30" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <motion.line
            key={i}
            x1="16"
            y1={40 + i * 72}
            x2="16"
            y2={80 + i * 72}
            stroke="#0B5CAD"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
          />
        ))}
      </svg>
    </div>
  )
}

export function Home() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Hero */}
      <section className="bg-surface border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                SIH26108 Prototype
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text leading-tight">
                {t.home.heroTitle}
              </h1>
              <p className="mt-4 text-lg text-text-muted leading-relaxed max-w-xl">
                {t.home.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/login">
                  <Button size="lg">
                    {t.home.analyzeRequirement}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/standards">
                  <Button variant="outline" size="lg">{t.home.exploreStandards}</Button>
                </Link>
              </div>
            </motion.div>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">{t.home.howItWorks}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '1', title: t.home.step1, icon: FileText },
              { step: '2', title: t.home.step2, icon: Search },
              { step: '3', title: t.home.step3, icon: Eye },
              { step: '4', title: t.home.step4, icon: FileCheck },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold mb-4">
                    {item.step}
                  </div>
                  <item.icon className="h-6 w-6 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold">{item.title}</h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">{t.home.keyFeatures}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card hover className="h-full">
                  <f.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-text-muted">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Helps */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">{t.home.whyItHelps}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <b.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{b.title}</h3>
                <p className="text-sm text-text-muted mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards Preview */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{t.home.standardsPreview}</h2>
            <Link to="/standards" className="text-sm text-primary flex items-center gap-1 hover:underline">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-xs text-text-muted mb-4">{t.home.demoNotice}</p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-background">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-text-muted">IS Number</th>
                  <th className="px-4 py-3 text-left font-medium text-text-muted">Title</th>
                  <th className="px-4 py-3 text-left font-medium text-text-muted hidden sm:table-cell">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-text-muted">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-surface">
                {mockStandardsList.slice(0, 5).map((s) => (
                  <tr key={s.id} className="hover:bg-background/50">
                    <td className="px-4 py-3 font-medium text-primary">{s.isNumber}</td>
                    <td className="px-4 py-3">{s.title}</td>
                    <td className="px-4 py-3 text-text-muted hidden sm:table-cell">{s.category}</td>
                    <td className="px-4 py-3"><span className="text-success text-xs font-medium">{s.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">{t.home.finalCta}</h2>
          <Link to="/login">
            <Button size="lg">{t.home.startAnalysis}</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
