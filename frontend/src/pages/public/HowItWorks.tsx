import { FileText, Brain, Search, CheckCircle, FileOutput, ArrowDown } from 'lucide-react'
import { Card } from '../../components/common/Card'
import { DemoBanner } from '../../components/common/DemoBanner'

const workflow = [
  { icon: FileText, title: 'Add Requirement', desc: 'Enter a product description or upload a tender document (PDF, DOCX).' },
  { icon: Brain, title: 'AI Extraction & Review', desc: 'AI extracts key requirements. You review and confirm before search.' },
  { icon: Search, title: 'Semantic Standards Search', desc: 'System searches the standards knowledge base by meaning and context.' },
  { icon: CheckCircle, title: 'Review Recommendations', desc: 'See ranked standards with relevance, reasons, and supporting evidence.' },
  { icon: FileOutput, title: 'Generate Report', desc: 'Create a procurement standards report for your records.' },
]

export function HowItWorks() {
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <DemoBanner className="mb-8" />
        <h1 className="text-3xl font-bold mb-4">How It Works</h1>
        <p className="text-lg text-text-muted mb-12">
          A simple workflow designed for procurement officers to find the right Indian Standards.
        </p>

        <div className="space-y-4">
          {workflow.map((step, i) => (
            <div key={step.title}>
              <Card className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary">Step {i + 1}</span>
                  </div>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="text-sm text-text-muted mt-1">{step.desc}</p>
                </div>
              </Card>
              {i < workflow.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="h-5 w-5 text-border" />
                </div>
              )}
            </div>
          ))}
        </div>

        <Card className="mt-12 bg-primary/5 border-primary/20">
          <h3 className="font-semibold mb-2">Complete Workflow</h3>
          <p className="text-sm text-text-muted">
            Requirement → Extraction → AI Understanding → Semantic Search → Recommendation →
            Related Standards → Version/Amendment → Certification → Evidence → Report
          </p>
        </Card>
      </div>
    </div>
  )
}
