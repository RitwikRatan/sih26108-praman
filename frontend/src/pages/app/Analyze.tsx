import { useState, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronDown, ChevronUp, FileText, Upload } from 'lucide-react'
import { Button } from '../../components/common/Button'
import { Card } from '../../components/common/Card'
import { Textarea } from '../../components/common/Textarea'
import { Input } from '../../components/common/Input'
import { FileUpload } from '../../components/common/FileUpload'
import { StepProgress } from '../../components/common/Progress'
import { ExtractionReview } from '../../components/analysis/ExtractionReview'
import { analysisService } from '../../services/analysisService'
import { useToast } from '../../context/ToastContext'
import type { ExtractedRequirement, AnalysisProgressStep } from '../../types'
import { cn } from '../../utils/cn'

type Step = 'requirement' | 'review' | 'analyzing'

const analysisSteps: AnalysisProgressStep[] = [
  { id: '1', label: 'Reading requirement', status: 'pending' },
  { id: '2', label: 'Understanding product', status: 'pending' },
  { id: '3', label: 'Searching standards', status: 'pending' },
  { id: '4', label: 'Comparing standards', status: 'pending' },
  { id: '5', label: 'Checking related standards', status: 'pending' },
  { id: '6', label: 'Preparing results', status: 'pending' },
]

const uploadSteps = [
  'Reading document',
  'Finding requirements',
  'Understanding product',
  'Preparing standards search',
]

export function Analyze() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<'text' | 'upload'>(searchParams.get('tab') === 'upload' ? 'upload' : 'text')
  const [step, setStep] = useState<Step>('requirement')
  const [requirement, setRequirement] = useState(
    'Industrial safety helmets for construction workers with impact protection and safety requirements.',
  )
  const [showDetails, setShowDetails] = useState(false)
  const [structured, setStructured] = useState({
    product: '', purpose: '', application: '', technicalRequirements: '', safetyRequirements: '', quantity: '',
  })
  const [extracted, setExtracted] = useState<ExtractedRequirement | null>(null)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progressSteps, setProgressSteps] = useState(analysisSteps)
  const [uploadStepIndex, setUploadStepIndex] = useState(-1)
  const navigate = useNavigate()
  const { toast } = useToast()

  const stepIndicator = [
    { id: '1', label: 'Requirement', active: step === 'requirement' },
    { id: '2', label: 'Review', active: step === 'review' },
    { id: '3', label: 'Results', active: false },
    { id: '4', label: 'Report', active: false },
  ]

  const runProgressAnimation = useCallback(async (steps: AnalysisProgressStep[]) => {
    const updated = [...steps]
    for (let i = 0; i < updated.length; i++) {
      updated[i] = { ...updated[i], status: 'active' }
      setProgressSteps([...updated])
      await new Promise((r) => setTimeout(r, 400))
      updated[i] = { ...updated[i], status: 'completed' }
      setProgressSteps([...updated])
    }
  }, [])

  const handleExtract = async () => {
    if (!requirement.trim()) {
      toast('Please enter a requirement', 'warning')
      return
    }
    setLoading(true)
    try {
      const result = await analysisService.extractRequirements(requirement)
      setExtracted(result)
      setStep('review')
    } catch {
      toast('Unable to extract requirements', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (file: File) => {
    setUploadStepIndex(0)
    const interval = setInterval(() => {
      setUploadStepIndex((i) => Math.min(i + 1, uploadSteps.length - 1))
    }, 600)

    try {
      const result = await analysisService.uploadDocument(file)
      clearInterval(interval)
      setUploadStepIndex(uploadSteps.length - 1)
      setExtracted(result.extracted)
      setRequirement(`Uploaded: ${file.name}`)
      setTimeout(() => setStep('review'), 500)
    } catch {
      clearInterval(interval)
      toast('Unable to upload file', 'error')
    }
  }

  const handleConfirm = async () => {
    if (!extracted) return
    setStep('analyzing')
    setProgressSteps(analysisSteps.map((s) => ({ ...s, status: 'pending' })))

    const progressPromise = runProgressAnimation(analysisSteps)
    const analysisPromise = analysisService.analyzeText({ requirement, structured })

    try {
      const [result] = await Promise.all([analysisPromise, progressPromise])
      toast('Analysis completed', 'success')
      navigate(`/analysis/${result.id}/results`)
    } catch {
      toast('We couldn\'t complete the analysis', 'error')
      setStep('review')
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analyze Requirement</h1>
        <p className="text-text-muted mt-1">Enter your procurement requirement or upload a tender document.</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {stepIndicator.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 shrink-0">
            <span className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium',
              s.active ? 'bg-primary text-white' : 'bg-gray-100 text-text-muted',
            )}>
              {s.id}
            </span>
            <span className={cn('text-sm', s.active ? 'font-medium text-primary' : 'text-text-muted')}>
              {s.label}
            </span>
            {i < stepIndicator.length - 1 && <span className="text-text-muted mx-1">→</span>}
          </div>
        ))}
      </div>

      {step === 'requirement' && (
        <>
          <div className="flex gap-2 border-b border-border">
            {[
              { id: 'text' as const, label: 'Write Requirement', icon: FileText },
              { id: 'upload' as const, label: 'Upload Tender', icon: Upload },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors',
                  activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text',
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'text' ? (
            <Card>
              <Textarea
                label="Requirement"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder="Describe the product or procurement requirement..."
                className="min-h-[160px]"
              />

              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1 text-sm text-primary mt-4 hover:underline"
              >
                More details
                {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {showDetails && (
                <div className="grid gap-4 sm:grid-cols-2 mt-4 pt-4 border-t border-border">
                  {(['product', 'purpose', 'application', 'quantity'] as const).map((field) => (
                    <Input
                      key={field}
                      label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                      value={structured[field]}
                      onChange={(e) => setStructured({ ...structured, [field]: e.target.value })}
                    />
                  ))}
                  <div className="sm:col-span-2">
                    <Textarea
                      label="Technical Requirements"
                      value={structured.technicalRequirements}
                      onChange={(e) => setStructured({ ...structured, technicalRequirements: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Textarea
                      label="Safety Requirements"
                      value={structured.safetyRequirements}
                      onChange={(e) => setStructured({ ...structured, safetyRequirements: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <Button className="mt-6" onClick={handleExtract} isLoading={loading}>
                Continue to Review
              </Button>
            </Card>
          ) : (
            <Card>
              <FileUpload onFileSelect={handleUpload} />
              {uploadStepIndex >= 0 && (
                <div className="mt-6 space-y-3">
                  <p className="text-sm font-medium">Analyzing document...</p>
                  {uploadSteps.map((label, i) => (
                    <div key={label} className="flex items-center gap-3 text-sm">
                      <span className={cn(
                        'h-5 w-5 flex items-center justify-center rounded-full text-xs',
                        i < uploadStepIndex ? 'bg-success text-white' : i === uploadStepIndex ? 'bg-primary text-white' : 'border border-gray-200',
                      )}>
                        {i < uploadStepIndex ? '✓' : i === uploadStepIndex ? '•' : '○'}
                      </span>
                      {label}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
        </>
      )}

      {step === 'review' && extracted && (
        <Card>
          <h2 className="text-lg font-semibold mb-4">We found these requirements</h2>
          <ExtractionReview
            extracted={extracted}
            editable={editing}
            onChange={setExtracted}
          />
          <div className="flex gap-3 mt-6">
            <Button onClick={handleConfirm}>Confirm & Find Standards</Button>
            <Button variant="outline" onClick={() => setEditing(!editing)}>
              {editing ? 'Done Editing' : 'Edit'}
            </Button>
            <Button variant="ghost" onClick={() => setStep('requirement')}>Back</Button>
          </div>
        </Card>
      )}

      {step === 'analyzing' && (
        <Card>
          <h2 className="text-lg font-semibold mb-6">Analyzing your requirement</h2>
          <StepProgress steps={progressSteps} />
        </Card>
      )}
    </div>
  )
}
