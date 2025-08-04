// app/layout.tsx
import '../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grim Lister',
  description: 'The ultimate vintage listing assistant.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
