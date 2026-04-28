// app/(main)/landing/page.tsx

'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

const whatsappNumber = '6281385887778'

const catalogItems = [
  { label: 'Semua Product', link: 'https://example.com/katalog-semua' },
  { label: 'Wallpanel / WPC', link: 'https://example.com/katalog-wallpanel-wpc' },
  { label: 'Wallboard', link: 'https://example.com/katalog-wallboard' },
  { label: 'Decking', link: 'https://example.com/katalog-decking' },
  { label: 'WPC Outdoor', link: 'https://example.com/katalog-wpc-outdoor' },
  { label: 'Holo Outdoor', link: 'https://example.com/katalog-holo-outdoor' },
  { label: 'UV Marmer', link: 'https://example.com/katalog-uv-marmer' },
  { label: 'WPC Mini Seri H', link: 'https://example.com/katalog-wpc-mini-h' },
  { label: 'WPC Mini Seri L', link: 'https://example.com/katalog-wpc-mini-l' },
  { label: 'Holo Indoor', link: 'https://example.com/katalog-holo-indoor' },
  { label: 'WPC 30cm', link: 'https://example.com/katalog-wpc-30cm' },
  { label: 'List Moulding', link: 'https://example.com/katalog-list-moulding' },
  { label: 'PU Stone', link: 'https://example.com/katalog-pu-stone' },
  { label: 'List Alumunium', link: 'https://example.com/katalog-list-alumunium' },
]

const features = [
  { icon: '🏭', title: 'Harga Langsung Gudang', desc: 'Tanpa perantara, dapatkan harga paling kompetitif langsung dari sumber' },
  { icon: '✅', title: 'Kualitas Terjamin', desc: 'Setiap produk melalui quality control ketat sebelum sampai ke tangan Anda' },
  { icon: '🚚', title: 'Kirim Seluruh Indonesia', desc: 'Pengiriman ke 34 provinsi via ekspedisi terpercaya, aman & tepat waktu' },
  { icon: '📞', title: 'Konsultasi Gratis', desc: 'Tim ahli kami siap membantu memilih produk yang tepat untuk proyek Anda' },
]

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

const WaIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
)

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const waMsg = encodeURIComponent('Halo 3J Interior, saya ingin tanya mengenai produk dan harga. Bisa bantu saya?')

  return (
    <div className="min-h-screen">

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900/95 via-dark-900/80 to-dark-900/60" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(212,152,15,0.14) 0%, transparent 60%)' }} />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-500 to-transparent hidden md:block" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-32">
          <div className="inline-flex items-center gap-2 bg-gold-900/40 border border-gold-700/40 text-gold-400 text-xs font-body tracking-widest uppercase px-5 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            Material Interior Premium
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-cream">Solusi Material</span>
            <br />
            <span className="gold-shimmer">WPC Terbaik</span>
            <br />
            <span className="text-cream text-4xl sm:text-5xl">untuk Hunian Anda</span>
          </h1>

          <p className="text-cream/70 font-body text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            3J Interior hadir dengan ratusan pilihan produk WPC, Wallboard, Decking, dan material interior premium lainnya. Harga grosir langsung dari gudang, kualitas terjamin.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 mb-10 text-sm font-body">
            {['✓ Harga Grosir', '✓ 500+ Produk', '✓ Kirim Seluruh Indonesia', '✓ Konsultasi Gratis'].map(item => (
              <span key={item} className="text-gold-400">{item}</span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-10 py-4 rounded-full font-body font-semibold text-lg flex items-center gap-3 animate-pulse-gold"
            >
              <WaIcon />
              Chat WhatsApp Sekarang
            </a>
            <a
              href="#ekatalog"
              className="px-10 py-4 rounded-full font-body font-medium text-lg border border-gold-600/40 text-cream/80 hover:text-gold-400 hover:border-gold-400 transition-all duration-300"
            >
              Lihat E-Katalog ↓
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cream/40">
          <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-cream/40 to-transparent" />
        </div>
      </section>

      {/* ─── E-KATALOG ─── */}
      <section id="ekatalog" className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-500 text-xs font-body tracking-widest uppercase">Katalog Digital</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-3">
            E-Katalog <span className="gold-text">Produk</span>
          </h2>
          <p className="text-cream/60 font-body max-w-lg mx-auto">
            Pilih kategori produk di bawah untuk melihat katalog lengkap beserta spesifikasi dan pilihan warna tersedia
          </p>
        </div>

        {/* WA Button besar */}
        <div className="flex justify-center mb-8">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-10 py-4 rounded-full font-body font-semibold text-lg flex items-center gap-3"
          >
            <WaIcon />
            Whatsapp Admin
          </a>
        </div>

        <p className="text-center text-cream/50 font-body text-sm mb-8 italic">E Katalog Product :</p>

        {/* Grid katalog */}
        <div className="flex flex-col gap-3 max-w-lg mx-auto">
          {catalogItems.map((item) => (
            <a
              key={item.label}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card rounded-xl px-6 py-4 flex items-center justify-between hover:border-gold-500/60 transition-all duration-300"
              style={{ border: '1px solid rgba(212,152,15,0.2)' }}
            >
              <span className="font-body font-medium text-cream group-hover:text-gold-400 transition-colors">
                {item.label}
              </span>
              <svg
                className="w-4 h-4 text-gold-500 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          ))}
        </div>
      </section>

      {/* ─── KEUNGGULAN ─── */}
      <section className="py-20 bg-dark-800 border-y border-gold-900/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500" />
              <span className="text-gold-500 text-xs font-body tracking-widest uppercase">Kenapa Kami</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500" />
            </div>
            <h2 className="font-display text-4xl font-bold text-cream mb-3">
              Mengapa Pilih <span className="gold-text">3J Interior?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(item => (
              <div key={item.title} className="glass-card rounded-xl p-6 text-center hover:border-gold-600/40 transition-all duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display text-base font-semibold text-gold-400 mb-2">{item.title}</h3>
                <p className="text-cream/60 text-sm font-body leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TENTANG ─── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500" />
              <span className="text-gold-500 text-xs font-body tracking-widest uppercase">Tentang Kami</span>
            </div>
            <h2 className="font-display text-4xl font-bold text-cream mb-5">
              Spesialis Material <span className="gold-text">WPC Premium</span>
            </h2>
            <p className="text-cream/65 font-body leading-relaxed mb-4">
              3J Interior adalah distributor material WPC (Wood Plastic Composite) terpercaya dengan pengalaman lebih dari 5 tahun melayani kontraktor, interior designer, dan developer properti di seluruh Indonesia.
            </p>
            <p className="text-cream/65 font-body leading-relaxed mb-6">
              Kami menyediakan berbagai produk berkualitas tinggi mulai dari Wallpanel WPC, Wallboard, Decking, Holo Indoor & Outdoor, UV Marmer, List Aluminium, hingga PU Stone — semua tersedia dengan harga kompetitif langsung dari gudang.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-8 py-3.5 rounded-full font-body font-semibold flex items-center gap-2 w-fit"
            >
              <WaIcon />
              Konsultasi Gratis
            </a>
          </div>
          <div className="relative">
            <div
              className="rounded-2xl overflow-hidden aspect-[4/3] bg-cover bg-center"
              style={{ backgroundImage: `url(https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&q=80)` }}
            />
            <div className="absolute -bottom-4 -left-4 glass-card rounded-xl px-5 py-4" style={{ border: '1px solid rgba(212,152,15,0.4)' }}>
              <p className="font-display text-2xl font-bold gold-text">5+ Tahun</p>
              <p className="text-cream/60 text-xs font-body">Melayani Indonesia</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONI ─── */}
      <section className="py-20 bg-dark-800 border-y border-gold-900/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500" />
              <span className="text-gold-500 text-xs font-body tracking-widest uppercase">Testimoni</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500" />
            </div>
            <h2 className="font-display text-4xl font-bold text-cream mb-3">
              Kata <span className="gold-text">Klien Kami</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="glass-card rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-500 text-xs font-body tracking-widest uppercase">FAQ</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          <h2 className="font-display text-4xl font-bold text-cream mb-3">
            Pertanyaan <span className="gold-text">Umum</span>
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="glass-card rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="flex items-center justify-between p-5">
                <h4 className="font-display text-base font-semibold text-cream">{faq.q}</h4>
                <svg
                  className={`w-5 h-5 text-gold-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {openFaq === i && (
                <div className="px-5 pb-5">
                  <p className="text-cream/60 text-sm font-body leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-20 bg-dark-800 border-t border-gold-900/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div
            className="glass-card rounded-3xl p-10 md:p-14"
            style={{ border: '1px solid rgba(212,152,15,0.3)', boxShadow: '0 0 60px rgba(212,152,15,0.08)' }}
          >
            <h2 className="font-display text-4xl font-bold text-cream mb-4">
              Siap Mulai <span className="gold-text">Proyek Anda?</span>
            </h2>
            <p className="text-cream/60 font-body mb-8 leading-relaxed">
              Hubungi kami sekarang untuk mendapatkan penawaran harga terbaik dan konsultasi gratis dari tim ahli kami. Kami siap melayani kebutuhan material interior Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-10 py-4 rounded-full font-body font-semibold text-lg flex items-center justify-center gap-3"
              >
                <WaIcon />
                Chat WhatsApp
              </a>
              <a
                href="#ekatalog"
                className="px-10 py-4 rounded-full font-body font-medium text-lg border border-gold-600/40 text-cream/80 hover:text-gold-400 hover:border-gold-400 transition-all duration-300 flex items-center justify-center"
              >
                Lihat E-Katalog ↑
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
