// WriteSonic API Service
// Documentation: https://docs.writesonic.com/

const WRITESONIC_API_KEY = process.env.WRITESONIC_API_KEY || ''
const WRITESONIC_BASE_URL = 'https://api.writesonic.com/v2'
const WRITESONIC_ENGINE = process.env.WRITESONIC_ENGINE || 'premium'

export interface WriteSonicConfig {
  apiKey: string
  engine: 'premium' | 'economy'
  endpoint: string
}

export interface ArticleGenerationRequest {
  topic: string
  keywords: string[]
  category: 'News' | 'Food' | 'Cannabis' | 'Nightlife' | 'Mushroom Guide' | 'Events'
  articleType: 'educational' | 'listicle' | 'howto' | 'roundup' | 'wellness'
  wordCount: number
  tone: 'professional' | 'casual' | 'educational' | 'promotional'
  language?: string
}

export interface ArticleGenerationResponse {
  content: string
  title?: string
  metaDescription?: string
  suggestedKeywords?: string[]
  wordCount?: number
}

export interface OutlineRequest {
  topic: string
  keywords: string[]
  articleType: 'educational' | 'listicle' | 'howto' | 'roundup' | 'wellness'
}

export interface OutlineResponse {
  outline: string[]
  title?: string
}

class WriteSonicService {
  private config: WriteSonicConfig

  constructor() {
    this.config = {
      apiKey: WRITESONIC_API_KEY,
      engine: WRITESONIC_ENGINE as 'premium' | 'economy',
      endpoint: `${WRITESONIC_BASE_URL}/business/content/article-writer`
    }
  }

  private async makeRequest(endpoint: string, data: any): Promise<any> {
    if (!this.config.apiKey) {
      throw new Error('WriteSonic API key is not configured. Please set WRITESONIC_API_KEY in your environment variables.')
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.config.apiKey
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }))
      throw new Error(`WriteSonic API error: ${error.message || response.statusText}`)
    }

    return response.json()
  }

  /**
   * Generate an article using WriteSonic
   */
  async generateArticle(request: ArticleGenerationRequest): Promise<ArticleGenerationResponse> {
    try {
      const prompt = this.buildPrompt(request)
      
      const response = await this.makeRequest(this.config.endpoint, {
        engine: this.config.engine,
        prompt,
        language: request.language || 'en',
        tone_of_voice: request.tone,
        word_count: request.wordCount
      })

      return {
        content: response.text || response.content || '',
        title: response.title,
        metaDescription: response.meta_description || response.description,
        suggestedKeywords: response.keywords || request.keywords,
        wordCount: response.word_count || request.wordCount
      }
    } catch (error) {
      console.error('WriteSonic article generation error:', error)
      throw error
    }
  }

  /**
   * Generate an article outline
   */
  async generateOutline(request: OutlineRequest): Promise<OutlineResponse> {
    try {
      const prompt = `Create a detailed outline for an article about: ${request.topic}\nKeywords: ${request.keywords.join(', ')}\nArticle type: ${request.articleType}\n\nProvide a structured outline with main headings and subheadings.`

      const response = await this.makeRequest(`${WRITESONIC_BASE_URL}/business/content/chatsonic`, {
        engine: this.config.engine,
        prompt,
        language: 'en'
      })

      const outlineText = response.text || response.message || ''
      const outline = this.parseOutline(outlineText)

      return {
        outline,
        title: response.title
      }
    } catch (error) {
      console.error('WriteSonic outline generation error:', error)
      throw error
    }
  }

  /**
   * Optimize content for SEO
   */
  async optimizeForSEO(content: string, keywords: string[]): Promise<string> {
    try {
      const prompt = `Optimize the following content for SEO using these keywords: ${keywords.join(', ')}\n\nContent:\n${content}\n\nReturn the optimized version with natural keyword integration.`

      const response = await this.makeRequest(`${WRITESONIC_BASE_URL}/business/content/chatsonic`, {
        engine: this.config.engine,
        prompt,
        language: 'en'
      })

      return response.text || response.message || content
    } catch (error) {
      console.error('WriteSonic SEO optimization error:', error)
      return content // Return original if optimization fails
    }
  }

  /**
   * Generate multiple article variations
   */
  async generateVariations(topic: string, keywords: string[], count: number = 3): Promise<ArticleGenerationResponse[]> {
    const variations: ArticleGenerationResponse[] = []
    
    for (let i = 0; i < count; i++) {
      try {
        const request: ArticleGenerationRequest = {
          topic,
          keywords,
          category: 'News', // Default, can be customized
          articleType: 'educational',
          wordCount: 1000,
          tone: 'professional'
        }
        
        const article = await this.generateArticle(request)
        variations.push(article)
        
        // Rate limiting - wait between requests
        if (i < count - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
      } catch (error) {
        console.error(`Error generating variation ${i + 1}:`, error)
      }
    }
    
    return variations
  }

  /**
   * Build a prompt for article generation based on request parameters
   */
  private buildPrompt(request: ArticleGenerationRequest): string {
    const categoryContext = this.getCategoryContext(request.category)
    const articleTypeInstructions = this.getArticleTypeInstructions(request.articleType)
    
    return `Write a comprehensive ${request.articleType} article about: ${request.topic}

Category: ${request.category}
${categoryContext}

Keywords to include naturally: ${request.keywords.join(', ')}

${articleTypeInstructions}

Tone: ${request.tone}
Word count: approximately ${request.wordCount} words

Requirements:
- Well-structured with clear headings
- Engaging and informative
- Natural keyword integration
- Factual and accurate information
- Include practical tips or actionable advice where relevant`
  }

  private getCategoryContext(category: ArticleGenerationRequest['category']): string {
    const contexts: Record<string, string> = {
      'News': 'Focus on current events, trends, and timely information.',
      'Food': 'Focus on recipes, restaurant reviews, food culture, and culinary tips.',
      'Cannabis': 'Focus on education, science, benefits, and general information (not location-specific).',
      'Nightlife': 'Focus on cocktail recipes, nightlife tips, venue guides, and entertainment.',
      'Mushroom Guide': 'Focus on education, benefits, types, safety, and research.',
      'Events': 'Focus on event planning, tips, and general event information.'
    }
    return contexts[category] || ''
  }

  private getArticleTypeInstructions(type: ArticleGenerationRequest['articleType']): string {
    const instructions: Record<string, string> = {
      'educational': 'Provide educational content with clear explanations, examples, and key takeaways.',
      'listicle': 'Create a numbered or bulleted list format (e.g., "Top 10...", "Best...").',
      'howto': 'Provide step-by-step instructions with clear headings for each step.',
      'roundup': 'Compare and review multiple products, services, or options.',
      'wellness': 'Focus on health benefits, wellness tips, and evidence-based information.'
    }
    return instructions[type] || ''
  }

  private parseOutline(outlineText: string): string[] {
    // Parse outline text into array of headings
    const lines = outlineText.split('\n').filter(line => line.trim())
    return lines.map(line => line.replace(/^[\d.\-\*]+/, '').trim()).filter(line => line.length > 0)
  }
}

export const writesonicService = new WriteSonicService()

