# 3J Interior - Website Company Profile

Website company profile untuk **3J Interior** — Gudang WPC, Wall Panel, Wallboard, Harga Grosir Jakarta.

## Stack Teknologi

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deploy:** Vercel

## Fitur Lengkap

- ✅ Hero Slideshow otomatis dengan 5 slide (manual + auto-play)
- ✅ Halaman Produk dengan filter kategori dan pencarian
- ✅ 6 Kategori Produk: WPC Wall Panel, Wallboard, Decking, UV Marmer, Holo Alumunium, PU Stone
- ✅ 19 Produk dengan foto, deskripsi, dan ukuran
- ✅ 10 Artikel SEO-optimized
- ✅ 6 Landing Page (1 per kategori)
- ✅ Admin Panel (`/admin`) - login, dashboard, CRUD produk, pengaturan
- ✅ CTA WhatsApp floating button
- ✅ Integrasi Google Maps
- ✅ Mobile Responsive
- ✅ SEO (metadata, OG tags, structured markup)
- ✅ Tema Emas / Gold

## Cara Jalankan Lokal

```bash
npm install --legacy-peer-deps
npm run dev
```

Buka: `http://localhost:3000`

## Admin Panel

URL: `http://localhost:3000/admin`

- **Username:** `admin`
- **Password:** `3jinterior2026`

> ⚠️ Ganti password di file `app/admin/page.tsx` sebelum deploy ke production!

## Deploy ke Vercel

1. Push project ke GitHub
2. Connect repository di [vercel.com](https://vercel.com)
3. Klik **Deploy**
4. Atur domain custom: `3jinterior.com`

### Setting Install Command di Vercel:
```
npm install --legacy-peer-deps
```

## Struktur Project

```
app/
├── (main)/           # Public pages dengan navbar/footer
│   ├── page.tsx      # Homepage
│   ├── products/     # Halaman semua produk + filter
│   ├── articles/     # Blog listing + detail
│   └── landing/      # Landing pages per kategori
├── admin/            # Admin panel (no navbar)
│   ├── page.tsx      # Login
│   └── dashboard/    # Dashboard CMS
components/
├── Navbar.tsx        # Navigasi utama
├── Footer.tsx        # Footer
├── HeroSlideshow.tsx # Slideshow hero
└── WhatsAppButton.tsx # Floating WA button
lib/
└── data.ts           # Semua data produk, artikel, settings
types/
└── index.ts          # TypeScript types
```

## Untuk Menambah/Edit Konten

### Produk Baru:
Gunakan Admin Panel → Login → Dashboard → Produk → Tambah Produk

### Foto Produk:
Upload foto ke Google Drive atau Cloudinary, copy link, paste di form admin.

### Artikel Baru:
Edit file `lib/data.ts`, tambahkan objek artikel baru ke array `articles`.

## Kontak & Info

- 📞 WhatsApp: +62 813-8588-7778
- 📧 Email: 3jinterior.id@gmail.com
- 📍 Jakarta, Indonesia
