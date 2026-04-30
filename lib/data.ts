import { Product, Category, Article, SlideItem, SiteSettings } from '@/types'

export const siteSettings: SiteSettings = {
  companyName: '3J Interior',
  tagline: 'Gudang WPC & Wall Panel | Material Interior Premium, Harga Grosir',
  phone: '+62 813-8588-7778',
  email: '3jinterior.id@gmail.com',
  address: 'Jakarta, Indonesia',
  whatsappLink: 'https://wa.me/6281385887778',
  googleMapsLink: 'https://maps.app.goo.gl/GVY1PQUqhTzufBur8?g_st=ic',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.373336068718!2d106.70446869999999!3d-6.0802933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a033a8c1e272f%3A0xc23274b76641f6e4!2s3J%20Interior%20%3A%20Gudang%20WPC%2C%20Wall%20Panel%2C%20Interior%2C%20Wallboard%2C%20Harga%20Import%2C%20Grosir%20dan%20Murah!5e0!3m2!1sid!2sid!4v1777528395735!5m2!1sid!2sid',
}

export const categories: Category[] = [
  { id: 'cat-1', name: 'Wallpanel / WPC', slug: 'wallpanel-wpc', description: 'Panel dinding WPC premium dengan 14 varian warna pilihan untuk interior modern dan elegan.', image: '/products/wallpanel-K03.png' },
  { id: 'cat-2', name: 'Wallboard', slug: 'wallboard', description: 'Wallboard PVC berkualitas tinggi tersedia dalam lebar 40cm dan 60cm dengan berbagai motif pilihan.', image: '/products/wallboard40-799.png' },
  { id: 'cat-3', name: 'Decking', slug: 'decking', description: 'WPC Decking premium untuk area outdoor. Tahan cuaca, anti-slip, dan awet untuk taman dan teras.', image: '/products/decking-all.jpeg' },
  { id: 'cat-4', name: 'WPC Outdoor', slug: 'wpc-outdoor', description: 'Panel WPC khusus outdoor tahan UV dan cuaca ekstrem untuk pagar, fasad, dan dinding eksterior.', image: '/products/wpc-outdoor-E02.png' },
  { id: 'cat-5', name: 'Holo Outdoor', slug: 'holo-outdoor', description: 'Holo WPC outdoor ukuran 5x5cm dan 5x10cm. Tahan karat dan cuaca untuk konstruksi eksterior.', image: '/products/holo-outdoor-5x5.jpeg' },
  { id: 'cat-6', name: 'UV Marmer', slug: 'uv-marmer', description: 'Panel UV Marmer premium ukuran 1.22m x 2.9m x 3mm dengan 7 motif eksklusif yang memukau.', image: '/products/uv-marmer-UV03.jpeg' },
  { id: 'cat-7', name: 'WPC Mini Seri H', slug: 'wpc-mini-seri-h', description: 'WPC Mini Seri N ukuran 10x150x2900mm. Panel mini dengan 7 pilihan warna untuk plafon dan partisi.', image: '/products/wpc-seriN-N09.jpeg' },
  { id: 'cat-8', name: 'WPC Mini Seri L', slug: 'wpc-mini-seri-l', description: 'WPC Mini Seri L ukuran 12x200x2900mm. Panel lebar dengan 7 pilihan warna untuk feature wall.', image: '/products/wpc-seriL-L07.jpeg' },
  { id: 'cat-9', name: 'Holo Indoor', slug: 'holo-indoor', description: 'Holo WPC indoor ukuran 5x5cm dan 5x10cm. Rangka pendukung pemasangan panel yang kuat dan rapi.', image: '/products/holo-indoor-5x5.jpeg' },
  { id: 'cat-10', name: 'WPC 30cm', slug: 'wpc-30cm', description: 'WPC lebar 30cm dengan desain garis elegan. Berbagai motif warna untuk dinding interior yang memukau.', image: '/products/wpc30cm-W30-9.jpeg' },
  { id: 'cat-11', name: 'List Moulding', slug: 'list-moulding', description: 'List moulding dekoratif berbagai ukuran untuk finishing dinding dan langit-langit. Ringan dan mudah dipasang.', image: '/products/moulding-PS101-103.png' },
  { id: 'cat-12', name: 'PU Stone', slug: 'pu-stone', description: 'Panel PU Stone Rock Panel ukuran 60x120cm tebal 5cm. Tampilan batu alam dalam 5 pilihan warna.', image: '/products/pustone-gold.jpeg' },
  { id: 'cat-13', name: 'List Alumunium', slug: 'list-alumunium', description: 'Aksesoris list alumunium lengkap: List T-mini, sudut ending, H sambung, H LED, L LED, sudut dalam W, sudut luar D.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
]

export const products: Product[] = [
  // WALLPANEL / WPC
  { id: 'wp-K01', name: 'Wallpanel WPC K01 - Hitam', category: 'wallpanel-wpc', description: 'Panel dinding WPC motif slat hitam elegan. Cocok untuk feature wall modern dan backdrop TV yang stylish.', sizes: ['2.9m x 30cm'], image: '/products/wallpanel-K01.png', featured: true },
  { id: 'wp-K02', name: 'Wallpanel WPC K02 - Walnut Tua', category: 'wallpanel-wpc', description: 'Panel WPC motif kayu walnut tua dengan tekstur alami. Memberikan kesan hangat dan mewah pada ruangan.', sizes: ['2.9m x 30cm'], image: '/products/wallpanel-K02.png', featured: true },
  { id: 'wp-K03', name: 'Wallpanel WPC K03 - Golden Teak', category: 'wallpanel-wpc', description: 'Panel WPC motif kayu golden teak. Warna coklat keemasan yang timeless untuk berbagai gaya interior.', sizes: ['2.9m x 30cm'], image: '/products/wallpanel-K03.png', featured: true },
  { id: 'wp-K04', name: 'Wallpanel WPC K04 - Putih Marmer', category: 'wallpanel-wpc', description: 'Panel WPC motif marmer putih klasik. Tampilan mewah dan bersih untuk ruang tamu dan kamar tidur premium.', sizes: ['2.9m x 30cm'], image: '/products/wallpanel-K04.png' },
  { id: 'wp-K05', name: 'Wallpanel WPC K05 - Dark Wenge', category: 'wallpanel-wpc', description: 'Panel WPC motif kayu dark wenge. Warna coklat tua gelap yang memberikan kesan bold dan sophisticated.', sizes: ['2.9m x 30cm'], image: '/products/wallpanel-K05.png' },
  { id: 'wp-K06', name: 'Wallpanel WPC K06 - Grey Oak', category: 'wallpanel-wpc', description: 'Panel WPC motif kayu abu-abu natural. Pilihan modern dan netral yang cocok dengan berbagai tema ruangan.', sizes: ['2.9m x 30cm'], image: '/products/wallpanel-K06.png' },
  { id: 'wp-K07', name: 'Wallpanel WPC K07 - Mahogany', category: 'wallpanel-wpc', description: 'Panel WPC motif mahogany merah bata. Warna kayu klasik yang memberikan kesan hangat dan tradisional.', sizes: ['2.9m x 30cm'], image: '/products/wallpanel-K07.png' },
  { id: 'wp-K08', name: 'Wallpanel WPC K08 - Dark Brown', category: 'wallpanel-wpc', description: 'Panel WPC motif kayu coklat gelap. Ideal untuk backdrop elegan dan dinding aksen ruang keluarga.', sizes: ['2.9m x 30cm'], image: '/products/wallpanel-K08.png' },
  { id: 'wp-K09', name: 'Wallpanel WPC K09 - Natural Oak', category: 'wallpanel-wpc', description: 'Panel WPC motif kayu natural oak cream. Warna terang yang memberikan kesan luas dan segar pada ruangan.', sizes: ['2.9m x 30cm'], image: '/products/wallpanel-K09.png' },
  { id: 'wp-K10', name: 'Wallpanel WPC K10 - Black Gold Marble', category: 'wallpanel-wpc', description: 'Panel WPC motif marmer hitam dengan urat emas. Tampilan paling mewah untuk interior premium.', sizes: ['2.9m x 30cm'], image: '/products/wallpanel-K10.png', featured: true },
  { id: 'wp-K11', name: 'Wallpanel WPC K11 - Medium Oak', category: 'wallpanel-wpc', description: 'Panel WPC motif kayu medium oak. Warna coklat natural yang hangat dan versatile untuk berbagai ruangan.', sizes: ['2.9m x 30cm'], image: '/products/wallpanel-K11.png' },
  { id: 'wp-K12', name: 'Wallpanel WPC K12 - Light Wood', category: 'wallpanel-wpc', description: 'Panel WPC motif kayu putih krem. Pilihan terbaik untuk interior minimalis dan Scandinavian style.', sizes: ['2.9m x 30cm'], image: '/products/wallpanel-K12.png' },
  { id: 'wp-1A15', name: 'Wallpanel WPC 1A15 - Classic Brown', category: 'wallpanel-wpc', description: 'Panel WPC motif kayu classic brown. Tekstur kayu yang kaya untuk kesan interior yang mewah.', sizes: ['2.9m x 30cm'], image: '/products/wallpanel-1A15.png' },
  { id: 'wp-1016', name: 'Wallpanel WPC 1016 - Blonde Oak', category: 'wallpanel-wpc', description: 'Panel WPC motif blonde oak cream keemasan. Warna cerah yang elegan untuk ruangan bertema modern natural.', sizes: ['2.9m x 30cm'], image: '/products/wallpanel-1016.png' },

  // WALLBOARD 40cm
  { id: 'wb40-799', name: 'Wallboard 40cm - 799 Grey Linen', category: 'wallboard', description: 'Wallboard PVC lebar 40cm motif abu linen. Permukaan halus dan elegan untuk dinding dan plafon interior.', sizes: ['40cm x 290cm x 9mm'], image: '/products/wallboard40-799.png', featured: true },
  { id: 'wb40-888', name: 'Wallboard 40cm - 888 Pure White', category: 'wallboard', description: 'Wallboard PVC lebar 40cm warna putih bersih. Pilihan terbaik untuk interior minimalis dan ruangan modern.', sizes: ['40cm x 290cm x 9mm'], image: '/products/wallboard40-888.png' },
  { id: 'wb40-789', name: 'Wallboard 40cm - 789 Light Grey', category: 'wallboard', description: 'Wallboard PVC lebar 40cm motif abu muda linen. Warna netral yang cocok dipadukan dengan berbagai dekorasi.', sizes: ['40cm x 290cm x 9mm'], image: '/products/wallboard40-789.png' },
  { id: 'wb40-A177', name: 'Wallboard 40cm - A177 Silver Grey', category: 'wallboard', description: 'Wallboard PVC lebar 40cm motif silver brushed. Tampilan metalik modern untuk interior kontemporer.', sizes: ['40cm x 290cm x 9mm'], image: '/products/wallboard40-A177.png' },
  { id: 'wb40-A155', name: 'Wallboard 40cm - A155 Grey Crosshatch', category: 'wallboard', description: 'Wallboard PVC lebar 40cm motif crosshatch abu. Tekstur unik yang memberikan dimensi pada dinding.', sizes: ['40cm x 290cm x 9mm'], image: '/products/wallboard40-A155.png' },

  // WALLBOARD 60cm
  { id: 'wb60-A177', name: 'Wallboard 60cm - A177 Silver Grey', category: 'wallboard', description: 'Wallboard PVC lebar 60cm motif silver brushed. Pemasangan lebih efisien dengan lebar ekstra untuk area besar.', sizes: ['60cm x 290cm x 8mm'], image: '/products/wallboard60-A177.jpeg', featured: true },
  { id: 'wb60-789', name: 'Wallboard 60cm - 789 Light Grey', category: 'wallboard', description: 'Wallboard PVC lebar 60cm motif abu muda linen. Ideal untuk plafon dan dinding ruangan luas.', sizes: ['60cm x 290cm x 8mm'], image: '/products/wallboard60-789.jpeg' },
  { id: 'wb60-799', name: 'Wallboard 60cm - 799 Grey Linen', category: 'wallboard', description: 'Wallboard PVC lebar 60cm motif abu linen klasik. Pemasangan cepat dan rapi untuk proyek besar.', sizes: ['60cm x 290cm x 8mm'], image: '/products/wallboard60-799.jpeg' },
  { id: 'wb60-A155', name: 'Wallboard 60cm - A155 Grey Crosshatch', category: 'wallboard', description: 'Wallboard PVC lebar 60cm motif crosshatch. Tampilan bertekstur yang menarik untuk berbagai aplikasi.', sizes: ['60cm x 290cm x 8mm'], image: '/products/wallboard60-A155.jpeg' },
  { id: 'wb60-888', name: 'Wallboard 60cm - 888 Pure White', category: 'wallboard', description: 'Wallboard PVC lebar 60cm warna putih bersih. Cocok untuk plafon dan dinding ruangan yang ingin terasa luas.', sizes: ['60cm x 290cm x 8mm'], image: '/products/wallboard60-888.jpeg' },

  // DECKING
  { id: 'dec-H01', name: 'WPC Decking H-01 Coffee', category: 'decking', description: 'Decking WPC warna coffee abu gelap. Tahan UV dan hujan, permukaan anti-slip aman untuk outdoor.', sizes: ['290cm x 15cm x 2.5cm'], image: '/products/decking-H01.jpeg', featured: true },
  { id: 'dec-H02', name: 'WPC Decking H-02 Almond', category: 'decking', description: 'Decking WPC warna almond coklat keemasan. Tampilan hangat dan natural untuk taman dan teras rumah.', sizes: ['290cm x 15cm x 2.5cm'], image: '/products/decking-H02.jpeg' },
  { id: 'dec-H03', name: 'WPC Decking H-03 Red', category: 'decking', description: 'Decking WPC warna red merah bata. Warna kayu tropis yang kaya untuk outdoor yang memukau.', sizes: ['290cm x 15cm x 2.5cm'], image: '/products/decking-H03.jpeg' },

  // WPC OUTDOOR
  { id: 'wout-E02', name: 'WPC Outdoor E02 - Golden Brown', category: 'wpc-outdoor', description: 'Panel WPC outdoor warna golden brown. Tahan cuaca ekstrem untuk pagar, fasad, dan dinding eksterior.', sizes: ['2.9m panjang'], image: '/products/wpc-outdoor-E02.png', featured: true },
  { id: 'wout-E04', name: 'WPC Outdoor E04 - Dark Red Brown', category: 'wpc-outdoor', description: 'Panel WPC outdoor warna dark red brown. Material eksterior premium tahan UV, tidak perlu pengecatan ulang.', sizes: ['2.9m panjang'], image: '/products/wpc-outdoor-E04.png' },

  // HOLO OUTDOOR
  { id: 'ho-5x5', name: 'Holo Outdoor 5x5cm (FO1-FO4)', category: 'holo-outdoor', description: 'Holo WPC outdoor 5x5x290cm. 4 warna: FO1 Merah Bata, FO2 Golden, FO3 Abu Gelap, FO4 Coklat Medium.', sizes: ['5x5x290cm'], image: '/products/holo-outdoor-5x5.jpeg', featured: true },
  { id: 'ho-5x10', name: 'Holo Outdoor 5x10cm (GO1-GO4)', category: 'holo-outdoor', description: 'Holo WPC outdoor 5x10x290cm. 4 warna: GO1 Merah Bata, GO2 Golden, GO3 Abu Gelap, GO4 Coklat Medium.', sizes: ['5x10x290cm'], image: '/products/holo-outdoor-5x10.jpeg' },

  // UV MARMER
  { id: 'uv-01', name: 'UV Marmer UV-01+ Abstract Blue Gold', category: 'uv-marmer', description: 'Panel UV Marmer motif abstract biru dan gold. Tampilan artistik dan mewah untuk dinding accent.', sizes: ['1.22m x 2.9m x 3mm'], image: '/products/uv-marmer-UV01.jpeg', featured: true },
  { id: 'uv-02', name: 'UV Marmer UV-02+ Luxury Gold', category: 'uv-marmer', description: 'Panel UV Marmer motif luxury gold cream. Tampilan paling mewah dengan detail emas berkilau.', sizes: ['1.22m x 2.9m x 3mm'], image: '/products/uv-marmer-UV02.jpeg', featured: true },
  { id: 'uv-03', name: 'UV Marmer UV-03+ Calacatta Gold', category: 'uv-marmer', description: 'Panel UV Marmer motif Calacatta dengan urat emas. Tampilan marmer Italia premium yang mewah.', sizes: ['1.22m x 2.9m x 3mm'], image: '/products/uv-marmer-UV03.jpeg' },
  { id: 'uv-04', name: 'UV Marmer UV-04 White Gold', category: 'uv-marmer', description: 'Panel UV Marmer motif putih dengan urat emas tipis. Tampilan bersih dan elegan untuk ruangan modern.', sizes: ['1.22m x 2.9m x 3mm'], image: '/products/uv-marmer-UV04.jpeg' },
  { id: 'uv-05', name: 'UV Marmer UV-05 Grey Gold', category: 'uv-marmer', description: 'Panel UV Marmer motif abu dengan urat emas. Kombinasi modern dan mewah untuk interior kontemporer.', sizes: ['1.22m x 2.9m x 3mm'], image: '/products/uv-marmer-UV05.jpeg' },
  { id: 'uv-06', name: 'UV Marmer UV-06 Blue Marble', category: 'uv-marmer', description: 'Panel UV Marmer motif biru elegan dengan urat emas. Tampilan unik untuk statement wall.', sizes: ['1.22m x 2.9m x 3mm'], image: '/products/uv-marmer-UV06.jpeg' },
  { id: 'uv-07', name: 'UV Marmer UV-07 Black Marble', category: 'uv-marmer', description: 'Panel UV Marmer motif hitam dengan urat putih. Tampilan bold dan dramatis untuk interior striking.', sizes: ['1.22m x 2.9m x 3mm'], image: '/products/uv-marmer-UV07.jpeg' },

  // WPC MINI SERI N (H)
  { id: 'sn-N05', name: 'WPC Seri N - N05 Dark Brown', category: 'wpc-mini-seri-h', description: 'WPC Seri N warna coklat tua. Panel mini slatted dengan detail kayu yang kaya untuk interior premium.', sizes: ['10x150x2900mm', '1 dus isi 12pcs'], image: '/products/wpc-seriN-N05.jpeg', featured: true },
  { id: 'sn-N06', name: 'WPC Seri N - N06 Dark Wenge', category: 'wpc-mini-seri-h', description: 'WPC Seri N warna dark wenge. Warna gelap yang sophisticated untuk interior modern.', sizes: ['10x150x2900mm', '1 dus isi 12pcs'], image: '/products/wpc-seriN-N06.jpeg' },
  { id: 'sn-N07', name: 'WPC Seri N - N07 Light Oak', category: 'wpc-mini-seri-h', description: 'WPC Seri N warna light oak cream. Panel terang yang memberikan kesan luas dan segar.', sizes: ['10x150x2900mm', '1 dus isi 12pcs'], image: '/products/wpc-seriN-N07.jpeg' },
  { id: 'sn-N08', name: 'WPC Seri N - N08 Reddish Brown', category: 'wpc-mini-seri-h', description: 'WPC Seri N warna reddish brown. Warna coklat kemerahan hangat untuk berbagai tema interior.', sizes: ['10x150x2900mm', '1 dus isi 12pcs'], image: '/products/wpc-seriN-N08.jpeg' },
  { id: 'sn-N09', name: 'WPC Seri N - N09 Golden Oak', category: 'wpc-mini-seri-h', description: 'WPC Seri N warna golden oak. Warna coklat keemasan natural yang hangat dan versatile.', sizes: ['10x150x2900mm', '1 dus isi 12pcs'], image: '/products/wpc-seriN-N09.jpeg' },
  { id: 'sn-N10', name: 'WPC Seri N - N10 Dark Grey', category: 'wpc-mini-seri-h', description: 'WPC Seri N warna dark grey. Pilihan modern dan industrial untuk interior kontemporer.', sizes: ['10x150x2900mm', '1 dus isi 12pcs'], image: '/products/wpc-seriN-N10.jpeg' },
  { id: 'sn-N11', name: 'WPC Seri N - N11 Dark Chocolate', category: 'wpc-mini-seri-h', description: 'WPC Seri N warna dark chocolate. Warna coklat ungu gelap yang unik untuk interior berkarakter.', sizes: ['10x150x2900mm', '1 dus isi 12pcs'], image: '/products/wpc-seriN-N11.jpeg' },

  // WPC MINI SERI L
  { id: 'sl-L05', name: 'WPC Seri L - L05 Dark Brown', category: 'wpc-mini-seri-l', description: 'WPC Seri L warna coklat tua. Panel lebar premium untuk feature wall dan backdrop yang impresif.', sizes: ['12x200x2900mm', '1 dus isi 12pcs'], image: '/products/wpc-seriL-L05.jpeg', featured: true },
  { id: 'sl-L06', name: 'WPC Seri L - L06 Dark Wenge', category: 'wpc-mini-seri-l', description: 'WPC Seri L warna dark wenge. Panel lebar yang memberikan tampilan bold dan sophisticated.', sizes: ['12x200x2900mm', '1 dus isi 12pcs'], image: '/products/wpc-seriL-L06.jpeg' },
  { id: 'sl-L07', name: 'WPC Seri L - L07 Light Oak', category: 'wpc-mini-seri-l', description: 'WPC Seri L warna light oak cream natural. Ideal untuk interior cerah bergaya Scandinavian.', sizes: ['12x200x2900mm', '1 dus isi 12pcs'], image: '/products/wpc-seriL-L07.jpeg' },
  { id: 'sl-L08', name: 'WPC Seri L - L08 Reddish Brown', category: 'wpc-mini-seri-l', description: 'WPC Seri L warna reddish brown. Warna kayu tropis yang hangat dan natural.', sizes: ['12x200x2900mm', '1 dus isi 12pcs'], image: '/products/wpc-seriL-L08.jpeg' },
  { id: 'sl-L10', name: 'WPC Seri L - L10 Dark Grey', category: 'wpc-mini-seri-l', description: 'WPC Seri L warna dark grey. Pilihan modern untuk interior industrial dan kontemporer.', sizes: ['12x200x2900mm', '1 dus isi 12pcs'], image: '/products/wpc-seriL-L10.jpeg' },
  { id: 'sl-L11', name: 'WPC Seri L - L11 Dark Chocolate', category: 'wpc-mini-seri-l', description: 'WPC Seri L warna dark chocolate. Warna unik yang berkarakter untuk ruangan premium.', sizes: ['12x200x2900mm', '1 dus isi 12pcs'], image: '/products/wpc-seriL-L11.jpeg' },

  // HOLO INDOOR
  { id: 'hi-5x5', name: 'Holo Indoor 5x5cm (A05-A09)', category: 'holo-indoor', description: 'Holo WPC indoor 50x50x2900mm, isi 16pcs/dus. 5 warna A05-A09 untuk rangka panel yang presisi.', sizes: ['50x50x2900mm', '1 dus isi 16pcs'], image: '/products/holo-indoor-5x5.jpeg', featured: true },
  { id: 'hi-5x10', name: 'Holo Indoor 5x10cm (B05-B09)', category: 'holo-indoor', description: 'Holo WPC indoor 5x10x2900mm, isi 8pcs/dus. 5 warna B05-B09 untuk konstruksi yang lebih kuat.', sizes: ['5x10x2900mm', '1 dus isi 8pcs'], image: '/products/holo-indoor-5x10.jpeg' },

  // WPC 30cm
  { id: 'w30-1', name: 'WPC 30cm - W30-1 White Marble', category: 'wpc-30cm', description: 'WPC lebar 30cm motif marmer putih dengan aksen emas. Panel dinding lebar untuk pemasangan efisien.', sizes: ['30cm x 290cm'], image: '/products/wpc30cm-W30-1.jpeg', featured: true },
  { id: 'w30-2', name: 'WPC 30cm - W30-2 Natural Cream', category: 'wpc-30cm', description: 'WPC lebar 30cm motif kayu natural cream. Warna terang dan natural untuk ruangan minimalis.', sizes: ['30cm x 290cm'], image: '/products/wpc30cm-W30-2.jpeg' },
  { id: 'w30-3', name: 'WPC 30cm - W30-3 Grey Natural', category: 'wpc-30cm', description: 'WPC lebar 30cm motif abu natural. Kombinasi abu dan kayu yang modern untuk interior kontemporer.', sizes: ['30cm x 290cm'], image: '/products/wpc30cm-W30-3.jpeg' },
  { id: 'w30-9', name: 'WPC 30cm - W30-9 Golden Brown', category: 'wpc-30cm', description: 'WPC lebar 30cm motif golden brown. Warna coklat keemasan hangat yang timeless untuk berbagai ruangan.', sizes: ['30cm x 290cm'], image: '/products/wpc30cm-W30-9.jpeg' },

  // LIST MOULDING
  { id: 'lm-PS101', name: 'List Moulding PS101 (2x1cm)', category: 'list-moulding', description: 'List moulding putih 2x1x290cm. Finishing minimalis untuk sudut dinding dan kusen pintu.', sizes: ['2x1x290cm', '176pcs/dos'], image: '/products/moulding-PS101-103.png' },
  { id: 'lm-PS102', name: 'List Moulding PS102 (4x1.8cm)', category: 'list-moulding', description: 'List moulding putih 4x1.8x290cm. Profil dekoratif untuk finishing dinding yang rapi.', sizes: ['4x1.8x290cm', '50pcs/dos'], image: '/products/moulding-PS101-103.png' },
  { id: 'lm-PS103', name: 'List Moulding PS103 (6x2.4cm)', category: 'list-moulding', description: 'List moulding putih 6x2.4x290cm. Profil yang lebih besar untuk dekorasi yang menonjol.', sizes: ['6x2.4x290cm', '28pcs/dos'], image: '/products/moulding-PS101-103.png' },
  { id: 'lm-PS104', name: 'List Moulding PS104 (8x2.4cm)', category: 'list-moulding', description: 'List moulding putih 8x2.4x290cm. Profil besar untuk dekorasi langit-langit yang mewah.', sizes: ['8x2.4x290cm', '20pcs/dos'], image: '/products/moulding-PS104-106.png', featured: true },
  { id: 'lm-PS105', name: 'List Moulding PS105 (2.5x1.2cm)', category: 'list-moulding', description: 'List moulding putih 2.5x1.2x290cm. Profil ramping untuk finishing yang halus dan rapi.', sizes: ['2.5x1.2x290cm', '102pcs/dos'], image: '/products/moulding-PS104-106.png' },
  { id: 'lm-PS106', name: 'List Moulding PS106 (4x2cm)', category: 'list-moulding', description: 'List moulding putih 4x2x290cm. Profil serbaguna untuk berbagai kebutuhan finishing interior.', sizes: ['4x2x290cm', '48pcs/dos'], image: '/products/moulding-PS104-106.png' },
  { id: 'lm-PS107', name: 'List Moulding PS107 (6x2cm)', category: 'list-moulding', description: 'List moulding putih 6x2x290cm. Profil segitiga elegan untuk sudut dan transisi dinding.', sizes: ['6x2x290cm', '31pcs/dos'], image: '/products/moulding-PS107-109.png' },
  { id: 'lm-PS108', name: 'List Moulding PS108 (10x12cm)', category: 'list-moulding', description: 'List moulding putih 10x12x290cm. Crown moulding besar untuk langit-langit mewah.', sizes: ['10x12x290cm', '18pcs/dos'], image: '/products/moulding-PS107-109.png' },
  { id: 'lm-PS109', name: 'List Moulding PS109 (10x12cm)', category: 'list-moulding', description: 'List moulding putih 10x12x290cm. Profil dekoratif untuk langit-langit dan dinding premium.', sizes: ['10x12x290cm', '25pcs/dos'], image: '/products/moulding-PS107-109.png' },

  // PU STONE
  { id: 'ps-01', name: 'PU Stone MS50L-01 - White', category: 'pu-stone', description: 'Panel PU Stone Rock putih bersih. Tampilan batu alam ringan dan mudah dipasang untuk interior maupun eksterior.', sizes: ['60x120cm', 'Tebal 5cm'], image: '/products/pustone-white.jpeg', featured: true },
  { id: 'ps-02', name: 'PU Stone MS50L-02 - Cream', category: 'pu-stone', description: 'Panel PU Stone Rock warna cream natural. Tampilan batu alam hangat cocok untuk ruang tamu dan taman.', sizes: ['60x120cm', 'Tebal 5cm'], image: '/products/pustone-cream.png' },
  { id: 'ps-05', name: 'PU Stone MS50L-05 - Dark Grey', category: 'pu-stone', description: 'Panel PU Stone Rock dark grey. Tampilan batu alam modern untuk interior industrial dan kontemporer.', sizes: ['60x120cm', 'Tebal 5cm'], image: '/products/pustone-darkgrey.png' },
  { id: 'ps-06', name: 'PU Stone MS50L-06 - Black', category: 'pu-stone', description: 'Panel PU Stone Rock hitam. Tampilan batu alam bold dan dramatis untuk statement wall.', sizes: ['60x120cm', 'Tebal 5cm'], image: '/products/pustone-black.png' },
  { id: 'ps-07', name: 'PU Stone MS50L-07 - Gold', category: 'pu-stone', description: 'Panel PU Stone Rock warna gold sandstone. Tampilan batu alam premium yang hangat dan mewah.', sizes: ['60x120cm', 'Tebal 5cm'], image: '/products/pustone-gold.jpeg' },

  // LIST ALUMUNIUM
  { id: 'la-001', name: 'List T-Mini', category: 'list-alumunium', description: 'List alumunium T-Mini untuk finishing panel WPC. Memberikan tampilan rapi dan profesional di setiap sambungan.', sizes: ['2.4m', '2.9m'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 'la-002', name: 'List Sudut Ending', category: 'list-alumunium', description: 'List alumunium sudut ending untuk finishing tepi panel. Melindungi ujung panel dan memberikan tampilan bersih.', sizes: ['2.4m', '2.9m'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 'la-003', name: 'List H Sambung', category: 'list-alumunium', description: 'List alumunium H untuk menyambung dua panel WPC. Memberikan transisi yang rapi antara dua bidang panel.', sizes: ['2.4m', '2.9m'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', featured: true },
  { id: 'la-004', name: 'List H LED', category: 'list-alumunium', description: 'List alumunium H khusus untuk pemasangan LED strip. Menciptakan efek cahaya ambient yang memukau pada panel.', sizes: ['2.4m', '2.9m'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 'la-005', name: 'List L LED', category: 'list-alumunium', description: 'List alumunium L khusus LED strip untuk sudut dinding. Ideal untuk pencahayaan aksen di pojok ruangan.', sizes: ['2.4m', '2.9m'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 'la-006', name: 'List Sudut Dalam W', category: 'list-alumunium', description: 'List alumunium sudut dalam tipe W. Finishing sudut interior yang rapi dan kokoh untuk panel WPC.', sizes: ['2.4m', '2.9m'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 'la-007', name: 'List Sudut Luar D', category: 'list-alumunium', description: 'List alumunium sudut luar tipe D. Melindungi sudut eksterior panel dan memberikan tampilan yang profesional.', sizes: ['2.4m', '2.9m'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
]

export const slides: SlideItem[] = [
  { id: 'slide-1', image: '/products/slide1.jpeg', title: 'Wallpanel WPC Premium', subtitle: 'Transformasi ruangan Anda dengan 14 pilihan warna panel WPC berkualitas tinggi', cta: 'Lihat Produk', ctaLink: '/products' },
  { id: 'slide-2', image: '/products/slide2.jpeg', title: 'UV Marmer Eksklusif', subtitle: 'Panel UV Marmer mewah 1.22m x 2.9m dengan 7 motif pilihan yang memukau', cta: 'Konsultasi Gratis', ctaLink: 'https://wa.me/6281385887778' },
  { id: 'slide-3', image: '/products/slide3.jpeg', title: 'WPC Decking Outdoor', subtitle: 'Decking WPC tahan cuaca untuk taman dan teras impian Anda', cta: 'Hubungi Kami', ctaLink: 'https://wa.me/6281385887778' },
  { id: 'slide-4', image: '/products/slide4.jpeg', title: 'Harga Grosir Langsung Gudang', subtitle: 'Dapatkan harga terbaik untuk kebutuhan material interior proyek Anda', cta: 'Dapatkan Penawaran', ctaLink: 'https://wa.me/6281385887778' },
  { id: 'slide-5', image: '/products/slide5.jpeg', title: 'Wallboard PVC Premium', subtitle: 'Wallboard tersedia lebar 40cm dan 60cm untuk berbagai kebutuhan renovasi', cta: 'Lihat Koleksi', ctaLink: '/products' },
]

export const articles: Article[] = [
  { id: 'art-1', slug: 'keunggulan-wpc-vs-kayu-asli', title: 'Mengapa WPC Lebih Unggul dari Kayu Asli untuk Interior Modern?', excerpt: 'Panel WPC kini menjadi pilihan utama desainer interior profesional. Simak perbandingan lengkap antara WPC dan kayu asli yang akan mengubah pandangan Anda.', content: '', image: '/products/wallpanel-K03.png', date: '2026-04-10', author: '3J Interior', tags: ['WPC', 'Material Interior', 'Tips Desain'] },
  { id: 'art-2', slug: 'cara-pasang-wpc-wall-panel-sendiri', title: 'Panduan Lengkap Pasang WPC Wall Panel Sendiri di Rumah', excerpt: 'Memasang WPC Wall Panel ternyata bisa dilakukan sendiri tanpa tukang khusus. Ikuti panduan langkah demi langkah berikut ini untuk hasil yang rapi dan profesional.', content: '', image: '/products/wallpanel-K02.png', date: '2026-04-05', author: '3J Interior', tags: ['Tutorial', 'DIY', 'WPC Wall Panel'] },
  { id: 'art-3', slug: 'inspirasi-desain-backdrop-tv-wpc', title: '10 Inspirasi Desain Backdrop TV dengan Panel WPC yang Bikin Ruang Tamu Jadi Wow', excerpt: 'Backdrop TV adalah focal point ruang tamu. Dengan panel WPC slatted dan pencahayaan yang tepat, ruang tamu biasa bisa berubah menjadi ruangan bergaya hotel bintang 5.', content: '', image: '/products/wallpanel-K10.png', date: '2026-03-28', author: '3J Interior', tags: ['Inspirasi', 'Backdrop TV', 'Ruang Tamu'] },
  { id: 'art-4', slug: 'uv-marmer-vs-marmer-asli', title: 'UV Marmer vs Marmer Asli: Mana yang Lebih Worth It untuk Hunian Anda?', excerpt: 'Marmer asli memang indah, tapi bobotnya berat dan harganya selangit. UV Marmer hadir sebagai solusi cerdas. Kami bandingkan keduanya secara jujur dari berbagai aspek.', content: '', image: '/products/uv-marmer-UV02.jpeg', date: '2026-03-20', author: '3J Interior', tags: ['UV Marmer', 'Material', 'Perbandingan'] },
  { id: 'art-5', slug: 'tren-interior-2026-panel-kayu', title: 'Tren Interior 2026: Dominasi Panel Kayu dan Material Alam di Hunian Modern', excerpt: 'Tahun 2026 menjadi era kebangkitan material alam dalam desain interior. Panel WPC dan material berbahan dasar kayu mendominasi tren global yang kini merambah ke Indonesia.', content: '', image: '/products/wallpanel-K11.png', date: '2026-03-15', author: '3J Interior', tags: ['Tren 2026', 'Desain Interior', 'Panel Kayu'] },
  { id: 'art-6', slug: 'decking-wpc-taman-impian', title: 'Wujudkan Taman Impian dengan Decking WPC yang Tahan Segala Cuaca', excerpt: 'Taman dan teras outdoor adalah ruang relaksasi keluarga. Decking WPC memberikan tampilan taman kayu mewah yang perawatannya jauh lebih mudah dari kayu solid.', content: '', image: '/products/decking-all.jpeg', date: '2026-03-08', author: '3J Interior', tags: ['Decking', 'Outdoor', 'Taman'] },
  { id: 'art-7', slug: 'tips-pilih-material-partisi-ruangan', title: 'Tips Memilih Material Partisi yang Tepat untuk Setiap Ruangan', excerpt: 'Partisi ruangan bukan sekadar pembatas, tapi juga elemen estetis yang membentuk karakter ruangan. Temukan material partisi terbaik sesuai kebutuhan dan anggaran Anda.', content: '', image: '/products/wpc-seriN-N09.jpeg', date: '2026-02-25', author: '3J Interior', tags: ['Tips', 'Partisi', 'Material Interior'] },
  { id: 'art-8', slug: 'wallboard-solusi-dinding-murah-meriah', title: 'Wallboard: Solusi Dinding Elegan dengan Anggaran yang Lebih Hemat', excerpt: 'Tidak harus mahal untuk mendapatkan dinding yang indah. Wallboard premium dari 3J Interior hadir sebagai solusi cost-effective untuk hunian dan proyek komersial.', content: '', image: '/products/wallboard40-799.png', date: '2026-02-18', author: '3J Interior', tags: ['Wallboard', 'Hemat', 'Interior Budget'] },
  { id: 'art-9', slug: 'pu-stone-dinding-batu-alam-tanpa-berat', title: 'PU Stone: Nikmati Estetika Batu Alam Tanpa Kerumitan Pemasangan', excerpt: 'Dinding batu alam selalu memancarkan kesan maskulin dan natural yang kuat. Kini dengan PU Stone, Anda bisa mendapatkan tampilan yang sama dengan bobot lebih ringan.', content: '', image: '/products/pustone-gold.jpeg', date: '2026-02-10', author: '3J Interior', tags: ['PU Stone', 'Batu Alam', 'Dekorasi Dinding'] },
  { id: 'art-10', slug: 'cara-hitung-kebutuhan-material-interior', title: 'Cara Mudah Menghitung Kebutuhan Material Interior Sebelum Belanja', excerpt: 'Salah hitung material bisa bikin proyek meleset dari anggaran. Pelajari rumus sederhana untuk menghitung kebutuhan WPC, wallboard, dan material interior lainnya dengan tepat.', content: '', image: '/products/wpc30cm-W30-9.jpeg', date: '2026-02-01', author: '3J Interior', tags: ['Tips', 'Perhitungan Material', 'Panduan Belanja'] },
]
