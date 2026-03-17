import { NextRequest, NextResponse } from 'next/server'
import { writesonicService } from '@/lib/writesonic/service'
import type { ArticleGenerationRequest } from '@/lib/writesonic/service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request
    if (!body.topic || !body.keywords || !Array.isArray(body.keywords)) {
      return NextResponse.json(
        { error: 'Missing required fields: topic, keywords' },
        { status: 400 }
      )
    }

    const articleRequest: ArticleGenerationRequest = {
      topic: body.topic,
      keywords: body.keywords,
      category: body.category || 'News',
      articleType: body.articleType || 'educational',
      wordCount: body.wordCount || 1000,
      tone: body.tone || 'professional',
      language: body.language || 'en'
    }

    const result = await writesonicService.generateArticle(articleRequest)

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('WriteSonic API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate article' },
      { status: 500 }
    )
  }
}

