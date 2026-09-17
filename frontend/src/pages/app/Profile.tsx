import { useForm } from 'react-hook-form'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'
import { Select } from '../../components/common/Select'
import { Card } from '../../components/common/Card'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { languages } from '../../i18n/translations'
import { useToast } from '../../context/ToastContext'

interface ProfileForm {
  name: string
  email: string
  organization: string
  role: string
  language: string
  notifications: string
}

export function Profile() {
  const { user } = useAuth()
  const { language, setLanguage } = useLanguage()
  const { toast } = useToast()

  const { register, handleSubmit } = useForm<ProfileForm>({
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      organization: user?.organization ?? '',
      role: user?.role ?? 'Procurement Officer',
      language,
      notifications: 'enabled',
    },
  })

  const onSubmit = (data: ProfileForm) => {
    setLanguage(data.language as typeof language)
    toast('Changes saved', 'success')
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-text-muted mt-1">Manage your account settings and preferences.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-4">
          <Input label="Name" {...register('name')} />
          <Input label="Email" type="email" {...register('email')} disabled />
          <Input label="Organization" {...register('organization')} />
          <Input label="Role" {...register('role')} disabled />

          <div className="pt-4 border-t border-border">
            <h3 className="font-semibold mb-4">Preferences</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="Language"
                {...register('language')}
                options={languages.map((l) => ({ value: l.code, label: l.label }))}
              />
              <Select
                label="Notifications"
                {...register('notifications')}
                options={[
                  { value: 'enabled', label: 'Enabled' },
                  { value: 'disabled', label: 'Disabled' },
                ]}
              />
            </div>
          </div>

          <Button type="submit" className="mt-4">Save Changes</Button>
        </Card>
      </form>
    </div>
  )
}
