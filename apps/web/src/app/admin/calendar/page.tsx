'use client'

import { useState } from 'react'

export default function ContentCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')

  // Placeholder data
  const scheduledPosts: Array<{
    id: string
    title: string
    date: Date
    category: string
    status: 'draft' | 'published' | 'scheduled'
  }> = []

  return (
    <div className="min-h-screen bg-brand-light/30">
      <div className="container-page py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-brand-dark">Content Calendar</h1>
            <p className="mt-2 text-brand-dark/70">Schedule and manage your content publishing</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setView('month')}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
                view === 'month'
                  ? 'bg-brand-orange text-white'
                  : 'border border-brand-light bg-white text-brand-dark hover:bg-brand-light'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
                view === 'week'
                  ? 'bg-brand-orange text-white'
                  : 'border border-brand-light bg-white text-brand-dark hover:bg-brand-light'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView('day')}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
                view === 'day'
                  ? 'bg-brand-orange text-white'
                  : 'border border-brand-light bg-white text-brand-dark hover:bg-brand-light'
              }`}
            >
              Day
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-brand-light bg-white p-6 shadow-sm">
          <div className="mb-4">
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-green-600" />
                <span className="text-sm text-brand-dark">Published</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-brand-orange" />
                <span className="text-sm text-brand-dark">Scheduled</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-purple-600" />
                <span className="text-sm text-brand-dark">Draft</span>
              </div>
            </div>
          </div>

          {view === 'month' && (
            <div className="text-center py-12 text-brand-dark/60">
              <p className="text-lg font-semibold mb-2">Calendar View</p>
              <p className="text-sm">Full calendar implementation coming soon</p>
              <p className="text-sm mt-2">This will show scheduled posts, published dates, and content gaps</p>
            </div>
          )}

          {scheduledPosts.length === 0 && (
            <div className="text-center py-12 text-brand-dark/60">
              <p className="text-sm">No scheduled posts yet</p>
              <p className="text-xs mt-2">Create articles and schedule them to see them here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

