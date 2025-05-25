import './globals.css'

export const metadata = {
  title: 'Event Calendar',
  description: 'A comprehensive event calendar application with recurring events and drag-drop functionality',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
