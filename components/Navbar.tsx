'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'rgba(10, 8, 4, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(212, 152, 15, 0.2)',
        width: '100%',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Image
                src="/images/logo-3j.PNG"
                alt="3J Interior"
                width={64}
                height={64}
                style={{ height: '54px', width: 'auto', objectFit: 'contain' }}
                priority
              />
            </div>
            <div>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fdf6e3', lineHeight: 1, margin: 0 }}>3J Interior</p>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4980f', marginTop: '3px', margin: 0 }}>Gudang WPC Premium</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex" style={{ alignItems: 'center', gap: 0 }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '8px 14px',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: 'rgba(253, 246, 227, 0.75)',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#d4980f')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253, 246, 227, 0.75)')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Kanan */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* WA Button desktop */}
            <a
              href="https://wa.me/6281385887778"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex btn-gold"
              style={{
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp
            </a>

            {/* Hamburger mobile */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label="Toggle menu"
            >
              <div style={{ width: '22px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ display: 'block', height: '2px', background: '#fdf6e3', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
                <span style={{ display: 'block', height: '2px', background: '#fdf6e3', borderRadius: '2px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
                <span style={{ display: 'block', height: '2px', background: '#fdf6e3', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div style={{ overflow: 'hidden', maxHeight: menuOpen ? '500px' : '0', transition: 'max-height 0.3s ease' }}>
        <div style={{ background: 'rgba(10,8,4,0.98)', borderTop: '1px solid rgba(212,152,15,0.15)', padding: '16px 20px' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '12px 0',
                color: 'rgba(253,246,227,0.8)',
                borderBottom: '1px solid rgba(212,152,15,0.1)',
                fontSize: '0.95rem',
                fontWeight: 400,
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/6281385887778"
            target="_blank"
            rel="noopener noreferrer"
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
