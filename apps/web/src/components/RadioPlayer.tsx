'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX, Pause, Play, Radio } from 'lucide-react'
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
        console.log('Ignoring error - no valid stream URL set')
        return
      }
      
      // Check current playing state from the audio element itself
      // Don't rely on closure variable to avoid dependency issues
      if (audioEl.paused && audioEl.readyState === 0) {
        console.log('Ignoring error - not actively playing')
        return
      }
      
      let errorMessage = 'Failed to load radio stream.'
      
      if (error) {
        switch (error.code) {
          case error.MEDIA_ERR_ABORTED:
            // Aborted errors are often false positives during source changes
            console.log('Stream loading was aborted (likely during source change)')
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

    const handleLoadStart = () => {
      console.log('Audio load started:', audio.src)
    }

    const handlePlaying = () => {
      console.log('Audio is playing')
      setError(null)
    }

    const handleStalled = () => {
      console.warn('Audio stream stalled')
    }

    audio.addEventListener('error', handleError)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('playing', handlePlaying)
    audio.addEventListener('stalled', handleStalled)

    return () => {
    audio.removeEventListener('error', handleError)
    audio.removeEventListener('canplay', handleCanPlay)
    audio.removeEventListener('loadstart', handleLoadStart)
    audio.removeEventListener('playing', handlePlaying)
    audio.removeEventListener('stalled', handleStalled)
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
        console.log('=== Starting Playback ===')
        console.log('URL:', current.url)
        console.log('Audio element:', audio)
        console.log('Current src:', audio.src)
        console.log('ReadyState:', audio.readyState)
        
        // Stop any current playback first
        audio.pause()
        audio.src = ''
        
        // Small delay to ensure cleanup
        await new Promise(resolve => setTimeout(resolve, 50))
        
        // Set the new source
        audio.src = current.url
        console.log('Set src to:', audio.src)
        
        // Load the stream
        audio.load()
        console.log('Called load(), readyState:', audio.readyState)
        
        // Wait for stream to be ready, then play
        await new Promise<void>((resolve, reject) => {
          let resolved = false
          
          const cleanup = () => {
            audio.removeEventListener('canplay', handleCanPlay)
            audio.removeEventListener('canplaythrough', handleCanPlayThrough)
            audio.removeEventListener('loadeddata', handleLoadedData)
            audio.removeEventListener('error', handleError)
            audio.removeEventListener('stalled', handleStalled)
          }
          
          const handleCanPlay = async () => {
            if (resolved) return
            console.log('canplay event fired, readyState:', audio.readyState)
            try {
              await audio.play()
              console.log('✅ Playback started successfully!')
              setPlaying(true)
              resolved = true
              cleanup()
              resolve()
            } catch (playErr: any) {
              console.error('❌ Play failed:', playErr)
              cleanup()
              reject(playErr)
            }
          }
          
          const handleCanPlayThrough = async () => {
            if (resolved) return
            console.log('canplaythrough event fired')
            try {
              await audio.play()
              console.log('✅ Playback started (canplaythrough)!')
              setPlaying(true)
              resolved = true
              cleanup()
              resolve()
            } catch (playErr: any) {
              console.error('❌ Play failed:', playErr)
              cleanup()
              reject(playErr)
            }
          }
          
          const handleLoadedData = () => {
            console.log('loadeddata event fired, readyState:', audio.readyState)
            // Try to play if we have enough data
            if (audio.readyState >= 2 && !resolved) {
              audio.play()
                .then(() => {
                  console.log('✅ Playback started (loadeddata)!')
                  setPlaying(true)
                  resolved = true
                  cleanup()
                  resolve()
                })
                .catch((playErr: any) => {
                  console.log('Play attempt failed, waiting for canplay:', playErr)
                  // Don't reject yet, wait for canplay
                })
            }
          }
          
          const handleError = (e: Event) => {
            if (resolved) return
            const audioEl = e.target as HTMLAudioElement
            const error = audioEl.error
            console.error('❌ Stream error:', error, 'Code:', error?.code)
            resolved = true
            cleanup()
            reject(new Error(`Stream error: ${error?.code || 'Unknown'}`))
          }
          
          const handleStalled = () => {
            console.warn('⚠️ Stream stalled')
          }
          
          // Try immediate play first (works for some streams)
          audio.play()
            .then(() => {
              console.log('✅ Immediate play succeeded!')
              setPlaying(true)
              resolved = true
              cleanup()
              resolve()
            })
            .catch((immediateErr: any) => {
              console.log('Immediate play failed, waiting for stream:', immediateErr.name, immediateErr.message)
              // Continue to event-based approach
              
              // Add event listeners
              audio.addEventListener('canplay', handleCanPlay, { once: true })
              audio.addEventListener('canplaythrough', handleCanPlayThrough, { once: true })
              audio.addEventListener('loadeddata', handleLoadedData, { once: true })
              audio.addEventListener('error', handleError, { once: true })
              audio.addEventListener('stalled', handleStalled)
              
              // Timeout after 15 seconds
              setTimeout(() => {
                if (!resolved && audio.readyState < 2) {
                  console.error('❌ Stream load timeout')
                  resolved = true
                  cleanup()
                  reject(new Error('Stream load timeout - URL may be inaccessible'))
                }
              }, 15000)
            })
        })
      } catch (err: any) {
        console.error('❌ Playback error:', err)
        
        let errorMsg = 'Failed to play radio stream.'
        if (err.name === 'NotAllowedError') {
          errorMsg = 'Autoplay blocked. Please click play again.'
        } else if (err.name === 'NotSupportedError') {
          errorMsg = 'Stream format not supported by your browser.'
        } else if (err.message) {
          errorMsg = err.message
        }
        
        setError(errorMsg)
        setPlaying(false)
        setOpen(true)
      }
    } else {
      console.log('Pausing playback')
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
        console.log('Changing station to:', station.url)
        
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
      } catch (err: any) {
        console.error('Station change error:', err)
        setError(err.message || 'Failed to switch station.')
        setPlaying(false)
        setOpen(true)
      }
    }
  }

  const isMuted = volume === 0

  return (
    <>
      {/* Audio element for streaming radio stations */}
      {/* Note: crossOrigin removed - many streams don't support it and it can cause CORS errors */}
      <audio 
        ref={audioRef} 
        preload="none"
        playsInline
      />

      <div className={cn('fixed bottom-4 right-4 z-50')}> 
        <div className="w-[320px] rounded-2xl border border-slate-200 bg-white shadow-lg">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white">
                <Radio className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold leading-tight">Glass Radio</div>
                <div className="text-xs text-slate-500 leading-tight">{current?.name || 'Station 1'}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setOpen((v) => !v)}
                className="rounded-xl border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                {open ? 'Hide' : 'Stations'}
              </button>
              <button
                onClick={togglePlay}
                className="grid h-9 w-9 place-items-center rounded-xl bg-brand-orange-500 text-white hover:bg-brand-orange-600"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {open && (
            <div className="border-t border-slate-200 px-3 py-3">
              {error && (
                <div className="mb-3 rounded-lg bg-red-50 border border-red-200 px-3 py-2">
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              )}
              
              {loading ? (
                <div className="py-4 text-center text-xs text-slate-500">
                  Loading stations...
                </div>
              ) : stations.length === 0 ? (
                <div className="py-4 text-center text-xs text-slate-500">
                  No stations configured. Set NEXT_PUBLIC_RADIO_STATION_1_NAME and NEXT_PUBLIC_RADIO_STATION_1_URL in .env.local
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {stations.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => changeStation(s.id)}
                      className={cn(
                        'rounded-xl border px-3 py-2 text-left text-xs font-semibold',
                        stationId === s.id
                          ? 'border-brand-orange-500 bg-brand-orange-50 text-brand-orange-700'
                          : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                      )}
                      title={s.genre ? `${s.name} • ${s.genre}` : s.name}
                    >
                      {s.name}
                      {s.source === 'sanity' && (
                        <span className="ml-1 text-[10px] text-slate-400">•</span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={() => setVolume((v) => (v === 0 ? 0.8 : 0))}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 hover:bg-slate-50"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {!current.url && (
                <p className="mt-3 text-xs text-slate-500">
                  Configure station stream URLs in <code className="rounded bg-slate-100 px-1">apps/web/.env.local</code>.
                </p>
              )}
              
              {/* Debug info - remove in production */}
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-3 text-xs">
                  <summary className="cursor-pointer text-slate-500">Debug Info</summary>
                  <div className="mt-2 rounded bg-slate-100 p-2 font-mono text-[10px]">
                    <div>Current Station: {current.name}</div>
                    <div>Source: {current.source}</div>
                    <div>URL: {current.url || 'Not set'}</div>
                    <div>Playing: {playing ? 'Yes' : 'No'}</div>
                    <div>Total stations: {stations.length}</div>
                    <div>Fallback: {stations.filter(s => s.source === 'fallback').length}</div>
                    <div>Sanity: {stations.filter(s => s.source === 'sanity').length}</div>
                  </div>
                </details>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
