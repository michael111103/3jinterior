import { articles } from '@/lib/data'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articles.find(a => a.slug === params.slug)
  if (!article) return {}
  return {
    title: `${article.title} | 3J Interior`,
    description: article.excerpt,
  }
}

const articleContents: Record<string, string> = {
  'keunggulan-wpc-vs-kayu-asli': `
Dalam beberapa tahun terakhir, WPC (Wood Plastic Composite) telah mengambil alih posisi kayu asli di banyak proyek interior premium. Bukan tanpa alasan — material inovatif ini menawarkan kombinasi sempurna antara estetika kayu yang hangat dan ketahanan material modern.

**Apa Itu WPC?**

WPC adalah material komposit yang dibuat dari campuran serbuk kayu dan plastik yang diproses dengan teknologi tinggi. Hasilnya adalah panel yang terlihat dan terasa seperti kayu, namun memiliki sifat-sifat unggul yang tidak dimiliki kayu solid.

**Keunggulan WPC vs Kayu Asli**

Pertama, soal ketahanan. Kayu asli rentan terhadap rayap, jamur, dan perubahan kelembaban. WPC sepenuhnya tahan terhadap semua ancaman ini. Panel WPC tidak akan melengkung, retak, atau membusuk meski terkena lembab atau panas.

Kedua, perawatan yang jauh lebih mudah. Kayu asli perlu dipernis ulang secara berkala, diperiksa dari serangan rayap, dan dijaga kelembabannya. WPC cukup dibersihkan dengan lap basah — sesederhana itu.

Ketiga, harga yang lebih terjangkau. Kayu solid berkualitas tinggi harganya sangat mahal dan terus naik seiring berkurangnya pasokan hutan. WPC menawarkan tampilan yang sama dengan sepersekian harganya.

Keempat, ramah lingkungan. Produksi WPC menggunakan bahan daur ulang dan tidak memerlukan penebangan pohon. Pilihan yang lebih bertanggung jawab untuk lingkungan.

**Kesimpulan**

Untuk interior modern yang membutuhkan material indah, tahan lama, dan mudah dirawat, WPC adalah pilihan yang sulit untuk ditolak. Di 3J Interior, kami menyediakan berbagai pilihan panel WPC premium yang siap mentransformasi ruangan Anda.
  `,
  'cara-pasang-wpc-wall-panel-sendiri': `
Salah satu keunggulan WPC Wall Panel yang sering diabaikan adalah kemudahan pemasangannya. Dengan panduan yang tepat, Anda bisa memasang sendiri panel WPC untuk menghemat biaya tukang.

**Alat yang Dibutuhkan**

Sebelum mulai, siapkan: meteran, pensil, gergaji kayu atau gergaji besi, bor, sekrup self-drilling, holo alumunium sebagai rangka, waterpass, dan tentu saja panel WPC pilihan Anda.

**Langkah 1: Persiapan Dinding**

Pastikan dinding dalam kondisi bersih, kering, dan rata. Tandai posisi tiang holo menggunakan pensil dan waterpass setiap 40-60cm tergantung lebar panel yang digunakan.

**Langkah 2: Pasang Rangka Holo**

Pasang holo alumunium vertikal ke dinding menggunakan sekrup dan rawl plug. Pastikan semua holo rata secara vertikal menggunakan waterpass. Rangka yang rapi adalah kunci hasil akhir yang baik.

**Langkah 3: Pasang Panel WPC**

Mulai dari sudut atau tepi dinding. Panel WPC biasanya memiliki sistem interlock yang memudahkan pemasangan. Masukkan panel pertama, pastikan rata, lalu kunci dengan sekrup tipis di bagian yang akan tertutup panel berikutnya.

**Langkah 4: Finishing**

Pasang list alumunium di sudut dan tepi untuk tampilan yang rapi dan profesional. Pilih list yang sesuai: list sudut luar, sudut dalam, atau list LED jika ingin menambahkan pencahayaan ambient.

**Tips Pro**

Selalu sisakan jarak 5-10mm di bagian bawah panel dari lantai untuk ventilasi. Gunakan level laser untuk hasil yang lebih presisi. Jika ragu, konsultasikan dengan tim kami melalui WhatsApp sebelum memulai.
  `,
}

export default function ArticleDetailPage({ params }: Props) {
  const article = articles.find(a => a.slug === params.slug)
  if (!article) notFound()

  const content = articleContents[params.slug] || `
${article.excerpt}

Artikel lengkap sedang dalam penulisan. Sementara itu, Anda bisa menghubungi tim kami untuk informasi lebih detail mengenai topik ini.

Kami berkomitmen untuk terus menghadirkan konten berkualitas yang membantu Anda membuat keputusan terbaik dalam memilih material interior. Pantau terus halaman artikel kami untuk update terbaru.

Untuk konsultasi langsung mengenai kebutuhan material interior Anda, jangan ragu untuk menghubungi tim ahli 3J Interior melalui WhatsApp. Kami siap membantu Anda dari pemilihan material hingga estimasi kebutuhan.
  `

  const related = articles.filter(a => a.id !== article.id && a.tags.some(t => article.tags.includes(t))).slice(0, 3)

  return (
    <div className="min-h-screen pt-24">
      {/* Hero — teks selalu putih karena di atas foto gelap */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${article.image})` }} />
        <div className="absolute inset-0 bg-dark-900/75" />
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-10 w-full">
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map(tag => (
                <span key={tag} className="text-xs font-body px-2.5 py-1 bg-gold-900/50 border border-gold-700/50 text-gold-400 rounded-full">{tag}</span>
              ))}
            </div>
            {/* Judul & tanggal dikunci putih — di atas foto gelap */}
            <h1 className="font-display text-2xl md:text-4xl font-bold leading-tight" style={{ color: '#fdf6e3' }}>{article.title}</h1>
            <p className="text-sm font-body mt-3" style={{ color: 'rgba(253,246,227,0.6)' }}>
              {new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} · Oleh {article.author}
            </p>
          </div>
        </div>
      </div>

      {/* Content — ikut tema (light = gelap, dark = terang) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Article body */}
          <div className="lg:col-span-2">
            <div className="prose prose-invert prose-gold max-w-none">
              {content.split('\n').map((para, i) => {
                if (!para.trim()) return null
                if (para.startsWith('**') && para.endsWith('**')) {
                  return <h3 key={i} className="font-display text-xl font-semibold text-gold-400 mt-8 mb-3">{para.replace(/\*\*/g, '')}</h3>
                }
                return <p key={i} className="text-cream/75 font-body leading-relaxed mb-4">{para}</p>
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 glass-card rounded-2xl p-6 border border-gold-700/30">
              <h3 className="font-display text-xl font-semibold text-cream mb-2">Butuh Material untuk Proyek Anda?</h3>
              <p className="text-cream/60 font-body text-sm mb-4">Konsultasikan kebutuhan material interior Anda dengan tim ahli 3J Interior. Gratis dan tanpa komitmen.</p>
              <a
                href="https://wa.me/6281385887778"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-6 py-3 rounded-full font-body font-medium text-sm inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Konsultasi Gratis
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card rounded-xl p-5">
              <h4 className="font-display text-gold-400 text-lg font-semibold mb-4">Artikel Terkait</h4>
              <div className="space-y-4">
                {related.map(rel => (
                  <Link key={rel.id} href={`/articles/${rel.slug}`} className="flex gap-3 group">
                    <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0">
                      <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform" style={{ backgroundImage: `url(${rel.image})` }} />
                    </div>
                    <div>
                      <p className="text-cream/80 text-sm font-body group-hover:text-gold-400 transition-colors line-clamp-2 leading-snug">{rel.title}</p>
                      <p className="text-cream/40 text-xs mt-1">{new Date(rel.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/articles" className="block mt-4 text-gold-400 text-sm font-body hover:text-gold-300 transition-colors">
                Semua Artikel →
              </Link>
            </div>

            <div className="glass-card rounded-xl p-5">
              <h4 className="font-display text-gold-400 text-lg font-semibold mb-3">Kategori Produk</h4>
              <div className="space-y-2">
                {['WPC Wall Panel', 'Wallboard', 'Decking Outdoor', 'UV Marmer', 'Holo & Alumunium', 'PU Stone'].map(cat => (
                  <Link key={cat} href="/products" className="flex items-center gap-2 text-cream/60 hover:text-gold-400 text-sm font-body transition-colors group">
                    <span className="text-gold-800 group-hover:text-gold-400 transition-colors">◆</span>
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
