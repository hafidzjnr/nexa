// src/components/layout/PageWrapper.jsx
export default function PageWrapper({ children }) {
  return (
    <main className="min-h-screen bg-nexa-dark">
      {children}
    </main>
  )
}