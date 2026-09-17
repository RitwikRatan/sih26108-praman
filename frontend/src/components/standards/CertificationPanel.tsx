import type { CertificationInfo } from '../../types'
import { CheckCircle, XCircle, MinusCircle } from 'lucide-react'
import { Card } from '../common/Card'

const statusConfig = {
  available: { icon: CheckCircle, color: 'text-success', label: 'Information available' },
  'not-identified': { icon: MinusCircle, color: 'text-text-muted', label: 'Not identified for this requirement' },
  'not-applicable': { icon: XCircle, color: 'text-text-muted', label: 'Not applicable' },
}

export function CertificationPanel({ certification }: { certification: CertificationInfo[] }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Certification</h3>
      <div className="space-y-4">
        {certification.map((cert) => {
          const config = statusConfig[cert.status]
          const Icon = config.icon
          return (
            <div key={cert.type} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
              <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${config.color}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-text">{cert.type}</p>
                  {cert.isMandatory && (
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-error/10 text-error border border-error/20">
                      Mandatory
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-muted mt-1">{cert.description ?? config.label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
