'use client'
import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Product, Category } from '@/types'
import { supabase } from '@/lib/supabase'

// Lightbox: tampil gambar full layar
function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 999999,
        background: 'rgba(0,0,0,0.95)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'fixed', top: '16px', right: '16px', zIndex: 1000000,
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(212,152,15,0.5)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fdf6e3',
        }}
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <img
        src={src}
        alt={alt}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '95vw',
          maxHeight: '95vh',
          objectFit: 'contain',
          borderRadius: '8px',
          display: 'block',
        }}
      />
    </div>
  )
}

// Modal detail produk
function ProductModal({ product, categories, onClose }: { product: Product; categories: Category[]; onClose: () => void }) {
  const categoryName = categories.find(c => c.slug === product.category)?.name
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !lightboxOpen) onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose, lightboxOpen])

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: '#1a1507',
            border: '1px solid rgba(212,152,15,0.3)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '820px',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '12px', right: '12px', zIndex: 10,
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(212,152,15,0.3)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fdf6e3',
            }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <div
            onClick={() => setLightboxOpen(true)}
            style={{
              width: '100%', aspectRatio: '16/9', overflow: 'hidden',
              borderRadius: '16px 16px 0 0', flexShrink: 0,
              cursor: 'zoom-in', position: 'relative',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', bottom: '10px', right: '10px',
              background: 'rgba(0,0,0,0.55)', borderRadius: '6px',
              padding: '5px 9px', display: 'flex', alignItems: 'center', gap: '5px',
              color: '#fdf6e3', fontSize: '0.72rem',
            }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              Klik untuk perbesar
            </div>
          </div>

          <div style={{ padding: '24px' }}>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4980f' }}>
              {categoryName}
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fdf6e3', lineHeight: 1.3, margin: '8px 0 12px' }}>
              {product.name}
            </h2>
            <p style={{ color: 'rgba(253,246,227,0.65)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '20px' }}>
              {product.description}
            </p>

            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <p style={{ color: '#d4980f', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Ukuran Tersedia
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.sizes.map((size: string) => (
                    <span key={size} style={{
                      fontSize: '0.8rem', padding: '4px 10px',
                      background: 'rgba(212,152,15,0.1)', border: '1px solid rgba(212,152,15,0.3)',
                      color: '#d4980f', borderRadius: '6px',
                    }}>
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <a
              href={`https://wa.me/6281385887778?text=Halo,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.name)},%20mohon%20info%20harga%20dan%20ketersediaannya`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '8px', padding: '13px 24px', borderRadius: '9999px',
                fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Tanya Harga via WhatsApp
            </a>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <ImageLightbox
          src={product.image}
          alt={product.name}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}

function ProductsContent() {
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // ✅ REVISI: watch searchParams supaya klik footer dari halaman produk juga update kategori
  useEffect(() => {
    const category = searchParams.get('category') || 'all'
    setActiveCategory(category)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [searchParams])

  useEffect(() => {
    const load = async () => {
      const [{ data: productsData }, { data: categoriesData }] = await Promise.all([
        supabase.from('products').select('*').order('name'),
        supabase.from('categories').select('*').order('name'),
      ])
      if (productsData) setProducts(productsData)
      if (categoriesData) setCategories(categoriesData)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchCategory = activeCategory === 'all' || p.category === activeCategory
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [activeCategory, search, products])

  return (
    <div className="min-h-screen">
      {/* Header banner */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=70)` }} />
        <div className="absolute inset-0 bg-dark-900/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-500 text-xs font-body tracking-widest uppercase">Katalog</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-cream">
            Semua <span className="gold-text">Produk</span>
          </h1>
          <p className="text-cream/60 font-body mt-3 max-w-xl mx-auto">
            Material interior WPC premium dengan harga grosir langsung dari gudang
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-dark-700 border border-gold-800/30 rounded-xl text-cream placeholder-cream/40 font-body focus:outline-none focus:border-gold-500 transition-colors"
          />
        </div>

        {/* Filter kategori */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2 rounded-full text-sm font-body transition-all duration-200 ${activeCategory === 'all' ? 'btn-gold' : 'border border-gold-800/30 text-cream/60 hover:text-gold-400 hover:border-gold-600'}`}
          >
            Semua
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-5 py-2 rounded-full text-sm font-body transition-all duration-200 ${activeCategory === cat.slug ? 'btn-gold' : 'border border-gold-800/30 text-cream/60 hover:text-gold-400 hover:border-gold-600'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-cream/40 font-body text-lg">Memuat produk...</p>
          </div>
        ) : (
          <>
            <p className="text-cream/40 text-sm font-body mb-6">{filtered.length} produk ditemukan</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(product => (
                <div
                  key={product.id}
                  className="glass-card rounded-xl overflow-hidden product-card group cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    <span className="absolute top-2 left-2 bg-dark-800/80 backdrop-blur-sm text-gold-400 text-xs font-body px-2.5 py-1 rounded-full border border-gold-800/40">
                      {categories.find(c => c.slug === product.category)?.name}
                    </span>
                    <span className="absolute top-2 right-2 bg-dark-800/70 backdrop-blur-sm text-cream/80 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="font-display text-base font-semibold text-cream group-hover:text-gold-400 transition-colors leading-snug">{product.name}</h3>
                    <p className="text-cream/50 text-sm sm:text-xs font-body mt-1.5 line-clamp-2 leading-relaxed">{product.description}</p>
                    {product.sizes && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {product.sizes.map((size: string) => (
                          <span key={size} className="text-xs font-body px-2 py-0.5 bg-gold-900/20 border border-gold-800/30 text-gold-500 rounded">{size}</span>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={e => { e.stopPropagation(); setSelectedProduct(product) }}
                      className="mt-4 w-full btn-gold py-2.5 rounded-lg text-xs font-body font-medium flex items-center justify-center gap-2"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-cream/40 font-body text-lg">Tidak ada produk yang ditemukan</p>
              </div>
            )}
          </>
        )}
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} categories={categories} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen text-center text-cream/50 pt-20">Memuat...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
