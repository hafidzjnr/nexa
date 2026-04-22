/**
 * Wrapper component for page content below the navbar.
 * Ensures consistent padding and minimum height.
 */
export default function PageWrapper({ children, className = '' }) {
  return (
    <main className={`min-h-[calc(100vh-4rem)] pt-6 ${className}`}>
      {children}
    </main>
  )
}