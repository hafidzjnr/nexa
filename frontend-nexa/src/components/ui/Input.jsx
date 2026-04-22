import clsx from 'clsx'

/**
 * Input component with label and Tailwind styling.
 * Accepts common input props like type, value, onChange and placeholder.
 */
export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  className = '',
  ...props
}) {
  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      {label && <label className="text-sm text-white/70">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg bg-nexa-card border border-nexa-border text-white placeholder-white/40 focus:border-nexa-primary outline-none"
        {...props}
      />
    </div>
  )
}