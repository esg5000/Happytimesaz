'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalArticles: 0,
    published: 0,
    drafts: 0,
    writesonic: 0,
    manual: 0
  })

  useEffect(() => {
    // TODO: Fetch actual stats from API
    // For now, using placeholder
    setStats({
      totalArticles: 0,
      published: 0,
      drafts: 0,
      writesonic: 0,
      manual: 0
    })
  }, [])

  return (
    <div className="min-h-screen bg-brand-light/30">
      <div className="container-page py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-brand-dark">Content Management Dashboard</h1>
          <p className="mt-2 text-brand-dark/70">Manage articles, generate content, and schedule posts</p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-5 mb-8">
          <div className="rounded-xl border border-brand-light bg-white p-4 shadow-sm">
            <div className="text-sm text-brand-dark/60">Total Articles</div>
            <div className="text-2xl font-bold text-brand-dark mt-1">{stats.totalArticles}</div>
          </div>
          <div className="rounded-xl border border-brand-light bg-white p-4 shadow-sm">
            <div className="text-sm text-brand-dark/60">Published</div>
            <div className="text-2xl font-bold text-green-600 mt-1">{stats.published}</div>
          </div>
          <div className="rounded-xl border border-brand-light bg-white p-4 shadow-sm">
            <div className="text-sm text-brand-dark/60">Drafts</div>
            <div className="text-2xl font-bold text-brand-orange mt-1">{stats.drafts}</div>
          </div>
          <div className="rounded-xl border border-brand-light bg-white p-4 shadow-sm">
            <div className="text-sm text-brand-dark/60">WriteSonic</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">{stats.writesonic}</div>
          </div>
          <div className="rounded-xl border border-brand-light bg-white p-4 shadow-sm">
            <div className="text-sm text-brand-dark/60">Manual</div>
            <div className="text-2xl font-bold text-purple-600 mt-1">{stats.manual}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Link
            href="/admin/articles/new"
            className="rounded-xl border-2 border-brand-orange bg-brand-orange px-6 py-4 text-center font-bold text-white hover:bg-brand-orange-600 transition-colors"
          >
            Create Manual Article
          </Link>
          <Link
            href="/admin/articles/generate"
            className="rounded-xl border-2 border-blue-600 bg-blue-600 px-6 py-4 text-center font-bold text-white hover:bg-blue-700 transition-colors"
          >
            Generate with WriteSonic
          </Link>
          <Link
            href="/admin/articles/batch"
            className="rounded-xl border-2 border-brand-dark bg-brand-dark px-6 py-4 text-center font-bold text-white hover:bg-brand-dark/90 transition-colors"
          >
            Batch Generate
          </Link>
          <Link
            href="/admin/calendar"
            className="rounded-xl border-2 border-brand-light bg-white px-6 py-4 text-center font-bold text-brand-dark hover:bg-brand-light transition-colors"
          >
            Content Calendar
          </Link>
        </div>

        {/* Recent Articles */}
        <div className="rounded-xl border border-brand-light bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
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

