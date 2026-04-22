import { Search } from 'lucide-react'

/**
 * Search bar with icon.
 *
 * Props:
 * - value: current search text
 * - onChange: callback when text changes (receives new value)
 * - placeholder: optional placeholder text
 */
export default function SearchBar({ value, onChange, placeholder = 'Cari...' }) {
  return (
    <div className="relative w-full max-w-md mb-4">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 rounded-xl bg-nexa-card border border-nexa-border text-white placeholder-white/30 focus:outline-none focus:border-nexa-primary transition-colors"
      />
    </div>
  )
}