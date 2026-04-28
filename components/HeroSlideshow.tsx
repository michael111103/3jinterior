'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { SlideItem } from '@/types'

interface Props {
  slides: SlideItem[]
}

export default function HeroSlideshow({ slides }: Props) {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchStartX = useRef<number | null>(null)

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
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [current, next])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(deltaX) > 50) {
      deltaX < 0 ? next() : prev()
    }
    touchStartX.current = null
  }

  const slide = slides[current]

  return (
    <section
      className="relative h-[55vh] sm:h-[65vh] md:h-[75vh] min-h-[320px] max-h-[800px] overflow-hidden w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides background */}
      {slides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${s.image})`,
              transform: idx === current ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 8000ms ease',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-500 to-transparent" />
        </div>
      ))}

      {/* Slide content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
          <div className="max-w-2xl">
            <div className={`flex items-center gap-3 mb-3 transition-all duration-700 delay-100 ${!isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="h-px w-12 bg-gold-500" />
              <span className="text-gold-400 text-xs md:text-sm font-body tracking-widest uppercase">Material Interior Premium</span>
            </div>

            <h1 className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 transition-all duration-700 delay-200 ${!isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="text-cream">{slide.title}</span>
            </h1>

            <p className={`text-cream/70 text-sm sm:text-base md:text-lg font-body font-light mb-6 leading-relaxed transition-all duration-700 delay-300 ${!isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {slide.subtitle}
            </p>

            <div className={`flex flex-wrap gap-3 transition-all duration-700 delay-400 ${!isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {slide.cta && slide.ctaLink && (
                <Link href={slide.ctaLink} className="btn-gold px-6 md:px-8 py-3 rounded-full font-body font-medium text-sm tracking-wide">
                  {slide.cta}
                </Link>
              )}
              <a
                href="https://wa.me/6281385887778"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 md:px-8 py-3 rounded-full font-body font-medium text-sm tracking-wide border border-gold-600/40 text-cream/80 hover:text-gold-400 hover:border-gold-400 transition-all duration-300"
              >
                Konsultasi Gratis
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Prev/Next buttons */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all duration-300 group"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`transition-all duration-300 rounded-full ${idx === current ? 'w-8 h-2 bg-gold-400' : 'w-2 h-2 bg-white/40 hover:bg-gold-600'}`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="hidden md:block absolute bottom-5 right-5 z-30 text-sm" style={{ fontFamily: 'inherit' }}>
        <span className="text-gold-400">{String(current + 1).padStart(2, '0')}</span>
        <span className="text-white/30 mx-1">/</span>
        <span className="text-white/50">{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  )
}
