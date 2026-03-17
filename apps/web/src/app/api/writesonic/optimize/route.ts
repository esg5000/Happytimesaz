import { NextRequest, NextResponse } from 'next/server'
import { writesonicService } from '@/lib/writesonic/service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.content || !body.keywords || !Array.isArray(body.keywords)) {
      return NextResponse.json(
        { error: 'Missing required fields: content, keywords' },
        { status: 400 }
      )
    }

    const optimized = await writesonicService.optimizeForSEO(body.content, body.keywords)

    return NextResponse.json({ optimizedContent: optimized })
  } catch (error: any) {
    console.error('WriteSonic SEO optimization error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to optimize content' },
      { status: 500 }
    )
  }
}

