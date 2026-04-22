import { Link } from 'react-router-dom'

/**
 * Footer component displayed at the bottom of pages.
 * Contains copyright and simple links.
 */
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#1a0e3a]/90 border-t border-nexa-border py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
        <p>&copy; {year} NEXA. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link to="/privacy" className="hover:text-white">Privacy</Link>
          <Link to="/terms" className="hover:text-white">Terms</Link>
          <Link to="/about" className="hover:text-white">About</Link>
        </div>
      </div>
    </footer>
  )
}