import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'
import { Card } from '../../components/common/Card'
import { useAuth } from '../../context/AuthContext'
import { theme } from '../../config/theme'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

type LoginForm = z.infer<typeof loginSchema>

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'rajesh.kumar@praman.in', password: 'demo123' },
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data)
      navigate(from, { replace: true })
    } catch {
      setError('root', { message: 'Invalid credentials. Try demo: rajesh.kumar@praman.in / demo123' })
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12">
        <div className="max-w-md text-white">
          <Shield className="h-16 w-16 mb-6 opacity-90" />
          <h1 className="text-3xl font-bold mb-4">{theme.brand.name}</h1>
          <p className="text-lg opacity-90 mb-6">{theme.brand.subtitle}</p>
          <p className="text-sm opacity-75 leading-relaxed">
            Find applicable Indian Standards for your procurement requirements.
            Analyze tenders, review AI recommendations, and generate evidence-backed reports.
          </p>
          <p className="mt-8 text-xs opacity-60">{theme.brand.prototype}</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-2xl font-bold text-primary">{theme.brand.name}</h1>
            <p className="text-sm text-text-muted mt-1">{theme.brand.prototype}</p>
          </div>

          <Card>
            <h2 className="text-xl font-semibold mb-1">Sign In</h2>
            <p className="text-sm text-text-muted mb-6">
              Sign in as <strong>Procurement Officer</strong>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Email / User ID"
                type="email"
                {...register('email')}
                error={errors.email?.message}
                autoComplete="email"
              />
              <Input
                label="Password"
                type="password"
                {...register('password')}
                error={errors.password?.message}
                autoComplete="current-password"
              />

              {errors.root && (
                <p className="text-sm text-error" role="alert">{errors.root.message}</p>
              )}

              <Button type="submit" className="w-full" isLoading={isSubmitting}>
                Sign In
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-text-muted">
              <a href="#" className="text-primary hover:underline">Forgot password?</a>
            </p>
          </Card>

          <p className="mt-6 text-center text-sm text-text-muted">
            <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
