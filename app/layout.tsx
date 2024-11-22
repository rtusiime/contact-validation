import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'REVI - CSV Upload and Analysis',
  description: 'Upload your CSV file for instant analysis and insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
