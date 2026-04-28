import Link from 'next/link'
import HeroSlideshow from '@/components/HeroSlideshow'
import { slides, categories, products, articles, siteSettings } from '@/lib/data'

const whyUs = [
  {
    icon: '🏭',
    title: 'Langsung dari Gudang',
    desc: 'Tanpa perantara. Anda mendapatkan harga import langsung dari gudang kami di Jakarta.',
  },
  {
    icon: '✅',
    title: 'Kualitas Terjamin',
    desc: 'Semua produk melalui quality control ketat sebelum sampai ke tangan Anda.',
  },
  {
    icon: '🚚',
    title: 'Pengiriman ke Seluruh Indonesia',
    desc: 'Melayani pengiriman ke seluruh wilayah Indonesia dengan aman dan tepat waktu.',
  },
  {
    icon: '💬',
    title: 'Konsultasi Gratis',
    desc: 'Tim ahli kami siap membantu Anda memilih material yang tepat untuk setiap proyek.',
  },
]

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6)
  const latestArticles = articles.slice(0, 3)

  return (
    <>
      {/* Hero Slideshow */}
      <HeroSlideshow slides={slides} />

      {/* Kategori Produk */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-500 text-xs font-body tracking-widest uppercase">Kategori</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
            Produk <span className="gold-text">Unggulan</span> Kami
          </h2>
          <p className="text-cream/60 font-body max-w-xl mx-auto">
            Material interior berkualitas tinggi untuk setiap kebutuhan renovasi dan konstruksi Anda
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl gold-border product-card"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                <div className="absolute inset-0 img-gold-overlay" />
                <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-dark-900/10 transition-colors duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-xl font-semibold text-cream group-hover:gold-text transition-all duration-300">{cat.name}</h3>
                <p className="text-cream/60 text-sm font-body mt-1 line-clamp-2">{cat.description}</p>
                <div className="flex items-center gap-2 mt-3 text-gold-400 text-sm font-body">
                  <span>Lihat Produk</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-gold-500/40 rounded-tr-lg" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="btn-gold px-8 py-3.5 rounded-full font-body font-medium inline-block">
            Lihat Semua Produk
          </Link>
        </div>
      </section>

      {/* Produk Pilihan */}
      <section className="py-20 bg-dark-800 border-y border-gold-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
              <span className="text-gold-500 text-xs font-body tracking-widest uppercase">Pilihan Terbaik</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
              Produk <span className="gold-text">Terfavorit</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="glass-card rounded-xl overflow-hidden product-card group">
                <div className="aspect-video relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                  <span className="absolute top-3 left-3 bg-gold-600/90 text-cream text-xs font-body px-3 py-1 rounded-full">
                    {categories.find(c => c.slug === product.category)?.name}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-cream group-hover:text-gold-400 transition-colors">{product.name}</h3>
                  <p className="text-cream/60 text-sm font-body mt-2 line-clamp-2">{product.description}</p>
                  {product.sizes && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {product.sizes.map(size => (
                        <span key={size} className="text-xs font-body px-2 py-1 bg-gold-900/30 border border-gold-800/40 text-gold-400 rounded-md">{size}</span>
                      ))}
                    </div>
                  )}
                  
                  <a
                    href={`https://wa.me/6281385887778?text=Halo, saya tertarik dengan produk ${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full btn-gold py-2.5 rounded-lg text-sm font-body font-medium flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Tanya Harga
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Kenapa Kami */}
      <section id="about" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-gold-500" />
              <span className="text-gold-500 text-xs font-body tracking-widest uppercase">Tentang Kami</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-6 leading-tight">
              Mengapa <span className="gold-text">3J Interior</span> Pilihan Terbaik?
            </h2>
            <p className="text-cream/70 font-body text-lg leading-relaxed mb-8">
              3J Interior adalah gudang material interior WPC terpercaya di Jakarta. Kami hadir sebagai solusi lengkap untuk kebutuhan renovasi dan konstruksi interior dengan produk berkualitas tinggi dan harga yang kompetitif.
            </p>
            <p className="text-cream/60 font-body leading-relaxed mb-10">
              Dengan pengalaman lebih dari 5 tahun melayani ribuan klien — mulai dari kontraktor, desainer interior, hingga pemilik rumah — kami memahami betul apa yang Anda butuhkan: material bagus, harga fair, dan pelayanan yang responsif.
            </p>
            
            <a
              href="https://wa.me/6281385887778"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-8 py-3.5 rounded-full font-body font-medium inline-flex items-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Konsultasi Sekarang
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyUs.map((item) => (
              <div key={item.title} className="glass-card rounded-xl p-6 hover:border-gold-600/30 transition-all duration-300 group">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-display text-lg font-semibold text-cream group-hover:text-gold-400 transition-colors mb-2">{item.title}</h3>
                <p className="text-cream/60 text-sm font-body leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1600&q=80)` }}
        />
        <div className="absolute inset-0 bg-dark-900/80" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(212,152,15,0.15) 0%, transparent 50%, rgba(212,152,15,0.08) 100%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
            Siap Mulai <span className="gold-text">Proyek Impian</span> Anda?
          </h2>
          <p className="text-cream/70 font-body text-lg mb-8 leading-relaxed">
            Dapatkan penawaran harga terbaik dan konsultasi gratis dari tim ahli 3J Interior. Hubungi kami sekarang via WhatsApp.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            
            <a
              href="https://wa.me/6281385887778"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-10 py-4 rounded-full font-body font-semibold text-lg flex items-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Chat WhatsApp
            </a>
            
            <a
              href="mailto:3jinterior.id@gmail.com"
              className="px-10 py-4 rounded-full font-body font-semibold text-lg border border-cream/30 text-cream hover:border-gold-400 hover:text-gold-400 transition-all duration-300"
            >
              Kirim Email
            </a>
          </div>
        </div>
      </section>

      {/* Artikel Terbaru */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-500 text-xs font-body tracking-widest uppercase">Blog & Tips</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
            Artikel <span className="gold-text">Terbaru</span>
          </h2>
          <p className="text-cream/60 font-body max-w-xl mx-auto">
            Tips, inspirasi, dan panduan seputar material interior dan desain rumah
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <Link key={article.id} href={`/articles/${article.slug}`} className="glass-card rounded-xl overflow-hidden group product-card">
              <div className="aspect-video relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  {article.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs font-body px-2 py-0.5 bg-gold-900/30 border border-gold-800/40 text-gold-500 rounded-full">{tag}</span>
                  ))}
                </div>
                <h3 className="font-display text-lg font-semibold text-cream group-hover:text-gold-400 transition-colors line-clamp-2 leading-snug">{article.title}</h3>
                <p className="text-cream/60 text-sm font-body mt-2 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-cream/40 text-xs font-body">{new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span className="text-gold-400 text-sm font-body flex items-center gap-1 group-hover:gap-2 transition-all">
                    Baca
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/articles" className="btn-gold px-8 py-3.5 rounded-full font-body font-medium inline-block">
            Semua Artikel
          </Link>
        </div>
      </section>

      {/* Google Maps */}
      <section id="contact" className="py-20 bg-dark-800 border-t border-gold-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
              Lokasi <span className="gold-text">Kami</span>
            </h2>
            <p className="text-cream/60 font-body">Kunjungi showroom kami atau hubungi via WhatsApp untuk survey kebutuhan Anda</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2 space-y-5">
              {[
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>,
                  label: 'Alamat',
                  value: 'Jakarta, Indonesia',
                  link: 'https://maps.app.goo.gl/GVY1PQUqhTzufBur8?g_st=ic',
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>,
                  label: 'Email',
                  value: '3jinterior.id@gmail.com',
                  link: 'mailto:3jinterior.id@gmail.com',
                },
                {
                  icon: null,
                  label: 'WhatsApp',
                  value: '+62 813-8588-7778',
                  link: 'https://wa.me/6281385887778',
                  isWA: true,
                },
              ].map((item) => (
                
                  key={item.label}
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="glass-card rounded-xl p-5 flex items-center gap-4 hover:border-gold-600/40 transition-all duration-300 group block"
                >
                  <div className="w-12 h-12 rounded-full bg-gold-900/30 border border-gold-800/40 flex items-center justify-center shrink-0 group-hover:bg-gold-800/30 transition-colors">
                    {item.isWA ? (
                      <svg className="w-5 h-5 text-gold-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {item.icon}
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-gold-500 text-xs font-body tracking-wide uppercase">{item.label}</p>
                    <p className="text-cream/80 font-body text-sm mt-0.5 group-hover:text-gold-400 transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl overflow-hidden gold-border gold-glow h-80 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.54577756017!2d106.7271985!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2s3J%20Interior%20%3A%20Gudang%20WPC%2C%20Wall%20Panel%2C%20Interior%2C%20Wallboard%2C%20Harga%20Import%2C%20Grosir%20dan%20Murah!5e0!3m2!1sen!2sid!4v1714000000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi 3J Interior"
                />
                
                <a
                  href="https://maps.app.goo.gl/GVY1PQUqhTzufBur8?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 btn-gold px-4 py-2 rounded-lg text-xs font-body font-medium flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
