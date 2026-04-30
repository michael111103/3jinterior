import Link from 'next/link'
import Image from 'next/image'
import { categories } from '@/lib/data'

const categoryImages: Record<string, string> = {
  'wallpanel-wpc': '/images/wallpanel.jpeg',
  'wallboard': '/images/wallboard.jpeg',
  'decking': '/images/decking.jpeg',
  'wpc-outdoor': '/images/wpcoutdoor.jpeg',
  'holo-outdoor': '/images/holooutdoor.jpeg',
  'uv-marmer': '/images/uvmarmer.jpeg',
  'wpc-mini-seri-h': '/images/wpcminiserih.jpeg',
  'wpc-mini-seri-l': '/images/wpcminiseril.jpeg',
  'holo-indoor': '/images/holoindoor.jpeg',
  'wpc-30cm': '/images/wpc30cm.jpeg',
  'list-moulding': '/images/listmoulding.jpeg',
  'pu-stone': '/images/pustone.jpeg',
  'list-alumunium': '/images/listalumunium.jpeg',
}

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-gold-900/30">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div style={{
                background: '#ffffff',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Image
                  src="/images/logo-3j.PNG"
                  alt="3J Interior"
                  width={64}
                  height={64}
                  style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
                />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fdf6e3', lineHeight: 1, margin: 0, marginBottom: '5px' }}>3J Interior</p>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4a843', margin: 0 }}>Gudang WPC Premium</p>
              </div>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed font-body">
              Supplier dan distributor material interior WPC premium. Harga grosir langsung gudang untuk seluruh Indonesia.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://wa.me/6281385887778" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center hover:bg-[#25D366]/20 transition-colors">
                <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Kategori Produk - 2 kolom */}
          <div>
            <h4 className="font-display text-gold-400 text-lg mb-4 font-semibold">Kategori Produk</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="text-cream/60 hover:text-gold-400 text-sm font-body transition-all duration-300 flex items-center gap-2.5 group"
                  >
                    <div className="relative w-10 h-10 shrink-0 group-hover:drop-shadow-[0_0_6px_rgba(180,140,60,0.7)] transition-all duration-300">
                      <Image
                        src={categoryImages[cat.slug] ?? cat.image}
                        alt={cat.name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                        sizes="40px"
                      />
                    </div>
                    <span className="group-hover:text-gold-400 transition-colors duration-300 leading-tight">{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-display text-gold-400 text-lg mb-4 font-semibold">Hubungi Kami</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <p className="text-cream/60 text-sm font-body">Jakarta, Indonesia</p>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gold-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <a href="https://wa.me/6281385887778" className="text-cream/60 hover:text-gold-400 text-sm font-body transition-colors">+62 813-8588-7778</a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:3jinterior.id@gmail.com" className="text-cream/60 hover:text-gold-400 text-sm font-body transition-colors">3jinterior.id@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold-900/20 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-cream/40 text-xs font-body">© 2026 3J Interior. Hak Cipta Dilindungi.</p>
          <p className="text-cream/40 text-xs font-body">Material Interior WPC Premium | Harga Grosir | Jakarta</p>
        </div>
      </div>
    </footer>
  )
}
