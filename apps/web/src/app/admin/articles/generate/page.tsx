'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GenerateArticlePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    topic: '',
    keywords: '',
    category: 'News',
    articleType: 'educational',
    wordCount: 1000,
    tone: 'professional'
  })

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)
    setGeneratedContent(null)

    try {
      const keywordsArray = formData.keywords.split(',').map(k => k.trim()).filter(k => k)

      const response = await fetch('/api/writesonic/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: formData.topic,
          keywords: keywordsArray,
          category: formData.category,
          articleType: formData.articleType,
          wordCount: formData.wordCount,
          tone: formData.tone
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate article')
      }

      const result = await response.json()
      setGeneratedContent(result.content)
    } catch (err: any) {
      setError(err.message || 'Failed to generate article')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveDraft = () => {
    // TODO: Save to Sanity as draft
    router.push('/admin/articles')
  }

  return (
    <div className="min-h-screen bg-brand-light/30">
      <div className="container-page py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-brand-dark">Generate Article with WriteSonic</h1>
          <p className="mt-2 text-brand-dark/70">Create AI-generated content for educational and general topics</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="space-y-6">
            <div className="rounded-xl border border-brand-light bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-brand-dark mb-4">Article Parameters</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">
                    Topic / Title *
                  </label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    placeholder="e.g., Benefits of Medicinal Mushrooms"
                    className="w-full rounded-xl border border-brand-light px-4 py-2 text-sm outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">
                    Keywords (comma-separated) *
                  </label>
                  <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="e.g., mushrooms, health benefits, psilocybin"
                    className="w-full rounded-xl border border-brand-light px-4 py-2 text-sm outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-brand-light px-4 py-2 text-sm outline-none focus:border-brand-orange"
                  >
                    <option value="News">News</option>
                    <option value="Food">Food</option>
                    <option value="Cannabis">Cannabis</option>
                    <option value="Nightlife">Nightlife</option>
                    <option value="Mushroom Guide">Mushroom Guide</option>
                    <option value="Events">Events</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">
                    Article Type
                  </label>
                  <select
                    value={formData.articleType}
                    onChange={(e) => setFormData({ ...formData, articleType: e.target.value })}
                    className="w-full rounded-xl border border-brand-light px-4 py-2 text-sm outline-none focus:border-brand-orange"
                  >
                    <option value="educational">Educational</option>
                    <option value="listicle">Listicle (Top 10, Best X)</option>
                    <option value="howto">How-to Guide</option>
                    <option value="roundup">Product Roundup</option>
                    <option value="wellness">Health/Wellness</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">
                    Word Count
                  </label>
                  <select
                    value={formData.wordCount}
                    onChange={(e) => setFormData({ ...formData, wordCount: parseInt(e.target.value) })}
                    className="w-full rounded-xl border border-brand-light px-4 py-2 text-sm outline-none focus:border-brand-orange"
                  >
                    <option value="500">500 words</option>
                    <option value="750">750 words</option>
                    <option value="1000">1000 words</option>
                    <option value="1500">1500 words</option>
                    <option value="2000">2000+ words</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">
                    Tone
                  </label>
                  <select
                    value={formData.tone}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                    className="w-full rounded-xl border border-brand-light px-4 py-2 text-sm outline-none focus:border-brand-orange"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="educational">Educational</option>
                    <option value="promotional">Promotional</option>
                  </select>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={loading || !formData.topic || !formData.keywords}
                  className="w-full rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Generating...' : 'Generate Article'}
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div className="rounded-xl border border-brand-light bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-brand-dark">Generated Content</h2>
                {generatedContent && (
                  <button
                    onClick={handleSaveDraft}
                    className="rounded-xl bg-brand-orange px-4 py-2 text-sm font-bold text-white hover:bg-brand-orange-600 transition-colors"
                  >
                    Save as Draft
                  </button>
                )}
              </div>

              {generatedContent ? (
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm text-brand-dark/80 leading-relaxed">
                    {generatedContent}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-brand-dark/60 text-center py-12">
                  Generated content will appear here
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

