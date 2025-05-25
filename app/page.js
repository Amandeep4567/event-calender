'use client'
import { EventProvider } from '@/context/EventContext'
import Header from '@/components/Layout/Header'
import Sidebar from '@/components/Layout/Sidebar'
import Calendar from '@/components/Calendar/Calendar'

export default function Home() {
  return (
    <EventProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-6">
            <Calendar />
          </div>
        </div>
      </div>
    </EventProvider>
  )
}
