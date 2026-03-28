'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewArticlePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: '',
    status: 'draft',
    contentSource: 'manual',
    tags: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    body: ''
  })

  const handleSave = async () => {
    setSaving(true)
    // TODO: Save to Sanity
    // For now, just redirect
    router.push('/admin/articles')
  }

  return (
    <div className="min-h-screen bg-brand-light/30">
      <div className="container-page py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-brand-dark">Create Article</h1>
          <p className="mt-2 text-brand-dark/70">Draft content for Sanity (wire save to your dataset when ready)</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-brand-light bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">
                    Title *
                  </label>
                  <input
                    suppressHydrationWarning
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Article title"
                    className="w-full rounded-xl border border-brand-light px-4 py-2 text-sm outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">
                    Excerpt
                  </label>
                  <textarea
                    suppressHydrationWarning
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    placeholder="Short description"
                    className="w-full rounded-xl border border-brand-light px-4 py-2 text-sm outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">
                    Content *
                  </label>
                  <textarea
                    suppressHydrationWarning
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    rows={20}
                    placeholder="Write your article content here..."
                    className="w-full rounded-xl border border-brand-light px-4 py-2 text-sm outline-none focus:border-brand-orange font-mono"
                  />
                  <p className="mt-2 text-xs text-brand-dark/60">
                    Note: Rich text editor integration coming soon. For now, use plain text or markdown.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-brand-light bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-brand-dark mb-4">Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">
                    Category
                  </label>
                  <select
                    suppressHydrationWarning
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-brand-light px-4 py-2 text-sm outline-none focus:border-brand-orange"
                  >
                    <option value="">Select category</option>
                    <option value="news">News</option>
                    <option value="food">Food</option>
                    <option value="cannabis">Cannabis</option>
                    <option value="nightlife">Nightlife</option>
                    <option value="mushroom-guide">Mushroom Guide</option>
                    <option value="events">Events</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">
                    Status
                  </label>
                  <select
                    suppressHydrationWarning
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full rounded-xl border border-brand-light px-4 py-2 text-sm outline-none focus:border-brand-orange"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    suppressHydrationWarning
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="tag1, tag2, tag3"
                    className="w-full rounded-xl border border-brand-light px-4 py-2 text-sm outline-none focus:border-brand-orange"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-brand-light bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-brand-dark mb-4">SEO Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">
                    SEO Title
                  </label>
                  <input
                    suppressHydrationWarning
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    placeholder="SEO optimized title"
                    className="w-full rounded-xl border border-brand-light px-4 py-2 text-sm outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">
                    SEO Description
                  </label>
                  <textarea
                    suppressHydrationWarning
                    value={formData.seoDescription}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    rows={3}
                    placeholder="Meta description"
                    className="w-full rounded-xl border border-brand-light px-4 py-2 text-sm outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">
                    SEO Keywords
                  </label>
                  <input
                    suppressHydrationWarning
                    type="text"
                    value={formData.seoKeywords}
                    onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                    placeholder="keyword1, keyword2"
                    className="w-full rounded-xl border border-brand-light px-4 py-2 text-sm outline-none focus:border-brand-orange"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                suppressHydrationWarning
                onClick={handleSave}
                disabled={saving || !formData.title || !formData.body}
                className="flex-1 rounded-xl bg-brand-orange px-6 py-3 font-bold text-white hover:bg-brand-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? 'Saving...' : 'Save Draft'}
              </button>
              <button
                suppressHydrationWarning
                onClick={() => router.back()}
                className="rounded-xl border border-brand-light px-6 py-3 font-bold text-brand-dark hover:bg-brand-light transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

