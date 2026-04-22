import clsx from 'clsx'

/**
 * Card component with gradient background and optional hover effect.
 *
 * Props:
 * - hover: whether to add border/shadow on hover
 */
export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={clsx(
        'bg-card-gradient border border-nexa-border rounded-2xl p-6 backdrop-blur-sm',
        hover &&
          'hover:border-nexa-primary/50 hover:shadow-lg hover:shadow-nexa-primary/10 transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}