import { Shield, Target, Users, Award } from 'lucide-react'
import { Card } from '../../components/common/Card'
import { DemoBanner } from '../../components/common/DemoBanner'
import { theme } from '../../config/theme'

export function About() {
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <DemoBanner className="mb-8" />
        <h1 className="text-3xl font-bold mb-4">About {theme.brand.name}</h1>
        <p className="text-lg text-text-muted leading-relaxed mb-8">
          {theme.brand.name} is an AI-powered standards assistant designed to help procurement officers
          identify applicable Indian Standards for their procurement specifications. Built as part of
          Smart India Hackathon 2026 — Problem Statement SIH26108.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {[
            { icon: Target, title: 'Our Mission', desc: 'Simplify standards discovery for government procurement' },
            { icon: Shield, title: 'Trust & Evidence', desc: 'Every recommendation backed by supporting evidence' },
            { icon: Users, title: 'Built for Officers', desc: 'Designed for procurement professionals, not engineers' },
            { icon: Award, title: 'SIH26108', desc: 'AI-Powered Recommendation Engine for Indian Standards' },
          ].map((item) => (
            <Card key={item.title}>
              <item.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-text-muted">{item.desc}</p>
            </Card>
          ))}
        </div>

        <Card>
          <h2 className="text-xl font-semibold mb-3">Important Notice</h2>
          <p className="text-sm text-text-muted leading-relaxed">
            This is a prototype application developed for the Smart India Hackathon. It is not an official
            website of the Bureau of Indian Standards (BIS) or the Government of India. Standards data
            shown in demo mode is for illustration purposes only and should not be used for actual procurement decisions.
          </p>
        </Card>
      </div>
    </div>
  )
}
