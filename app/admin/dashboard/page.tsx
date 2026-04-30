'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Product, Category } from '@/types'
import { supabase } from '@/lib/supabase'

type Tab = 'overview' | 'products' | 'categories'

const ADMIN_KEY = '3j_admin'

// ─── KOMPONEN UPLOAD GAMBAR ───────────────────────────────
function ImageUploader({
  value,
  onChange,
}: {
  value: string
  onChange: (url: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [mode, setMode] = useState<'url' | 'upload'>('url')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false })
      if (error) throw error
      const { data } = supabase.storage.from('product-images').getPublicUrl(fileName)
      onChange(data.publicUrl)
    } catch (err) {
      alert('Gagal upload gambar. Coba lagi.')
      console.error(err)
    }
    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      {/* Toggle URL / Upload */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`text-xs px-3 py-1 rounded-lg font-body transition-colors ${mode === 'url' ? 'bg-gold-900/40 text-gold-400 border border-gold-800/40' : 'text-cream/40 border border-cream/10 hover:text-cream/60'}`}
        >
          Pakai URL
        </button>
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`text-xs px-3 py-1 rounded-lg font-body transition-colors ${mode === 'upload' ? 'bg-gold-900/40 text-gold-400 border border-gold-800/40' : 'text-cream/40 border border-cream/10 hover:text-cream/60'}`}
        >
          Unggah File
        </button>
      </div>

      {mode === 'url' ? (
        <input
          type="url"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors"
          placeholder="https://..."
        />
      ) : (
        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-full px-4 py-2.5 bg-dark-700 border border-dashed border-gold-800/50 rounded-xl text-cream/60 font-body text-sm hover:border-gold-500 hover:text-cream transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <svg className="animate-spin w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Mengunggah...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                </svg>
                Klik untuk unggah gambar
              </>
            )}
          </button>
          <p className="text-cream/30 text-xs font-body mt-1">JPG, PNG, WEBP — dari file atau galeri HP</p>
        </div>
      )}

      {value && (
        <div className="mt-2 w-full h-24 rounded-lg bg-cover bg-center border border-gold-800/20" style={{ backgroundImage: `url(${value})` }} />
      )}
    </div>
  )
}

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('overview')

  // Products
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({})
  const [searchProd, setSearchProd] = useState('')

  // Categories
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategory, setNewCategory] = useState<Partial<Category>>({})

  // Others
  const [toast, setToast] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem(ADMIN_KEY)
      if (!auth) router.replace('/admin')
      else {
        loadProducts()
        loadCategories()
      }
    }
  }, [router])

  // ─── PRODUCTS ───────────────────────────────────────────
  const loadProducts = async () => {
    setLoadingProducts(true)
    const { data, error } = await supabase.from('products').select('*').order('name')
    if (error) showToast('Gagal memuat produk: ' + error.message, 'error')
    else setProducts(data || [])
    setLoadingProducts(false)
  }

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.category) return
    setSaving(true)
    const prod = {
      id: `p-${Date.now()}`,
      name: newProduct.name || '',
      category: newProduct.category || '',
      description: newProduct.description || '',
      image: newProduct.image || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
      sizes: newProduct.sizes || [],
      featured: newProduct.featured || false,
    }
    const { error } = await supabase.from('products').insert([prod])
    if (error) showToast('Gagal menambah produk: ' + error.message, 'error')
    else {
      showToast('Produk berhasil ditambahkan!')
      setNewProduct({})
      setShowAddProduct(false)
      await loadProducts()
    }
    setSaving(false)
  }

  const handleUpdateProduct = async () => {
    if (!editingProduct) return
    setSaving(true)
    const { error } = await supabase.from('products').update({
      name: editingProduct.name,
      category: editingProduct.category,
      description: editingProduct.description,
      image: editingProduct.image,
      sizes: editingProduct.sizes,
      featured: editingProduct.featured,
    }).eq('id', editingProduct.id)
    if (error) showToast('Gagal update produk: ' + error.message, 'error')
    else {
      showToast('Produk berhasil diupdate!')
      setEditingProduct(null)
      await loadProducts()
    }
    setSaving(false)
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Yakin hapus produk ini?')) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) showToast('Gagal hapus produk: ' + error.message, 'error')
    else {
      showToast('Produk berhasil dihapus!')
      setProducts(products.filter(p => p.id !== id))
    }
  }

  // ─── CATEGORIES ─────────────────────────────────────────
  const loadCategories = async () => {
    setLoadingCategories(true)
    const { data, error } = await supabase.from('categories').select('*').order('name')
    if (error) showToast('Gagal memuat kategori: ' + error.message, 'error')
    else setCategories(data || [])
    setLoadingCategories(false)
  }

  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.slug) return
    setSaving(true)
    const cat = {
      id: `cat-${Date.now()}`,
      name: newCategory.name || '',
      slug: newCategory.slug || '',
      description: newCategory.description || '',
      image: newCategory.image || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
    }
    const { error } = await supabase.from('categories').insert([cat])
    if (error) showToast('Gagal menambah kategori: ' + error.message, 'error')
    else {
      showToast('Kategori berhasil ditambahkan!')
      setNewCategory({})
      setShowAddCategory(false)
      await loadCategories()
    }
    setSaving(false)
  }

  const handleUpdateCategory = async () => {
    if (!editingCategory) return
    setSaving(true)
    const { error } = await supabase.from('categories').update({
      name: editingCategory.name,
      slug: editingCategory.slug,
      description: editingCategory.description,
      image: editingCategory.image,
    }).eq('id', editingCategory.id)
    if (error) showToast('Gagal update kategori: ' + error.message, 'error')
    else {
      showToast('Kategori berhasil diupdate!')
      setEditingCategory(null)
      await loadCategories()
    }
    setSaving(false)
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Yakin hapus kategori ini? Produk dalam kategori ini tidak akan terhapus.')) return
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) showToast('Gagal hapus kategori: ' + error.message, 'error')
    else {
      showToast('Kategori berhasil dihapus!')
      setCategories(categories.filter(c => c.id !== id))
    }
  }

  // ─── HELPERS ────────────────────────────────────────────
  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast(msg)
    setToastType(type)
    setTimeout(() => setToast(''), 3500)
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
    { id: 'categories', label: 'Kategori', icon: '🏷️' },
  ]

  return (
    <div className="flex min-h-screen bg-dark-900">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-800 border-r border-gold-900/30 flex flex-col fixed h-full z-40">
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

        <div className="p-4 border-t border-gold-900/20 space-y-2">
          <a href="/" target="_blank" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-body text-cream/50 hover:text-cream hover:bg-dark-700 transition-all">
            <span>🌐</span> Lihat Website
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-body text-red-400/70 hover:text-red-400 hover:bg-red-900/10 transition-all">
            <span>🚪</span> Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 p-6 md:p-8 overflow-auto">
        {/* Toast */}
        {toast && (
          <div className={`fixed top-6 right-6 z-50 border px-5 py-3 rounded-xl font-body text-sm shadow-xl ${
            toastType === 'error'
              ? 'bg-red-900/90 border-red-700/50 text-red-300'
              : 'bg-green-900/90 border-green-700/50 text-green-300'
          }`}>
            {toastType === 'success' ? '✓' : '✕'} {toast}
          </div>
        )}

        {/* ── OVERVIEW ── */}
        {tab === 'overview' && (
          <div>
            <h1 className="font-display text-3xl font-bold text-cream mb-2">Dashboard</h1>
            <p className="text-cream/50 font-body text-sm mb-8">Selamat datang di panel admin 3J Interior</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {[
                { label: 'Total Produk', value: products.length, icon: '📦', color: 'from-gold-700 to-gold-900' },
                { label: 'Kategori', value: categories.length, icon: '🏷️', color: 'from-blue-800 to-blue-900' },
                { label: 'Landing Pages', value: categories.length, icon: '🎯', color: 'from-green-800 to-green-900' },
              ].map(stat => (
                <div key={stat.label} className={`glass-card rounded-xl p-5 bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                  <span className="text-2xl">{stat.icon}</span>
                  <p className="font-display text-3xl font-bold text-cream mt-3">{stat.value}</p>
                  <p className="text-cream/60 text-sm font-body mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold text-gold-400 mb-4">Produk Terbaru</h3>
                <div className="space-y-3">
                  {loadingProducts ? <p className="text-cream/40 text-sm font-body">Memuat...</p> :
                    products.slice(-5).reverse().map(p => (
                      <div key={p.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${p.image})` }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-cream text-sm font-body truncate">{p.name}</p>
                          <p className="text-cream/40 text-xs">{categories.find(c => c.slug === p.category)?.name || p.category}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold text-gold-400 mb-4">Aksi Cepat</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Tambah Produk Baru', action: () => { setTab('products'); setShowAddProduct(true) } },
                    { label: 'Tambah Kategori Baru', action: () => { setTab('categories'); setShowAddCategory(true) } },
                    { label: 'Buka Website', action: () => window.open('/', '_blank') },
                  ].map(item => (
                    <button key={item.label} onClick={item.action} className="w-full text-left px-4 py-3 glass-card rounded-xl text-cream/70 hover:text-gold-400 font-body text-sm transition-all duration-200 flex items-center justify-between group">
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

        {/* ── PRODUCTS ── */}
        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-3xl font-bold text-cream">Manajemen Produk</h1>
                <p className="text-cream/50 font-body text-sm mt-1">{products.length} produk di Supabase</p>
              </div>
              <button onClick={() => setShowAddProduct(true)} className="btn-gold px-5 py-2.5 rounded-xl font-body text-sm flex items-center gap-2">
                + Tambah Produk
              </button>
            </div>

            <div className="relative mb-6 max-w-sm">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input type="text" placeholder="Cari produk..." value={searchProd} onChange={e => setSearchProd(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream placeholder-cream/30 font-body text-sm focus:outline-none focus:border-gold-500 transition-colors" />
            </div>

            {/* Modal Tambah Produk */}
            {showAddProduct && (
              <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="glass-card rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ border: '1px solid rgba(212,152,15,0.3)' }}>
                  <h3 className="font-display text-xl font-bold text-cream mb-5">Tambah Produk Baru</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Nama Produk *</label>
                      <input type="text" value={newProduct.name || ''} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors" placeholder="Nama produk" />
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Kategori *</label>
                      <select value={newProduct.category || ''} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors">
                        <option value="">-- Pilih Kategori --</option>
                        {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Deskripsi</label>
                      <textarea value={newProduct.description || ''} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                        rows={3} className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none" placeholder="Deskripsi produk" />
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Gambar</label>
                      <ImageUploader
                        value={newProduct.image || ''}
                        onChange={url => setNewProduct({ ...newProduct, image: url })}
                      />
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Ukuran (pisah dengan koma)</label>
                      <input type="text" onChange={e => setNewProduct({ ...newProduct, sizes: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors" placeholder="2.9m x 30cm, 2.9m x 15cm" />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={!!newProduct.featured} onChange={e => setNewProduct({ ...newProduct, featured: e.target.checked })} className="w-4 h-4 accent-gold-500" />
                      <span className="text-cream/70 font-body text-sm">Produk Featured (tampil di halaman utama)</span>
                    </label>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={handleAddProduct} disabled={saving} className="btn-gold flex-1 py-2.5 rounded-xl font-body text-sm disabled:opacity-60">
                      {saving ? 'Menyimpan...' : 'Simpan Produk'}
                    </button>
                    <button onClick={() => { setShowAddProduct(false); setNewProduct({}) }} className="flex-1 py-2.5 rounded-xl font-body text-sm border border-cream/20 text-cream/60 hover:text-cream transition-colors">Batal</button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Edit Produk */}
            {editingProduct && (
              <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="glass-card rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ border: '1px solid rgba(212,152,15,0.3)' }}>
                  <h3 className="font-display text-xl font-bold text-cream mb-5">Edit Produk</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Nama Produk</label>
                      <input type="text" value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors" />
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Kategori</label>
                      <select value={editingProduct.category} onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors">
                        {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Deskripsi</label>
                      <textarea value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        rows={3} className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none" />
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Gambar</label>
                      <ImageUploader
                        value={editingProduct.image}
                        onChange={url => setEditingProduct({ ...editingProduct, image: url })}
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={!!editingProduct.featured} onChange={e => setEditingProduct({ ...editingProduct, featured: e.target.checked })} className="w-4 h-4 accent-gold-500" />
                      <span className="text-cream/70 font-body text-sm">Produk Featured</span>
                    </label>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={handleUpdateProduct} disabled={saving} className="btn-gold flex-1 py-2.5 rounded-xl font-body text-sm disabled:opacity-60">
                      {saving ? 'Menyimpan...' : 'Update Produk'}
                    </button>
                    <button onClick={() => setEditingProduct(null)} className="flex-1 py-2.5 rounded-xl font-body text-sm border border-cream/20 text-cream/60 hover:text-cream transition-colors">Batal</button>
                  </div>
                </div>
              </div>
            )}

            {/* Tabel Produk */}
            <div className="glass-card rounded-xl overflow-hidden">
              {loadingProducts ? (
                <div className="p-12 text-center"><p className="text-cream/40 font-body">Memuat produk dari Supabase...</p></div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gold-900/30">
                        <th className="text-left px-5 py-3 text-gold-400 text-xs font-body tracking-widest uppercase">Produk</th>
                        <th className="text-left px-5 py-3 text-gold-400 text-xs font-body tracking-widest uppercase hidden md:table-cell">Kategori</th>
                        <th className="text-left px-5 py-3 text-gold-400 text-xs font-body tracking-widests uppercase hidden lg:table-cell">Ukuran</th>
                        <th className="text-center px-5 py-3 text-gold-400 text-xs font-body tracking-widests uppercase">Featured</th>
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
                              {categories.find(c => c.slug === product.category)?.name || product.category}
                            </span>
                          </td>
                          <td className="px-5 py-3 hidden lg:table-cell">
                            <p className="text-cream/50 text-xs font-body">{product.sizes?.join(', ') || '-'}</p>
                          </td>
                          <td className="px-5 py-3 text-center">
                            {product.featured ? <span className="text-gold-400 text-xs">⭐ Ya</span> : <span className="text-cream/30 text-xs">-</span>}
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => setEditingProduct(product)} className="text-xs px-3 py-1.5 border border-gold-800/40 text-gold-400 hover:bg-gold-900/20 rounded-lg font-body transition-colors">Edit</button>
                              <button onClick={() => handleDeleteProduct(product.id)} className="text-xs px-3 py-1.5 border border-red-800/40 text-red-400 hover:bg-red-900/20 rounded-lg font-body transition-colors">Hapus</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredProducts.length === 0 && (
                    <div className="p-12 text-center"><p className="text-cream/40 font-body text-sm">Belum ada produk.</p></div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── CATEGORIES ── */}
        {tab === 'categories' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-3xl font-bold text-cream">Manajemen Kategori</h1>
                <p className="text-cream/50 font-body text-sm mt-1">{categories.length} kategori di Supabase</p>
              </div>
              <button onClick={() => setShowAddCategory(true)} className="btn-gold px-5 py-2.5 rounded-xl font-body text-sm flex items-center gap-2">
                + Tambah Kategori
              </button>
            </div>

            {/* Modal Tambah Kategori */}
            {showAddCategory && (
              <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="glass-card rounded-2xl p-6 w-full max-w-lg" style={{ border: '1px solid rgba(212,152,15,0.3)' }}>
                  <h3 className="font-display text-xl font-bold text-cream mb-5">Tambah Kategori Baru</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Nama Kategori *</label>
                      <input type="text" value={newCategory.name || ''} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors" placeholder="Wallpanel / WPC" />
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Slug * <span className="text-cream/40 normal-case">(huruf kecil, pisah dengan tanda -)</span></label>
                      <input type="text" value={newCategory.slug || ''} onChange={e => setNewCategory({ ...newCategory, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors" placeholder="wallpanel-wpc" />
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Deskripsi</label>
                      <textarea value={newCategory.description || ''} onChange={e => setNewCategory({ ...newCategory, description: e.target.value })}
                        rows={3} className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none" placeholder="Deskripsi kategori..." />
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Gambar</label>
                      <ImageUploader
                        value={newCategory.image || ''}
                        onChange={url => setNewCategory({ ...newCategory, image: url })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={handleAddCategory} disabled={saving} className="btn-gold flex-1 py-2.5 rounded-xl font-body text-sm disabled:opacity-60">
                      {saving ? 'Menyimpan...' : 'Simpan Kategori'}
                    </button>
                    <button onClick={() => { setShowAddCategory(false); setNewCategory({}) }} className="flex-1 py-2.5 rounded-xl font-body text-sm border border-cream/20 text-cream/60 hover:text-cream transition-colors">Batal</button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Edit Kategori */}
            {editingCategory && (
              <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="glass-card rounded-2xl p-6 w-full max-w-lg" style={{ border: '1px solid rgba(212,152,15,0.3)' }}>
                  <h3 className="font-display text-xl font-bold text-cream mb-5">Edit Kategori</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Nama Kategori</label>
                      <input type="text" value={editingCategory.name} onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors" />
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Slug <span className="text-cream/40 normal-case">(hati-hati mengubah ini — produk pakai slug untuk kategori)</span></label>
                      <input type="text" value={editingCategory.slug} onChange={e => setEditingCategory({ ...editingCategory, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                        className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors" />
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Deskripsi</label>
                      <textarea value={editingCategory.description} onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })}
                        rows={3} className="w-full px-4 py-2.5 bg-dark-700 border border-gold-800/30 rounded-xl text-cream font-body text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none" />
                    </div>
                    <div>
                      <label className="text-gold-400 text-xs font-body tracking-wide uppercase block mb-1.5">Gambar</label>
                      <ImageUploader
                        value={editingCategory.image}
                        onChange={url => setEditingCategory({ ...editingCategory, image: url })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={handleUpdateCategory} disabled={saving} className="btn-gold flex-1 py-2.5 rounded-xl font-body text-sm disabled:opacity-60">
                      {saving ? 'Menyimpan...' : 'Update Kategori'}
                    </button>
                    <button onClick={() => setEditingCategory(null)} className="flex-1 py-2.5 rounded-xl font-body text-sm border border-cream/20 text-cream/60 hover:text-cream transition-colors">Batal</button>
                  </div>
                </div>
              </div>
            )}

            {/* Grid Kategori */}
            {loadingCategories ? (
              <div className="p-12 text-center"><p className="text-cream/40 font-body">Memuat kategori dari Supabase...</p></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(cat => (
                  <div key={cat.id} className="glass-card rounded-xl overflow-hidden">
                    <div className="h-32 bg-cover bg-center relative" style={{ backgroundImage: `url(${cat.image})` }}>
                      <div className="absolute inset-0 bg-dark-900/50" />
                      <div className="absolute bottom-3 left-3">
                        <p className="text-cream font-display font-semibold text-sm">{cat.name}</p>
                        <p className="text-cream/60 text-xs font-body">/{cat.slug}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-cream/50 text-xs font-body line-clamp-2 mb-3">{cat.description || '-'}</p>
                      <p className="text-cream/30 text-xs font-body mb-3">
                        {products.filter(p => p.category === cat.slug).length} produk
                      </p>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingCategory(cat)} className="flex-1 text-xs py-1.5 border border-gold-800/40 text-gold-400 hover:bg-gold-900/20 rounded-lg font-body transition-colors">Edit</button>
                        <button onClick={() => handleDeleteCategory(cat.id)} className="flex-1 text-xs py-1.5 border border-red-800/40 text-red-400 hover:bg-red-900/20 rounded-lg font-body transition-colors">Hapus</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
