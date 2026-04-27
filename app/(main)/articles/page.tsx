import Link from 'next/link'
import { articles } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artikel & Tips Interior | 3J Interior',
  description: 'Tips, panduan, dan inspirasi seputar material interior WPC, wallboard, decking, dan desain ruangan dari 3J Interior.',
}

export default function ArticlesPage() {
  const [featured, ...rest] = articles

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=70)` }} />
        <div className="absolute inset-0 bg-dark-900/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-500 text-xs font-body tracking-widest uppercase">Blog & Tips</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-cream">
            Artikel & <span className="gold-text">Inspirasi</span>
          </h1>
          <p className="text-cream/60 font-body mt-3">Tips dan panduan desain interior dari para ahli kami</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        {/* Featured Article */}
        <Link href={`/articles/${featured.slug}`} className="group block glass-card rounded-2xl overflow-hidden mb-12 product-card">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="aspect-video md:aspect-auto relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url(${featured.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark-900/0 to-dark-900/60 md:to-dark-900/0" />
              <span className="absolute top-4 left-4 bg-gold-500/90 text-dark-900 text-xs font-body font-semibold px-3 py-1 rounded-full">Artikel Utama</span>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-4">
                {featured.tags.map(tag => (
                  <span key={tag} className="text-xs font-body px-2 py-0.5 bg-gold-900/30 border border-gold-800/40 text-gold-500 rounded-full">{tag}</span>
                ))}
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-cream group-hover:text-gold-400 transition-colors leading-tight mb-4">{featured.title}</h2>
              <p className="text-cream/60 font-body leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-cream/40 text-sm font-body">{new Date(featured.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span className="text-gold-400 font-body text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Baca Selengkapnya
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Article Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(article => (
            <Link key={article.id} href={`/articles/${article.slug}`} className="glass-card rounded-xl overflow-hidden group product-card">
              <div className="aspect-video relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {article.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs font-body px-2 py-0.5 bg-gold-900/30 border border-gold-800/40 text-gold-500 rounded-full">{tag}</span>
                  ))}
                </div>
                <h3 className="font-display text-lg font-semibold text-cream group-hover:text-gold-400 transition-colors line-clamp-2 leading-snug">{article.title}</h3>
                <p className="text-cream/50 text-sm font-body mt-2 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-cream/40 text-xs font-body">{new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span className="text-gold-400 text-xs font-body">Baca →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
