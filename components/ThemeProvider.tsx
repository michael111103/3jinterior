'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
    const initial = saved ?? 'dark'
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle tema"
      title={theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
      style={{
        padding: '7px',
        background: 'none',
        border: '1px solid rgba(212,152,15,0.35)',
        borderRadius: '50%',
        cursor: 'pointer',
        width: '34px',
        height: '34px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '15px',
        transition: 'border-color 0.2s, background 0.2s',
        flexShrink: 0,
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#d4980f')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(212,152,15,0.35)')}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
