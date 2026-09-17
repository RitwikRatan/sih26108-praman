import { Outlet } from 'react-router-dom'
import { AppNavbar, MobileBottomNav } from '../components/navigation/Navbar'
import { DemoBanner } from '../components/common/DemoBanner'
import { ChatbotWidget } from '../components/chat/ChatbotWidget'
import { motion } from 'framer-motion'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppNavbar />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <DemoBanner />
      </div>
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-6"
      >
        <Outlet />
      </motion.main>
      <MobileBottomNav />
      <ChatbotWidget />
    </div>
  )
}
