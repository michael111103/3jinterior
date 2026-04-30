'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const whatsappNumber = '6281385887778'

type EKatalog = {
  id: string
  label: string
  link: string
  sort_order: number
}

const WaIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
)

export default function LandingPage() {
  const waMsg = encodeURIComponent('Halo 3J Interior, saya ingin tanya mengenai produk dan harga. Bisa bantu saya?')
  const [catalogItems, setCatalogItems] = useState<EKatalog[]>([])

  useEffect(() => {
    supabase
      .from('ekatalog')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data) setCatalogItems(data)
      })
  }, [])

  return (
    <div className="min-h-screen">

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
              key={item.id}
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

    </div>
  )
}
