'use client'

import { useState } from 'react'

export default function BatchGenerationPage() {
  const [loading, setLoading] = useState(false)
  const [csvContent, setCsvContent] = useState('')
  const [results, setResults] = useState<Array<{ topic: string; status: 'success' | 'error'; content?: string; error?: string }>>([])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      setCsvContent(text)
    }
    reader.readAsText(file)
  }

  const parseCSV = (csv: string): Array<{ topic: string; keywords: string[]; category: string }> => {
    const lines = csv.split('\n').filter(line => line.trim())
    const headers = lines[0].split(',').map(h => h.trim())
    
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim())
      return {
        topic: values[0] || '',
        keywords: values[1]?.split(';').map(k => k.trim()) || [],
        category: values[2] || 'News'
      }
    })
  }

  const handleBatchGenerate = async () => {
    if (!csvContent) {
      alert('Please upload a CSV file first')
      return
    }

    setLoading(true)
    setResults([])

    try {
      const items = parseCSV(csvContent)
      const newResults: typeof results = []

      for (const item of items) {
        try {
          const response = await fetch('/api/writesonic/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              topic: item.topic,
              keywords: item.keywords,
              category: item.category,
              articleType: 'educational',
              wordCount: 1000,
              tone: 'professional'
            })
          })

          if (response.ok) {
            const data = await response.json()
            newResults.push({ topic: item.topic, status: 'success', content: data.content })
          } else {
            newResults.push({ topic: item.topic, status: 'error', error: 'Generation failed' })
          }

          // Rate limiting
          await new Promise(resolve => setTimeout(resolve, 2000))
        } catch (error: any) {
          newResults.push({ topic: item.topic, status: 'error', error: error.message })
        }

        setResults([...newResults])
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-light/30">
      <div className="container-page py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-brand-dark">Batch Article Generation</h1>
          <p className="mt-2 text-brand-dark/70">Generate multiple articles from a CSV file</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-xl border border-brand-light bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-brand-dark mb-4">CSV Upload</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">
                    Upload CSV File
                  </label>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="w-full rounded-xl border border-brand-light px-4 py-2 text-sm"
                  />
                  <p className="mt-2 text-xs text-brand-dark/60">
                    CSV format: topic, keywords (semicolon-separated), category
                  </p>
                </div>

                {csvContent && (
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-2">
                      CSV Preview
                    </label>
                    <textarea
                      value={csvContent}
                      onChange={(e) => setCsvContent(e.target.value)}
                      rows={10}
                      className="w-full rounded-xl border border-brand-light px-4 py-2 text-sm font-mono text-xs"
                    />
                  </div>
                )}

                <button
                  onClick={handleBatchGenerate}
                  disabled={loading || !csvContent}
                  className="w-full rounded-xl bg-brand-orange px-6 py-3 font-bold text-white hover:bg-brand-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Generating...' : 'Generate All Articles'}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-brand-light bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-brand-dark mb-4">Generation Results</h2>
              
              {results.length === 0 ? (
                <div className="text-sm text-brand-dark/60 text-center py-12">
                  Results will appear here
                </div>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {results.map((result, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg border p-3 ${
                        result.status === 'success'
                          ? 'border-green-300 bg-green-50'
                          : 'border-red-300 bg-red-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-brand-dark">{result.topic}</span>
                        <span
                          className={`text-xs font-bold ${
                            result.status === 'success' ? 'text-green-700' : 'text-red-700'
                          }`}
                        >
                          {result.status === 'success' ? '✓ Success' : '✗ Error'}
                        </span>
                      </div>
                      {result.error && (
                        <p className="mt-1 text-xs text-red-700">{result.error}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

