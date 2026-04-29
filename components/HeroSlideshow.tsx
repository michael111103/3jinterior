'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { SlideItem } from '@/types'

interface Props {
  slides: SlideItem[]
}

export default function HeroSlideshow({ slides }: Props) {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const goTo = useCallback((idx: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent(idx)
    setTimeout(() => setIsAnimating(false), 700)
  }, [isAnimating])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, slides.length, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, slides.length, goTo])

  useEffect(() => {
    timerRef.current = setTimeout(next, 3000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current, next])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(deltaX) > 50) { deltaX < 0 ? next() : prev() }
    touchStartX.current = null
  }

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '220px' : 'clamp(320px, 70vh, 800px)',
        overflow: 'hidden',
        display: 'block',
        marginTop: 0,
        paddingTop: 0,
      }}
    >
      {/* Slides background */}
      {slides.map((s, idx) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: idx === current ? 1 : 0,
            zIndex: idx === current ? 10 : 0,
            transition: 'opacity 0.7s ease',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${s.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      ))}

      {/* Prev */}
      <button onClick={prev} aria-label="Previous" style={{
        position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
        zIndex: 30, width: '40px', height: '40px', borderRadius: '50%',
        background: 'rgba(0,0,0,0.45)', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="20" height="20" fill="none" stroke="#fdf6e3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      {/* Next */}
      <button onClick={next} aria-label="Next" style={{
        position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
        zIndex: 30, width: '40px', height: '40px', borderRadius: '50%',
        background: 'rgba(0,0,0,0.45)', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="20" height="20" fill="none" stroke="#fdf6e3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      {/* Dots */}
      <div style={{
        position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 30, display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Slide ${idx + 1}`}
            style={{
              border: 'none', cursor: 'pointer', borderRadius: '9999px',
              transition: 'all 0.3s',
              width: idx === current ? '32px' : '8px',
              height: '8px',
              background: idx === current ? '#d4980f' : 'rgba(255,255,255,0.35)',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Counter */}
      <div style={{ position: 'absolute', bottom: '20px', right: '16px', zIndex: 30, fontSize: '0.82rem' }}>
        <span style={{ color: '#d4980f' }}>{String(current + 1).padStart(2, '0')}</span>
        <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 4px' }}>/</span>
        <span style={{ color: 'rgba(255,255,255,0.45)' }}>{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  )
}
