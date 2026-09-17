import { Accordion } from '../../components/common/Accordion'
import { DemoBanner } from '../../components/common/DemoBanner'
import { HelpCircle } from 'lucide-react'

const faqs = [
  {
    id: '1',
    question: 'How does the system find standards?',
    answer: 'The system uses AI-assisted semantic understanding to analyze your procurement requirements and search the standards knowledge base by meaning and context, not just keywords. It matches product descriptions, applications, and safety requirements to relevant Indian Standards.',
  },
  {
    id: '2',
    question: 'What documents can I upload?',
    answer: 'You can upload tender documents in PDF or DOCX format (up to 10 MB). The system will extract requirements automatically for your review before searching for standards.',
  },
  {
    id: '3',
    question: 'Can I search by product description?',
    answer: 'Yes. You do not need to know the exact IS number. Simply describe the product or requirement in natural language, such as "Safety helmets for construction workers".',
  },
  {
    id: '4',
    question: 'What does "Very High Match" mean?',
    answer: 'Very High Match indicates strong alignment between your procurement requirement and the standard across product type, application, safety, and technical requirements. It is a guidance indicator — not a legal determination.',
  },
  {
    id: '5',
    question: 'How are related standards identified?',
    answer: 'Related standards include testing standards, safety standards, normative references, and installation standards connected to the main recommended standard. These are identified from the standards knowledge base relationships.',
  },
  {
    id: '6',
    question: 'Can I download a report?',
    answer: 'Yes. After completing an analysis, you can generate and download a Procurement Standards Report containing all recommendations, evidence, and specification checks.',
  },
  {
    id: '7',
    question: 'Does AI make the final procurement decision?',
    answer: 'No. The AI provides assisted recommendations based on available data. The procurement authority must review all recommendations and make the final determination. This is clearly indicated throughout the application.',
  },
]

export function Help() {
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <DemoBanner className="mb-8" />
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Help & FAQ</h1>
        </div>
        <p className="text-text-muted mb-8">
          Common questions about using StandardsAI for procurement standards discovery.
        </p>
        <Accordion items={faqs} />
      </div>
    </div>
  )
}
