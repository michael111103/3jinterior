'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { products as initialProducts, categories, articles as initialArticles, siteSettings as initialSettings } from '@/lib/data'
import { Product, Article } from '@/types'

type Tab = 'overview' | 'products' | 'articles' | 'settings' | 'slideshow'

const ADMIN_KEY = '3j_admin'

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('overview')
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [settings, setSettings] = useState(initialSettings)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({ category: categories[0].slug })
  const [toast, setToast] = useState('')
  const [searchProd, setSearchProd] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem(ADMIN_KEY)
      if (!auth) router.replace('/admin')

      // Load from localStorage if saved
      const saved = localStorage.getItem('3j_products')
      if (saved) setProducts(JSON.parse(saved))
      const savedArticles = localStorage.getItem('3j_articles')
      if (savedArticles) setArticles(JSON.parse(savedArticles))
      const savedSettings = localStorage.getItem('3j_settings')
      if (savedSettings) setSettings(JSON.parse(savedSettings))
    }
  }, [router])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const saveProducts = (prods: Product[]) => {
    setProducts(prods)
    localStorage.setItem('3j_products', JSON.stringify(prods))
    showToast('Produk berhasil disimpan!')
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category) return
    const prod: Product = {
      id: `p-${Date.now()}`,
      name: newProduct.name || '',
      category: newProduct.category || categories[0].slug,
      description: newProduct.description || '',
      image: newProduct.image || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
      sizes: newProduct.sizes,
      featured: newProduct.featured,
    }
    saveProducts([...products, prod])
    setNewProduct({ category: categories[0].slug })
    setShowAddProduct(false)
  }

  const handleDeleteProduct = (id: string) => {
    if (!confirm('Yakin hapus produk ini?')) return
    saveProducts(products.filter(p => p.id !== id))
  }

  const handleUpdateProduct = () => {
    if (!editingProduct) return
    saveProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p))
    setEditingProduct(null)
  }

  const handleSaveSettings = () => {
    localStorage.setItem('3j_settings', JSON.stringify(settings))
    showToast('Pengaturan berhasil disimpan!')
  }

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_KEY)
    router.push('/admin')
  }

  const filteredProducts = products.filter(p =>
    !searchProd || p.name.toLowerCase().includes(searchProd.toLowerCase())
  )

  const navItems: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'products', label: 'Produk', icon: '📦' },
    { id: 'articles', label: 'Artikel', icon: '📝' },
    { id: 'slideshow', label: 'Slideshow', icon: '🖼️' },
    { id: 'settings', label: 'Pengaturan', icon: '⚙️' },
  ]

  return (
    <div className="flex min-h-screen bg-dark-900">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-800 border-r border-gold-900/30 flex flex-col fixed h-full z-40">
        {/* Logo */}
        <div className="p-6 border-b border-gold-900/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center">
              <span className="text-dark-900 font-display font-bold text-sm">3J</span>
            </div>
            <div>
              <p className="font-display font-semibold gold-text text-base">3J Interior</p>
              <p className="text-gold-700 text-xs font-body">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-body transition-all duration-200 text-left ${
                tab === item.id
                  ? 'bg-gold-900/40 text-gold-400 border border-gold-800/40'
                  : 'text-cream/60 hover:text-cream hover:bg-dark-700'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Links */}
        <div className="p-4 border-t border-gold-900/20 space-y-2">
          <a href="/" target="_blank" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-body text-cream/50 hover:text-cream hover:bg-dark-700 transition-all">
            <span>🌐</span> Lihat Website
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-body text-red-400/70 hover:text-red-400 hover:bg-red-900/10 transition-all"
          >
            <span>🚪</span> Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 p-6 md:p-8 overflow-auto">
        {/* Toast */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 bg-green-900/90 border border-green-700/50 text-green-300 px-5 py-3 rounded-xl font-body text-sm shadow-xl">
            ✓ {toast}
          </div>
        )}

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div>
            <h1 className="font-display text-3xl font-bold text-cream mb-2">Dashboard</h1>
            <p className="text-cream/50 font-body text-sm mb-8">Selamat datang di panel admin 3J Interior</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {[
                { label: 'Total Produk', value: products.length, icon: '📦', color: 'from-gold-700 to-gold-900' },
                { label: 'Kategori', value: categories.length, icon: '🏷️', color: 'from-blue-800 to-blue-900' },
                { label: 'Artikel', value: articles.length, icon: '📝', color: 'from-purple-800 to-purple-900' },
                { label: 'Landing Pages', value: categories.length, icon: '🎯', color: 'from-green-800 to-green-900' },
              ].map(stat => (
                <div key={stat.label} className={`glass-card rounded-xl p-5 bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <p className="font-display text-3xl font-bold text-cream">{stat.value}</p>
                  <p className="text-cream/60 text-sm font-body mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold text-gold-400 mb-4">Produk Terbaru</h3>
                <div className="space-y-3">
                  {products.slice(-5).reverse().map(p => (
                    <div key={p.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${p.image})` }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-cream text-sm font-body truncate">{p.name}</p>
                        <p className="text-cream/40 text-xs">{categories.find(c => c.slug === p.category)?.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold text-gold-400 mb-4">Aksi Cepat</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Tambah Produk Baru', action: () => { setTab('products'); setShowAddProduct(true) } },
                    { label: 'Edit Pengaturan Website', action: () => setTab('settings') },
                    { label: 'Lihat Semua Artikel', action: () => setTab('articles') },
                    { label: 'Buka Website', action: () => window.open('/', '_blank') },
                  ].map(item => (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className="w-full text-left px-4 py-3 glass-card rounded-xl text-cream/70 hover:text-gold-400 font-body text-sm transition-all duration-200 flex items-center justify-between group"
                    >
                      {item.label}
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-3xl font-bold text-cream">Manajemen Produk</h1>
                <p className="text-cream/50 font-body text-sm mt-1">{products.length} produk terdaftar</p>
              </div>
              <button
                onClick={() => setShowAddProduct(true)}
                className="btn-gold px-5 py-2.5 rounded-xl font-body text-sm flex items-center gap-2"
              >
                + Tambah Produk
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-6 max-w-sm">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchProd}
                onChange={e => setSearchProd(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream placeholder-cream/30 font-body text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>

            {/* Add Product Modal */}
            {showAddProduct && (
              <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="glass-card rounded-2xl p-6 w-full max-w-lg" style={{ border: '1px solid rgba(212,152,15,0.3)' }}>
                  <h3 className="font-display text-xl font-bold text-cream mb-5">Tambah Produk Baru</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Nama Produk *</label>
                      <input
                        type="text"
                        value={newProduct.name || ''}
                        onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="Nama produk"
                      />
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Kategori *</label>
                      <select
                        value={newProduct.category || ''}
                        onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors"
                      >
                        {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Deskripsi</label>
                      <textarea
                        value={newProduct.description || ''}
                        onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none"
                        placeholder="Deskripsi produk"
                      />
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">URL Gambar</label>
                      <input
                        type="url"
                        value={newProduct.image || ''}
                        onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Ukuran (pisah dengan koma)</label>
                      <input
                        type="text"
                        onChange={e => setNewProduct({ ...newProduct, sizes: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="2.9m x 15cm, 2.9m x 20cm"
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={!!newProduct.featured} onChange={e => setNewProduct({ ...newProduct, featured: e.target.checked })} className="w-4 h-4 accent-gold-500" />
                      <span className="text-cream/70 font-body text-sm">Produk Featured (tampil di halaman utama)</span>
                    </label>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={handleAddProduct} className="btn-gold flex-1 py-2.5 rounded-xl font-body text-sm">Simpan Produk</button>
                    <button onClick={() => { setShowAddProduct(false); setNewProduct({ category: categories[0].slug }) }} className="flex-1 py-2.5 rounded-xl font-body text-sm border border-cream/20 text-cream/60 hover:text-cream transition-colors">Batal</button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Product Modal */}
            {editingProduct && (
              <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="glass-card rounded-2xl p-6 w-full max-w-lg" style={{ border: '1px solid rgba(212,152,15,0.3)' }}>
                  <h3 className="font-display text-xl font-bold text-cream mb-5">Edit Produk</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Nama Produk</label>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Kategori</label>
                      <select
                        value={editingProduct.category}
                        onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors"
                      >
                        {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Deskripsi</label>
                      <textarea
                        value={editingProduct.description}
                        onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none"
                      />
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">URL Gambar</label>
                      <input
                        type="url"
                        value={editingProduct.image}
                        onChange={e => setEditingProduct({ ...editingProduct, image: e.target.value })}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors"
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={!!editingProduct.featured} onChange={e => setEditingProduct({ ...editingProduct, featured: e.target.checked })} className="w-4 h-4 accent-gold-500" />
                      <span className="text-cream/70 font-body text-sm">Produk Featured</span>
                    </label>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={handleUpdateProduct} className="btn-gold flex-1 py-2.5 rounded-xl font-body text-sm">Update Produk</button>
                    <button onClick={() => setEditingProduct(null)} className="flex-1 py-2.5 rounded-xl font-body text-sm border border-cream/20 text-cream/60 hover:text-cream transition-colors">Batal</button>
                  </div>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gold-900/30">
                      <th className="text-left px-5 py-3 text-gold-400 text-xs font-body tracking-widest uppercase">Produk</th>
                      <th className="text-left px-5 py-3 text-gold-400 text-xs font-body tracking-widest uppercase hidden md:table-cell">Kategori</th>
                      <th className="text-left px-5 py-3 text-gold-400 text-xs font-body tracking-widest uppercase hidden lg:table-cell">Ukuran</th>
                      <th className="text-center px-5 py-3 text-gold-400 text-xs font-body tracking-widest uppercase">Featured</th>
                      <th className="text-right px-5 py-3 text-gold-400 text-xs font-body tracking-widest uppercase">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="border-b border-gold-900/10 hover:bg-dark-700/30 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${product.image})` }} />
                            <p className="text-cream text-sm font-body line-clamp-1">{product.name}</p>
                          </div>
                        </td>
                        <td className="px-5 py-3 hidden md:table-cell">
                          <span className="text-xs font-body px-2.5 py-1 bg-gold-900/20 border border-gold-800/30 text-gold-500 rounded-full">
                            {categories.find(c => c.slug === product.category)?.name}
                          </span>
                        </td>
                        <td className="px-5 py-3 hidden lg:table-cell">
                          <p className="text-cream/50 text-xs font-body">{product.sizes?.join(', ') || '-'}</p>
                        </td>
                        <td className="px-5 py-3 text-center">
                          {product.featured
                            ? <span className="text-gold-400 text-xs">⭐ Ya</span>
                            : <span className="text-cream/30 text-xs">-</span>
                          }
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="text-xs px-3 py-1.5 border border-gold-800/40 text-gold-400 hover:bg-gold-900/20 rounded-lg font-body transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-xs px-3 py-1.5 border border-red-800/40 text-red-400 hover:bg-red-900/20 rounded-lg font-body transition-colors"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ARTICLES TAB */}
        {tab === 'articles' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-3xl font-bold text-cream">Manajemen Artikel</h1>
                <p className="text-cream/50 font-body text-sm mt-1">{articles.length} artikel tersedia</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map(article => (
                <div key={article.id} className="glass-card rounded-xl p-4 flex gap-4">
                  <div className="w-16 h-14 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${article.image})` }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-cream text-sm font-body font-medium line-clamp-1">{article.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {article.tags.slice(0, 1).map(t => (
                        <span key={t} className="text-xs font-body px-2 py-0.5 bg-gold-900/20 text-gold-500 rounded-full border border-gold-800/30">{t}</span>
                      ))}
                      <span className="text-cream/30 text-xs">{new Date(article.date).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-1 shrink-0">
                    <a href={`/articles/${article.slug}`} target="_blank" className="text-xs px-2 py-1.5 border border-gold-800/40 text-gold-400 hover:bg-gold-900/20 rounded-lg font-body transition-colors">View</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDESHOW TAB */}
        {tab === 'slideshow' && (
          <div>
            <h1 className="font-display text-3xl font-bold text-cream mb-2">Manajemen Slideshow</h1>
            <p className="text-cream/50 font-body text-sm mb-8">Kelola gambar dan konten slideshow halaman utama</p>

            <div className="glass-card rounded-xl p-6">
              <p className="text-cream/60 font-body text-sm mb-6">
                Slideshow saat ini menggunakan 5 slide otomatis. Untuk mengubah gambar, update URL di file <code className="text-gold-400 bg-dark-700 px-1.5 py-0.5 rounded text-xs">lib/data.ts</code> pada array <code className="text-gold-400 bg-dark-700 px-1.5 py-0.5 rounded text-xs">slides</code>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Panel WPC Premium', subtitle: 'Transformasi ruangan Anda...', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=60' },
                  { title: 'Wallboard & UV Marmer', subtitle: 'Material dinding mewah...', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=60' },
                  { title: 'Decking Outdoor', subtitle: 'Solusi taman dan teras...', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=60' },
                  { title: 'Harga Grosir Gudang', subtitle: 'Dapatkan harga terbaik...', img: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&q=60' },
                  { title: 'UV Marmer Mewah', subtitle: 'Tampilan marmer premium...', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=60' },
                ].map((slide, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden">
                    <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${slide.img})` }} />
                    <div className="absolute inset-0 bg-dark-900/60 p-3 flex flex-col justify-end">
                      <p className="text-cream text-sm font-display font-semibold">{slide.title}</p>
                      <p className="text-cream/60 text-xs font-body mt-0.5">{slide.subtitle}</p>
                      <span className="absolute top-2 left-2 bg-gold-600/90 text-dark-900 text-xs font-body font-bold px-2 py-0.5 rounded-full">Slide {i + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {tab === 'settings' && (
          <div>
            <h1 className="font-display text-3xl font-bold text-cream mb-2">Pengaturan Website</h1>
            <p className="text-cream/50 font-body text-sm mb-8">Ubah informasi kontak dan teks website</p>

            <div className="glass-card rounded-xl p-6 max-w-2xl">
              <div className="space-y-5">
                {[
                  { label: 'Nama Perusahaan', key: 'companyName' as const },
                  { label: 'Tagline', key: 'tagline' as const },
                  { label: 'Nomor Telepon / WhatsApp', key: 'phone' as const },
                  { label: 'Email', key: 'email' as const },
                  { label: 'Alamat', key: 'address' as const },
                  { label: 'Link WhatsApp (wa.me/...)', key: 'whatsappLink' as const },
                  { label: 'Link Google Maps', key: 'googleMapsLink' as const },
                ].map(field => (
                  <div key={field.key}>
                    <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">{field.label}</label>
                    {field.key === 'tagline' ? (
                      <textarea
                        value={settings[field.key]}
                        onChange={e => setSettings({ ...settings, [field.key]: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={settings[field.key]}
                        onChange={e => setSettings({ ...settings, [field.key]: e.target.value })}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors"
                      />
                    )}
                  </div>
                ))}

                <button
                  onClick={handleSaveSettings}
                  className="btn-gold px-8 py-3 rounded-xl font-body font-medium mt-2"
                >
                  Simpan Pengaturan
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
