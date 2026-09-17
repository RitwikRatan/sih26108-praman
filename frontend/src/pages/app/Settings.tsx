import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Select } from '../../components/common/Select'
import { useLanguage } from '../../context/LanguageContext'
import { languages } from '../../i18n/translations'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { useNavigate } from 'react-router-dom'

export function Settings() {
  const { language, setLanguage } = useLanguage()
  const { logout } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-text-muted mt-1">Application preferences and account actions.</p>
      </div>

      <Card className="space-y-4">
        <h3 className="font-semibold">Language</h3>
        <Select
          label="Display Language"
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value as typeof language)
            toast('Language updated', 'success')
          }}
          options={languages.map((l) => ({ value: l.code, label: l.label }))}
        />
      </Card>

      <Card className="space-y-4">
        <h3 className="font-semibold">Accessibility</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-muted">Text size:</span>
          {['A-', 'A', 'A+'].map((size) => (
            <button
              key={size}
              className="h-8 w-8 rounded border border-border hover:border-primary text-sm font-medium"
              aria-label={`Text size ${size}`}
            >
              {size}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-2 text-error">Account</h3>
        <Button
          variant="outline"
          onClick={() => {
            logout()
            navigate('/login')
          }}
        >
          Sign Out
        </Button>
      </Card>
    </div>
  )
}
