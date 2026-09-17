import { Outlet } from 'react-router-dom'
import { PublicNavbar } from '../components/navigation/Navbar'
import { Footer } from '../components/layout/Footer'
import { motion } from 'framer-motion'

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex-1"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  )
}
