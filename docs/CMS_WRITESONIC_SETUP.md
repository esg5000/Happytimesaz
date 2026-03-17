# Content Management System with WriteSonic Integration

## Overview

This CMS system allows you to create articles both manually (for local/specific content) and automatically using WriteSonic API (for general educational content).

## Environment Variables

Add these to your `.env.local` file:

```env
# WriteSonic API Configuration
WRITESONIC_API_KEY=your_writesonic_api_key_here
WRITESONIC_ENGINE=premium  # or 'economy'
```

## Content Strategy

### WriteSonic (Automated) - Use For:
- General health/wellness content
- Mushroom education (benefits, types, safety, research)
- Cannabis science/education (general, not location-specific)
- Food nutrition and health articles
- General nightlife tips, cocktail recipes
- Evergreen trend pieces
- SEO-focused listicles

### Manual/Claude Content - Use For:
- Local GTA business coverage (dispensaries, restaurants, bars)
- Specific venue/business profiles
- Event coverage and calendar
- Reviews of local establishments
- News requiring fact-checking
- Local regulations, business openings/closings
- "Top Dispensaries in Arizona" type articles
- Anything location-specific

## Admin Dashboard

Access the admin dashboard at `/admin`

### Features:
1. **Dashboard Overview** (`/admin`)
   - Quick stats (total articles, published, drafts, WriteSonic vs Manual)
   - Quick action buttons

2. **Manual Article Creation** (`/admin/articles/new`)
   - Rich text editor (coming soon - currently plain text)
   - Category assignment
   - SEO fields
   - Status management (draft/published/scheduled)
   - Tags

3. **WriteSonic Article Generator** (`/admin/articles/generate`)
   - Topic/keywords input
   - Category selection
   - Article type (educational, listicle, how-to, etc.)
   - Word count selector
   - Tone selector
   - Preview generated content
   - Save as draft

4. **Batch Generation** (`/admin/articles/batch`)
   - Upload CSV with topics and keywords
   - Generate multiple articles at once
   - Progress tracking
   - Review queue

5. **Content Calendar** (`/admin/calendar`)
   - Visual calendar view
   - Scheduled posts
   - Content gaps analysis

## API Endpoints

### Generate Article
```
POST /api/writesonic/generate
Body: {
  topic: string
  keywords: string[]
  category: 'News' | 'Food' | 'Cannabis' | 'Nightlife' | 'Mushroom Guide' | 'Events'
  articleType: 'educational' | 'listicle' | 'howto' | 'roundup' | 'wellness'
  wordCount: number
  tone: 'professional' | 'casual' | 'educational' | 'promotional'
}
```

### Generate Outline
```
POST /api/writesonic/outline
Body: {
  topic: string
  keywords: string[]
  articleType: string
}
```

### Optimize for SEO
```
POST /api/writesonic/optimize
Body: {
  content: string
  keywords: string[]
}
```

## Database Schema Extensions

The `post` schema has been extended with:
- `contentSource`: 'manual' | 'writesonic' | 'hybrid'
- `status`: 'draft' | 'published' | 'scheduled'
- `scheduledPublishDate`: datetime
- `tags`: string[]
- `writesonicTopic`: string
- `writesonicKeywords`: string[]
- `writesonicArticleType`: string
- `writesonicWordCount`: number
- `writesonicTone`: string
- `seoTitle`: string
- `seoDescription`: text
- `seoKeywords`: string[]
- `needsFactCheck`: boolean
- `needsLocalInfo`: boolean
- `author`: string

## Batch CSV Format

For batch generation, use CSV format:
```csv
topic,keywords,category
Benefits of Mushrooms,psilocybin;health;wellness,Mushroom Guide
Best Cannabis Strains,cannabis;strains;THC;CBD,Cannabis
```

## Security Considerations

1. **API Key Storage**: Store WriteSonic API key in environment variables only
2. **Rate Limiting**: Built-in 2-second delay between batch requests
3. **Content Review**: All generated content goes to drafts first
4. **Fact-Checking Flags**: Use `needsFactCheck` and `needsLocalInfo` flags

## Next Steps / TODO

- [ ] Integrate rich text editor (TinyMCE or Quill)
- [ ] Connect article creation to Sanity CMS
- [ ] Implement content calendar with full calendar view
- [ ] Add analytics dashboard with real data
- [ ] Add image upload capability
- [ ] Implement version history
- [ ] Add content moderation workflow
- [ ] Create article preview with ad placements
- [ ] Add bulk edit functionality
- [ ] Implement search and filtering

## Usage Tips

1. **For Local Content**: Always use manual creation
2. **For Educational Content**: Use WriteSonic with appropriate keywords
3. **Review Before Publishing**: Always review WriteSonic content for accuracy
4. **Use Tags**: Tag articles for better organization
5. **SEO Optimization**: Use the SEO optimization feature for better rankings
6. **Batch Processing**: Use batch generation for content series or similar topics

