'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/products', label: 'Produk' },
  { href: '/articles', label: 'Artikel' },
  { href: '/landing', label: 'Landing Page' },
  { href: '/#about', label: 'Tentang Kami' },
  { href: '/#contact', label: 'Kontak' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  const textColor = isDark ? 'rgba(253,246,227,0.75)' : 'rgba(26,18,8,0.7)'
  const navBg = isDark ? 'rgba(10,8,4,0.95)' : 'rgba(245,240,232,0.96)'
  const navBorder = isDark ? 'rgba(212,152,15,0.2)' : 'rgba(180,130,10,0.25)'
  const mobileBg = isDark ? 'rgba(10,8,4,0.98)' : 'rgba(245,240,232,0.98)'
  const mobileBorder = isDark ? 'rgba(212,152,15,0.15)' : 'rgba(180,130,10,0.18)'
  const hamburgerColor = isDark ? '#fdf6e3' : '#1a1208'

  return (
    <header
      style={{
        position: 'sticky',
        top: 0, left: 0, right: 0,
        zIndex: 9999,
        background: navBg,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${navBorder}`,
        width: '100%',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '50%',
              width: '50px', height: '50px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Image src="/images/logo-3j.PNG" alt="3J Interior" width={64} height={64}
                style={{ height: '54px', width: 'auto', objectFit: 'contain' }} priority />
            </div>
            <div>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', color: isDark ? '#fdf6e3' : '#1a1208', lineHeight: 1, margin: 0, marginBottom: '5px', transition: 'color 0.3s' }}>3J Interior</p>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4a843', margin: 0 }}>Gudang WPC Premium</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex" style={{ alignItems: 'center', gap: 0 }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                style={{ padding: '8px 14px', fontSize: '0.875rem', fontWeight: 400, color: textColor, textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#d4980f')}
                onMouseLeave={e => (e.currentTarget.style.color = textColor)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>

            {/* Theme Toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle tema"
              title={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
              style={{
                width: '38px', height: '22px',
                borderRadius: '9999px',
                border: `1.5px solid ${isDark ? 'rgba(212,152,15,0.5)' : 'rgba(180,130,10,0.4)'}`,
                background: isDark ? 'rgba(212,152,15,0.15)' : 'rgba(212,152,15,0.2)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease',
                flexShrink: 0,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Track icons */}
              <span style={{
                position: 'absolute', left: '4px', fontSize: '9px',
                opacity: isDark ? 0.4 : 0, transition: 'opacity 0.3s',
              }}>🌙</span>
              <span style={{
                position: 'absolute', right: '4px', fontSize: '9px',
                opacity: isDark ? 0 : 0.8, transition: 'opacity 0.3s',
              }}>☀️</span>
              {/* Knob */}
              <span style={{
                position: 'absolute',
                width: '16px', height: '16px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4980f, #b87a0a)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                left: isDark ? '2px' : '18px',
                transition: 'left 0.3s ease',
              }} />
            </button>

            {/* WA Button desktop */}
            <a
              href="https://wa.me/6281385887778"
              target="_blank" rel="noopener noreferrer"
              className="hidden md:flex btn-gold"
              style={{ alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp
            </a>

            {/* Hamburger mobile */}
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
              style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label="Toggle menu"
            >
              <div style={{ width: '22px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ display: 'block', height: '2px', background: hamburgerColor, borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
                <span style={{ display: 'block', height: '2px', background: hamburgerColor, borderRadius: '2px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
                <span style={{ display: 'block', height: '2px', background: hamburgerColor, borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div style={{ overflow: 'hidden', maxHeight: menuOpen ? '520px' : '0', transition: 'max-height 0.3s ease' }}>
        <div style={{ background: mobileBg, borderTop: `1px solid ${mobileBorder}`, padding: '16px 20px', transition: 'background 0.3s' }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              style={{ display: 'block', padding: '12px 0', color: textColor, borderBottom: `1px solid ${mobileBorder}`, fontSize: '0.95rem', fontWeight: 400, textDecoration: 'none', transition: 'color 0.2s' }}
            >
              {link.label}
            </Link>
          ))}

          {/* Theme toggle mobile */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: `1px solid ${mobileBorder}` }}>
            <span style={{ fontSize: '0.9rem', color: textColor, fontFamily: 'Jost, sans-serif' }}>
              {isDark ? '🌙 Mode Gelap' : '☀️ Mode Terang'}
            </span>
            <button onClick={toggle}
              style={{
                width: '44px', height: '24px', borderRadius: '9999px',
                border: `1.5px solid rgba(212,152,15,0.4)`,
                background: isDark ? 'rgba(212,152,15,0.15)' : 'rgba(212,152,15,0.25)',
                cursor: 'pointer', position: 'relative', padding: 0,
                display: 'flex', alignItems: 'center', transition: 'all 0.3s',
              }}
            >
              <span style={{
                position: 'absolute',
                width: '18px', height: '18px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4980f, #b87a0a)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                left: isDark ? '2px' : '22px',
                transition: 'left 0.3s ease',
              }} />
            </button>
          </div>

          <a href="https://wa.me/6281385887778" target="_blank" rel="noopener noreferrer"
            className="btn-gold"
            style={{ display: 'block', textAlign: 'center', marginTop: '16px', padding: '12px', borderRadius: '9999px', fontWeight: 500, textDecoration: 'none' }}
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}
