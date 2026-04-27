export interface Product {
  id: string
  name: string
  category: string
  description: string
  sizes?: string[]
  image: string
  featured?: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount?: number
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
  tags: string[]
}

export interface SlideItem {
  id: string
  image: string
  title: string
  subtitle: string
  cta?: string
  ctaLink?: string
}

export interface SiteSettings {
  companyName: string
  tagline: string
  phone: string
  email: string
  address: string
  whatsappLink: string
  googleMapsLink: string
  googleMapsEmbed: string
}
