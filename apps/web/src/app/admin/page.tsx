'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalArticles: 0,
    published: 0,
    drafts: 0
  })

  useEffect(() => {
    setStats({
      totalArticles: 0,
      published: 0,
      drafts: 0
    })
  }, [])

  return (
    <div className="min-h-screen bg-brand-light/30">
      <div className="container-page py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-brand-dark">Content Management Dashboard</h1>
          <p className="mt-2 text-brand-dark/70">Manage articles and schedule posts</p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-brand-light bg-white p-4 shadow-sm">
            <div className="text-sm text-brand-dark/60">Total Articles</div>
            <div className="mt-1 text-2xl font-bold text-brand-dark">{stats.totalArticles}</div>
          </div>
          <div className="rounded-xl border border-brand-light bg-white p-4 shadow-sm">
            <div className="text-sm text-brand-dark/60">Published</div>
            <div className="mt-1 text-2xl font-bold text-green-600">{stats.published}</div>
          </div>
          <div className="rounded-xl border border-brand-light bg-white p-4 shadow-sm">
            <div className="text-sm text-brand-dark/60">Drafts</div>
            <div className="mt-1 text-2xl font-bold text-brand-orange">{stats.drafts}</div>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <Link
            href="/admin/articles/new"
            className="rounded-xl border-2 border-brand-orange bg-brand-orange px-6 py-4 text-center font-bold text-white transition-colors hover:bg-brand-orange-600"
          >
            Create Article
          </Link>
          <Link
            href="/admin/calendar"
            className="rounded-xl border-2 border-brand-light bg-white px-6 py-4 text-center font-bold text-brand-dark transition-colors hover:bg-brand-light"
          >
            Content Calendar
          </Link>
        </div>

        <div className="rounded-xl border border-brand-light bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-brand-dark">Recent Articles</h2>
            <Link href="/admin/articles" className="text-sm font-bold text-brand-orange hover:underline">
              View All
            </Link>
          </div>
          <div className="text-sm text-brand-dark/60">No articles yet. Create your first article to get started.</div>
        </div>
      </div>
    </div>
  )
}
