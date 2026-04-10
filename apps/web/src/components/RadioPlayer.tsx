'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronUp, Volume2, VolumeX, Pause, Play, Radio } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getMergedStations, type RadioStation } from '@/lib/sanity/stations'

export function RadioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [stations, setStations] = useState<RadioStation[]>([])
  const [loading, setLoading] = useState(true)

  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [stationId, setStationId] = useState<number>(1)
  const [volume, setVolume] = useState<number>(0.8)

  // Fetch merged stations (fallback + Sanity) on mount
  // This ensures the fallback station is always available, even if Sanity fails
  useEffect(() => {
    async function loadStations() {
      try {
        setLoading(true)
        const merged = await getMergedStations()
        setStations(merged)
        // Note: stationId validation happens in a separate useEffect below
      } catch (err) {
        console.error('Failed to load radio stations:', err)
        // Even if fetching fails, try to get at least the fallback
        const fallbackName = process.env.NEXT_PUBLIC_RADIO_STATION_1_NAME || ''
        const fallbackUrl = process.env.NEXT_PUBLIC_RADIO_STATION_1_URL || ''
        if (fallbackName && fallbackUrl) {
          setStations([{
            id: 1,
            name: fallbackName,
            url: fallbackUrl,
            source: 'fallback'
          }])
        }
      } finally {
        setLoading(false)
      }
    }
    
    loadStations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run on mount

  // Restore persisted state (runs first, before stations load)
  useEffect(() => {
    try {
      const s = window.localStorage.getItem('htaz_radio_station')
      const v = window.localStorage.getItem('htaz_radio_volume')
      if (s) setStationId(Number(s))
      if (v) setVolume(Math.min(1, Math.max(0, Number(v))))
    } catch {
      // ignore
    }
  }, [])

  // Validate stationId when stations are loaded or change
  // Ensures the selected station exists in the current station list
  // Note: We don't include stationId in deps to avoid loops - we only validate when stations change
  useEffect(() => {
    if (stations.length === 0 || loading) return
    
    const currentStation = stations.find(s => s.id === stationId)
    if (!currentStation) {
      // Current stationId is invalid, use the first available station
      setStationId(stations[0].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stations, loading]) // Only validate when stations change, not when stationId changes

  useEffect(() => {
    try {
      window.localStorage.setItem('htaz_radio_station', String(stationId))
      window.localStorage.setItem('htaz_radio_volume', String(volume))
    } catch {
      // ignore
    }
  }, [stationId, volume])

  const current = stations.find((s) => s.id === stationId) || stations[0]

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume
  }, [volume])

  // Add error event listener with more detailed error handling
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleError = (e: Event) => {
      const audioEl = e.target as HTMLAudioElement
      const error = audioEl.error
      
      // Only handle errors if we have a valid stream URL set
      // Ignore errors when src is empty or points to the page URL
      const currentSrc = audioEl.src
      if (!currentSrc || currentSrc.includes(window.location.origin)) {
        return
      }
      
      // Check current playing state from the audio element itself
      // Don't rely on closure variable to avoid dependency issues
      if (audioEl.paused && audioEl.readyState === 0) {
        return
      }
      
      let errorMessage = 'Failed to load radio stream.'
      
      if (error) {
        switch (error.code) {
          case error.MEDIA_ERR_ABORTED:
            // Aborted errors are often false positives during source changes
            return
          case error.MEDIA_ERR_NETWORK:
            errorMessage = 'Network error while loading stream.'
            break
          case error.MEDIA_ERR_DECODE:
            errorMessage = 'Stream decoding error.'
            break
          case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = 'Stream format not supported.'
            break
          default:
            errorMessage = `Stream error (code: ${error.code}).`
        }
      }
      
      console.error('Audio error:', error, errorMessage, 'URL:', audioEl.src)
      setError(errorMessage)
      setPlaying(false)
    }

    const handleCanPlay = () => {
      setError(null)
    }

    const handlePlaying = () => {
      setError(null)
    }

    audio.addEventListener('error', handleError)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('playing', handlePlaying)

    return () => {
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('playing', handlePlaying)
    }
  }, []) // Remove playing from dependencies - use audioEl.paused instead

  async function togglePlay() {
    const audio = audioRef.current
    if (!audio) {
      console.error('Audio element not available')
      setError('Audio player not initialized')
      return
    }

    if (!playing) {
      if (!current?.url) {
        setError('No stream URL configured for this station.')
        setOpen(true)
        return
      }
      
      try {
        setError(null)

        // Stop any current playback first
        audio.pause()
        audio.src = ''

        // Small delay to ensure cleanup
        await new Promise(resolve => setTimeout(resolve, 50))

        // Set the new source
        audio.src = current.url

        // Load the stream
        audio.load()

        // Wait for stream to be ready, then play
        await new Promise<void>((resolve, reject) => {
          let resolved = false

          const cleanup = () => {
            audio.removeEventListener('canplay', handleCanPlay)
            audio.removeEventListener('canplaythrough', handleCanPlayThrough)
            audio.removeEventListener('loadeddata', handleLoadedData)
            audio.removeEventListener('error', handleError)
          }

          const handleCanPlay = async () => {
            if (resolved) return
            try {
              await audio.play()
              setPlaying(true)
              resolved = true
              cleanup()
              resolve()
            } catch (playErr: unknown) {
              console.error('Radio play failed (canplay):', playErr)
              cleanup()
              reject(playErr)
            }
          }

          const handleCanPlayThrough = async () => {
            if (resolved) return
            try {
              await audio.play()
              setPlaying(true)
              resolved = true
              cleanup()
              resolve()
            } catch (playErr: unknown) {
              console.error('Radio play failed (canplaythrough):', playErr)
              cleanup()
              reject(playErr)
            }
          }

          const handleLoadedData = () => {
            // Try to play if we have enough data
            if (audio.readyState >= 2 && !resolved) {
              audio
                .play()
                .then(() => {
                  setPlaying(true)
                  resolved = true
                  cleanup()
                  resolve()
                })
                .catch(() => {
                  // Don't reject yet, wait for canplay
                })
            }
          }

          const handleError = (e: Event) => {
            if (resolved) return
            const audioEl = e.target as HTMLAudioElement
            const err = audioEl.error
            console.error('Radio stream error:', err, 'code:', err?.code)
            resolved = true
            cleanup()
            reject(new Error(`Stream error: ${err?.code || 'Unknown'}`))
          }

          // Try immediate play first (works for some streams)
          audio
            .play()
            .then(() => {
              setPlaying(true)
              resolved = true
              cleanup()
              resolve()
            })
            .catch(() => {
              // Continue to event-based approach
              audio.addEventListener('canplay', handleCanPlay, { once: true })
              audio.addEventListener('canplaythrough', handleCanPlayThrough, { once: true })
              audio.addEventListener('loadeddata', handleLoadedData, { once: true })
              audio.addEventListener('error', handleError, { once: true })

              // Timeout after 15 seconds
              setTimeout(() => {
                if (!resolved && audio.readyState < 2) {
                  console.error('Radio stream load timeout')
                  resolved = true
                  cleanup()
                  reject(new Error('Stream load timeout - URL may be inaccessible'))
                }
              }, 15000)
            })
        })
      } catch (err: unknown) {
        console.error('Radio playback error:', err)
        
        let errorMsg = 'Failed to play radio stream.'
        const e = err as { name?: string; message?: string }
        if (e.name === 'NotAllowedError') {
          errorMsg = 'Autoplay blocked. Please click play again.'
        } else if (e.name === 'NotSupportedError') {
          errorMsg = 'Stream format not supported by your browser.'
        } else if (e.message) {
          errorMsg = e.message
        }
        
        setError(errorMsg)
        setPlaying(false)
        setOpen(true)
      }
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  async function changeStation(id: number) {
    setStationId(id)
    const audio = audioRef.current
    const station = stations.find((s) => s.id === id)
    if (!audio || !station) return

    if (playing) {
      try {
        setError(null)

        // Stop current playback
        audio.pause()
        audio.src = ''
        
        // Set new source
        audio.src = station.url
        
        // Wait for stream to be ready before playing
        await new Promise<void>((resolve, reject) => {
          const handleCanPlay = () => {
            audio.removeEventListener('canplay', handleCanPlay)
            audio.removeEventListener('error', handleError)
            audio.play()
              .then(() => resolve())
              .catch(reject)
          }
          
          const handleError = (e: Event) => {
            audio.removeEventListener('canplay', handleCanPlay)
            audio.removeEventListener('error', handleError)
            reject(new Error('Failed to load stream'))
          }
          
          audio.addEventListener('canplay', handleCanPlay, { once: true })
          audio.addEventListener('error', handleError, { once: true })
          audio.load()
          
          setTimeout(() => {
            if (audio.readyState < 2) {
              audio.removeEventListener('canplay', handleCanPlay)
              audio.removeEventListener('error', handleError)
              reject(new Error('Stream load timeout'))
            }
          }, 10000)
        })
      } catch (err: unknown) {
        console.error('Station change error:', err)
        const msg = err instanceof Error ? err.message : ''
        setError(msg || 'Failed to switch station.')
        setPlaying(false)
        setOpen(true)
      }
    }
  }

  const isMuted = volume === 0

  return (
    <>
      <audio ref={audioRef} preload="none" playsInline />

      {open ? (
        <div
          className="fixed inset-x-0 bottom-[var(--radio-bar-h)] z-[190] max-h-[min(50vh,24rem)] overflow-y-auto border-t border-az-sand bg-az-cream/98 px-4 py-4 shadow-[0_-12px_40px_rgba(26,20,18,0.12)] backdrop-blur-md md:px-6"
          role="dialog"
          aria-label="Stations and volume"
        >
          {error ? (
            <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2">
              <p className="text-xs text-red-800">{error}</p>
            </div>
          ) : null}

          {loading ? (
            <div className="py-6 text-center font-sans text-sm text-az-ink-muted">Loading stations…</div>
          ) : stations.length === 0 ? (
            <div className="py-6 text-center font-sans text-sm text-az-ink-muted">
              No stations configured. Set{' '}
              <code className="rounded bg-az-sand px-1 text-xs">NEXT_PUBLIC_RADIO_STATION_1_URL</code> in{' '}
              <code className="rounded bg-az-sand px-1 text-xs">.env.local</code>.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {stations.map((s) => (
                <button
                  key={s.id}
                  suppressHydrationWarning
                  type="button"
                  onClick={() => changeStation(s.id)}
                  className={cn(
                    'rounded-xl border px-3 py-2.5 text-left font-sans text-xs font-semibold transition',
                    stationId === s.id
                      ? 'border-az-terracotta bg-az-terracotta/10 text-az-terracotta-deep'
                      : 'border-az-sand bg-white text-az-ink hover:border-az-terracotta/40'
                  )}
                  title={s.genre ? `${s.name} • ${s.genre}` : s.name}
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center gap-3 border-t border-az-sand/80 pt-4">
            <button
              suppressHydrationWarning
              type="button"
              onClick={() => setVolume((v) => (v === 0 ? 0.8 : 0))}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-az-sand bg-white text-az-ink hover:bg-az-cream-dark"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <input
              suppressHydrationWarning
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="h-2 w-full accent-az-terracotta"
              aria-label="Volume"
            />
          </div>

          {!current?.url ? (
            <p className="mt-3 font-sans text-xs text-az-ink-muted">
              Configure stream URLs in <code className="rounded bg-az-sand px-1">apps/web/.env.local</code>.
            </p>
          ) : null}

          {process.env.NODE_ENV === 'development' ? (
            <details className="mt-3 font-sans text-xs text-az-ink-muted">
              <summary className="cursor-pointer">Debug</summary>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-az-sand/50 p-2 text-[10px]">
                {JSON.stringify(
                  {
                    station: current?.name,
                    playing,
                    stations: stations.length
                  },
                  null,
                  2
                )}
              </pre>
            </details>
          ) : null}
        </div>
      ) : null}

      <div className="fixed bottom-0 left-0 right-0 z-[195] border-t border-white/10 bg-az-ink/96 pb-[max(8px,env(safe-area-inset-bottom,0px))] text-az-cream shadow-[0_-8px_32px_rgba(26,20,18,0.25)] backdrop-blur-md">
        <div className="container-page flex min-h-[var(--radio-bar-h)] items-center gap-3 py-2 md:gap-4 md:py-2.5">
          <Link
            href="/gta-radio"
            className="hidden shrink-0 items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-az-gold transition hover:border-az-gold/50 sm:flex"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            GTA Radio
          </Link>

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-az-terracotta text-white shadow-md">
              <Radio className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-az-gold/90">
                {playing ? 'Live' : 'Ready'}
              </p>
              <p className="truncate font-sans text-sm font-semibold leading-tight">{current?.name || 'Select a station'}</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              suppressHydrationWarning
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 items-center gap-1 rounded-full border border-white/15 px-3 font-sans text-xs font-bold uppercase tracking-wider text-az-cream hover:bg-white/10"
              aria-expanded={open}
            >
              <ChevronUp className={cn('h-4 w-4 transition', open ? 'rotate-180' : '')} />
              <span className="hidden sm:inline">{open ? 'Hide' : 'Stations'}</span>
            </button>
            <button
              suppressHydrationWarning
              type="button"
              onClick={togglePlay}
              className="grid h-11 w-11 place-items-center rounded-full bg-az-gold text-az-ink shadow-md transition hover:bg-white"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
