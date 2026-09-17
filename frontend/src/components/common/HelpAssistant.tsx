import { useState } from 'react'
import { HelpCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const helpTopics = [
  {
    q: 'How do I analyze a requirement?',
    a: 'Go to Analyze, enter your product description or upload a tender document, review the extracted requirements, and confirm to find standards.',
  },
  {
    q: 'What does "Very High Match" mean?',
    a: 'It indicates strong alignment between your requirement and the standard. Always review before making procurement decisions.',
  },
  {
    q: 'Can I download reports?',
    a: 'Yes. After analysis, click Generate Report or go to Reports to view and download.',
  },
]

export function HelpAssistant() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark transition-colors"
        aria-label="Need Help?"
      >
        <HelpCircle className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/20"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-surface border-l border-border shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-semibold">Need Help?</h2>
                <button onClick={() => setOpen(false)} aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
                {helpTopics.map((topic) => (
                  <div key={topic.q} className="rounded-lg bg-background p-4">
                    <p className="font-medium text-sm mb-1">{topic.q}</p>
                    <p className="text-sm text-text-muted">{topic.a}</p>
                  </div>
                ))}
                <p className="text-xs text-text-muted">
                  For more help, visit the <a href="/help" className="text-primary hover:underline">Help page</a>.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
