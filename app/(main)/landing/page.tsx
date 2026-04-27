import Link from 'next/link'
import { categories } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Landing Page Produk | 3J Interior',
  description: 'Halaman promosi untuk setiap kategori produk material interior WPC premium 3J Interior.',
}

export default function LandingIndexPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=70)` }} />
        <div className="absolute inset-0 bg-dark-900/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-500 text-xs font-body tracking-widest uppercase">Penawaran Spesial</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-cream">
            Landing <span className="gold-text">Page</span> Produk
          </h1>
          <p className="text-cream/60 font-body mt-3 max-w-xl mx-auto">
            Halaman penawaran spesial untuk setiap kategori produk unggulan kami
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/landing/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl gold-border product-card"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                <div className="absolute inset-0 img-gold-overlay" />
                <div className="absolute top-3 left-3">
                  <span className="bg-gold-500/90 text-dark-900 text-xs font-body font-bold px-3 py-1 rounded-full">
                    Landing #{i + 1}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-xl font-semibold text-cream group-hover:text-gold-400 transition-colors">{cat.name}</h3>
                <p className="text-cream/60 text-sm font-body mt-1 line-clamp-1">{cat.description}</p>
                <div className="flex items-center gap-2 mt-3 text-gold-400 text-sm font-body">
                  <span>Lihat Landing Page</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
