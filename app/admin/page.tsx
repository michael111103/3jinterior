'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

    // Simple auth - in production use proper JWT/session
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
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #d4980f 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #d4980f 0%, transparent 70%)' }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center mx-auto mb-4 shadow-xl" style={{ boxShadow: '0 0 40px rgba(212,152,15,0.3)' }}>
            <span className="text-dark-900 font-display font-bold text-xl">3J</span>
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

          <div className="mt-6 pt-5 border-t border-gold-900/20">
            <p className="text-cream/30 text-xs font-body text-center">Default: admin / 3jinterior2026</p>
          </div>
        </div>
      </div>
    </div>
  )
}
