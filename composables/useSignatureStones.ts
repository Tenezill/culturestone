// Thin support module for the catalog UI. Content (name, origin, description,
// specs, imagery) is owned by Strapi — see `pages/catalog/*.vue` which fetch
// via `useStrapi()`. This file only holds what is NOT modelled in Strapi:
//
//   - `aspect` : a Tailwind aspect-ratio utility used by the gallery grid.
//
// It also exports shared TypeScript types for Strapi v5 responses and a small
// `resolveStrapiMedia()` helper that turns a relative /uploads URL into an
// absolute URL using the Strapi base URL from runtime config.

export type StrapiMediaFormat = {
  url: string
  width: number
  height: number
  mime: string
  size: number
  name: string
}

export type StrapiMedia = {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  url: string
  mime: string
  size: number
  formats?: Partial<
    Record<'thumbnail' | 'small' | 'medium' | 'large', StrapiMediaFormat>
  > | null
}

export type StrapiStone = {
  id: number
  documentId: string
  name: string
  slug: string
  origin: string
  subhead: string
  description: string
  finish: string
  thickness: string
  applications: string
  image: StrapiMedia | null
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

// Tailwind aspect-ratio classes per slug. Drives the gallery grid layout and
// is intentionally a frontend concern (design-layout, not content).
const STONE_ASPECT: Record<string, string> = {
  'carrara-fantastico': 'aspect-[3/4]',
  'nero-antico': 'aspect-[5/4]',
  'calacatta-oro': 'aspect-[4/5]',
  'grigio-carnico': 'aspect-[5/6]',
  'giallo-imperiale': 'aspect-[5/3]',
  'verde-alpi': 'aspect-[3/4]',
  'travertino-romano': 'aspect-[4/3]',
  'onice-fantastico': 'aspect-[2/3]',
  'rosso-lepanto': 'aspect-[3/5]',
  'calacatta-viola': 'aspect-[4/5]',
}

export function aspectForSlug(slug: string): string {
  return STONE_ASPECT[slug] ?? 'aspect-square'
}

export function signatureStoneSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Resolve a Strapi media URL to an absolute URL. Strapi's local provider
// returns paths like `/uploads/foo.jpg`; remote providers (S3, Cloudinary)
// return absolute URLs which we pass through unchanged.
export function resolveStrapiMedia(url: string | null | undefined): string {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) return url
  const config = useRuntimeConfig()
  const base =
    (config.public?.strapi as { url?: string } | undefined)?.url ||
    'http://localhost:1337'
  return `${base.replace(/\/$/, '')}${url}`
}

// Pick the best format for the given display size. Falls back through
// large -> medium -> small -> thumbnail -> original.
export function pickMediaUrl(
  media: StrapiMedia | null | undefined,
  preferred: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'large',
): string {
  if (!media) return ''
  if (preferred !== 'original') {
    const format = media.formats?.[preferred]
    if (format?.url) return resolveStrapiMedia(format.url)
  }
  return resolveStrapiMedia(media.url)
}
