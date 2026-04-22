/**
 * Horizontal progress bar displaying completion percentage.
 *
 * Props:
 * - value: current value
 * - max: maximum value (default 100)
 */
export default function ProgressBar({ value, max = 100, className = '' }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={`w-full h-3 bg-nexa-card border border-nexa-border rounded-full overflow-hidden ${className}`}>
      <div className="bg-nexa-primary h-full transition-all" style={{ width: `${percentage}%` }} />
    </div>
  )
}