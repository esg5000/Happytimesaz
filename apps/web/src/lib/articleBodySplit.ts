/** Find slice end index after the n-th top-level `block` in portable text. */
export function endIndexAfterNthBlock(body: unknown[] | undefined, n: number): number {
  if (!Array.isArray(body) || n <= 0) return 0
  let count = 0
  for (let i = 0; i < body.length; i++) {
    const row = body[i] as { _type?: string }
    if (row._type === 'block') {
      count++
      if (count === n) return i + 1
    }
  }
  return body.length
}

/** First normal paragraph block (intro copy before inline banner). */
function endIndexAfterFirstNormalBlock(body: unknown[]): number {
  for (let i = 0; i < body.length; i++) {
    const row = body[i] as { _type?: string; style?: string }
    if (row._type === 'block' && (row.style === 'normal' || row.style === undefined)) {
      return i + 1
    }
  }
  return endIndexAfterNthBlock(body, 1)
}

/** After the n-th H2 — “content sections” for mid-article partner placement. */
function endIndexAfterNthH2(body: unknown[], n: number): number {
  let count = 0
  for (let i = 0; i < body.length; i++) {
    const row = body[i] as { _type?: string; style?: string }
    if (row._type === 'block' && row.style === 'h2') {
      count++
      if (count === n) return i + 1
    }
  }
  return body.length
}

export function splitArticleBodyForAds(body: unknown[] | undefined): {
  intro: unknown[]
  mid: unknown[]
  tail: unknown[]
} {
  if (!Array.isArray(body)) {
    return { intro: [], mid: [], tail: [] }
  }
  const introEnd = endIndexAfterFirstNormalBlock(body)
  let midEnd = endIndexAfterNthH2(body, 3)
  if (midEnd <= introEnd) {
    midEnd = endIndexAfterNthBlock(body, 3)
  }
  if (midEnd <= introEnd) {
    midEnd = Math.min(body.length, introEnd + 1)
  }
  return {
    intro: body.slice(0, introEnd),
    mid: body.slice(introEnd, midEnd),
    tail: body.slice(midEnd)
  }
}
