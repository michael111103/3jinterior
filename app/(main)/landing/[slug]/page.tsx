import { categories, products } from '@/lib/data'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return categories.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = categories.find(c => c.slug === params.slug)
  if (!cat) return {}
  return {
    title: `${cat.name} | Harga Grosir | 3J Interior Jakarta`,
    description: `${cat.description} Dapatkan harga terbaik langsung dari gudang 3J Interior. Hubungi kami via WhatsApp untuk penawaran spesial.`,
  }
}

const testimonials = [
  { name: 'Pak Budi S.', role: 'Kontraktor, Jakarta', text: 'Material bagus, harga kompetitif, pengiriman cepat. Sudah langganan lebih dari 2 tahun.' },
  { name: 'Bu Sari W.', role: 'Interior Designer, Bandung', text: 'Kualitas produknya konsisten dan tim CS-nya responsif banget. Rekomen buat semua kebutuhan WPC.' },
  { name: 'Pak Doni H.', role: 'Developer Perumahan, Surabaya', text: 'Order ratusan meter WPC untuk proyek cluster kami. Harga grosirnya sangat membantu margin proyek.' },
]

const faqs = [
  { q: 'Berapa minimum order?', a: 'Tidak ada minimum order. Kami melayani pembelian satuan hingga grosir dalam jumlah besar.' },
  { q: 'Apakah bisa dikirim ke luar Jakarta?', a: 'Ya, kami melayani pengiriman ke seluruh Indonesia melalui ekspedisi terpercaya.' },
  { q: 'Berapa lama estimasi pengiriman?', a: 'Jakarta dan sekitarnya 1-2 hari. Luar Jawa 3-7 hari kerja tergantung lokasi.' },
  { q: 'Apakah ada garansi produk?', a: 'Ya, semua produk kami bergaransi. Kami juga memberikan after-sales service jika ada masalah.' },
]

export default function LandingPage({ params }: Props) {
  const cat = categories.find(c => c.slug === params.slug)
  if (!cat) notFound()

  const catProducts = products.filter(p => p.category === params.slug)
  const whatsappMsg = encodeURIComponent(`Halo 3J Interior, saya tertarik dengan produk ${cat.name}. Bisa minta info harga dan ketersediaannya?`)

  return (
    <div className="min-h-screen">
      {/* Full-screen Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${cat.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900/95 via-dark-900/75 to-dark-900/60" />

        {/* Gold ambient */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(212,152,15,0.12) 0%, transparent 60%)' }} />

        {/* Vertical gold line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-500 to-transparent hidden md:block" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-32">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold-900/40 border border-gold-700/40 text-gold-400 text-xs font-body tracking-widest uppercase px-5 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            Penawaran Spesial 3J Interior
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-cream">Material </span>
            <span className="gold-shimmer">{cat.name}</span>
            <span className="text-cream block text-4xl sm:text-5xl mt-2">Premium Harga Grosir</span>
          </h1>

          <p className="text-cream/70 font-body text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            {cat.description} Dapatkan harga terbaik langsung dari gudang kami di Jakarta.
          </p>

          {/* Value props */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm font-body">
            {['✓ Harga Grosir', '✓ Kualitas Premium', '✓ Kirim Seluruh Indonesia', '✓ Konsultasi Gratis'].map(item => (
              <span key={item} className="text-gold-400">{item}</span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/6281385887778?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-10 py-4 rounded-full font-body font-semibold text-lg flex items-center gap-3 animate-pulse-gold"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Minta Harga Sekarang
            </a>
            <a
              href="#products"
              className="px-10 py-4 rounded-full font-body font-medium text-lg border border-gold-600/40 text-cream/80 hover:text-gold-400 hover:border-gold-400 transition-all duration-300"
            >
              Lihat Produk ↓
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cream/40">
          <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-cream/40 to-transparent" />
        </div>
      </section>

      {/* Stats section */}
      <section className="bg-dark-800 border-y border-gold-900/30 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { n: '500+', l: 'Varian Produk' },
              { n: '1000+', l: 'Klien Puas' },
              { n: '5+', l: 'Tahun Berpengalaman' },
              { n: '34', l: 'Provinsi Terjangkau' },
            ].map(s => (
              <div key={s.l}>
                <p className="font-display text-3xl font-bold gold-text">{s.n}</p>
                <p className="text-cream/50 text-sm font-body mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-3">
            Produk <span className="gold-text">{cat.name}</span>
          </h2>
          <p className="text-cream/60 font-body">Pilih produk yang sesuai kebutuhan Anda</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {catProducts.map(product => (
            <div key={product.id} className="glass-card rounded-xl overflow-hidden group product-card">
              <div className="aspect-video relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-cream group-hover:text-gold-400 transition-colors">{product.name}</h3>
                <p className="text-cream/60 text-sm font-body mt-2 leading-relaxed">{product.description}</p>
                {product.sizes && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {product.sizes.map(s => (
                      <span key={s} className="text-xs font-body px-2 py-0.5 bg-gold-900/20 border border-gold-800/30 text-gold-400 rounded">{s}</span>
                    ))}
                  </div>
                )}
                <a
                  href={`https://wa.me/6281385887778?text=${encodeURIComponent(`Halo, saya tertarik dengan ${product.name}. Bisa minta info harga?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full btn-gold py-2.5 rounded-lg text-sm font-body font-medium flex items-center justify-center gap-2"
                >
                  Tanya Harga via WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {catProducts.length === 0 && (
          <div className="text-center py-16 glass-card rounded-2xl">
            <p className="text-cream/50 font-body">Produk segera hadir. Hubungi kami untuk informasi lebih lanjut.</p>
            <a href="https://wa.me/6281385887778" target="_blank" rel="noopener noreferrer" className="btn-gold px-6 py-3 rounded-full font-body mt-4 inline-block">Hubungi Kami</a>
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-dark-800 border-y border-gold-900/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-cream mb-3">Mengapa Pilih <span className="gold-text">3J Interior?</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🏭', title: 'Harga Langsung Gudang', desc: 'Tanpa perantara, harga paling kompetitif di kelasnya' },
              { icon: '✅', title: 'Quality Control Ketat', desc: 'Setiap produk dicek kualitasnya sebelum pengiriman' },
              { icon: '⚡', title: 'Proses Cepat', desc: 'Konfirmasi order & pengiriman dalam 1 hari kerja' },
              { icon: '📞', title: 'After-Sales 24/7', desc: 'Tim kami siap membantu kapanpun Anda butuhkan' },
            ].map(item => (
              <div key={item.title} className="glass-card rounded-xl p-5 text-center hover:border-gold-600/40 transition-all duration-300">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-display text-base font-semibold text-gold-400 mb-2">{item.title}</h3>
                <p className="text-cream/60 text-sm font-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-cream mb-3">Kata <span className="gold-text">Klien Kami</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="glass-card rounded-xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-cream/70 font-body text-sm leading-relaxed italic mb-4">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="text-cream font-body font-medium text-sm">{t.name}</p>
                <p className="text-gold-600 text-xs font-body">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-dark-800 border-t border-gold-900/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-cream mb-3">Pertanyaan <span className="gold-text">Umum</span></h2>
          </div>
          <div className="space-y-4">
            {faqs.map(faq => (
              <div key={faq.q} className="glass-card rounded-xl p-5">
                <h4 className="font-display text-base font-semibold text-gold-400 mb-2">{faq.q}</h4>
                <p className="text-cream/60 text-sm font-body">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="glass-card rounded-3xl p-10 md:p-14" style={{ border: '1px solid rgba(212,152,15,0.3)', boxShadow: '0 0 60px rgba(212,152,15,0.08)' }}>
            <h2 className="font-display text-4xl font-bold text-cream mb-4">
              Siap Order <span className="gold-text">{cat.name}?</span>
            </h2>
            <p className="text-cream/60 font-body mb-8 leading-relaxed">
              Hubungi kami sekarang untuk mendapatkan penawaran harga terbaik dan konsultasi gratis dari tim ahli kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/6281385887778?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-10 py-4 rounded-full font-body font-semibold text-lg flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Chat WhatsApp
              </a>
              <Link
                href="/products"
                className="px-10 py-4 rounded-full font-body font-medium text-lg border border-gold-600/40 text-cream/80 hover:text-gold-400 hover:border-gold-400 transition-all duration-300 flex items-center justify-center"
              >
                Lihat Semua Produk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
