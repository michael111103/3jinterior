'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 800))
    if (username === 'admin' && password === '3jinterior2026') {
      localStorage.setItem('3j_admin', 'authenticated')
      router.push('/admin/dashboard')
    } else {
      setError('Username atau password salah.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #d4980f 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #d4980f 0%, transparent 70%)' }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div style={{
              background: '#ffffff',
              borderRadius: '50%',
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 0 30px rgba(212,152,15,0.25)',
            }}>
              <Image
                src="/images/logo-3j.PNG"
                alt="3J Interior"
                width={64}
                height={64}
                style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <div className="text-left">
              <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fdf6e3', lineHeight: 1, margin: 0, marginBottom: '4px' }}>3J Interior</p>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4a843', margin: 0 }}>Gudang WPC Premium</p>
            </div>
          </div>
          <h1 className="font-display text-3xl font-bold gold-text">Admin Panel</h1>
          <p className="text-cream/50 font-body text-sm mt-1">3J Interior Management System</p>
        </div>

        {/* Form */}
        <div className="glass-card rounded-2xl p-8" style={{ border: '1px solid rgba(212,152,15,0.2)' }}>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-gold-400 text-xs font-body tracking-widest uppercase mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-700 border border-gold-800/30 rounded-xl text-cream placeholder-cream/30 font-body focus:outline-none focus:border-gold-500 transition-colors"
                placeholder="Masukkan username"
              />
            </div>
            <div>
              <label className="block text-gold-400 text-xs font-body tracking-widest uppercase mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-700 border border-gold-800/30 rounded-xl text-cream placeholder-cream/30 font-body focus:outline-none focus:border-gold-500 transition-colors"
                placeholder="Masukkan password"
              />
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-700/40 rounded-xl px-4 py-3 text-red-400 text-sm font-body">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3.5 rounded-xl font-body font-semibold text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Memproses...
                </span>
              ) : 'Masuk ke Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
