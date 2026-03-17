import { NextRequest, NextResponse } from 'next/server'
import { writesonicService } from '@/lib/writesonic/service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.topic || !body.keywords || !Array.isArray(body.keywords)) {
      return NextResponse.json(
        { error: 'Missing required fields: topic, keywords' },
        { status: 400 }
      )
    }

    const result = await writesonicService.generateOutline({
      topic: body.topic,
      keywords: body.keywords,
      articleType: body.articleType || 'educational'
    })

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('WriteSonic outline error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate outline' },
      { status: 500 }
    )
  }
}

