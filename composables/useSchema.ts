// JSON-LD schema builder helpers for Schema.org structured data.
// All builders return plain objects — serialize via JSON.stringify when
// injecting into useHead({ script: [{ type: 'application/ld+json', innerHTML }] }).

import type { StrapiStone } from './useSignatureStones'
import { pickMediaUrl } from './useSignatureStones'

export function useSiteUrl(): string {
  const config = useRuntimeConfig()
  return ((config.public.siteUrl as string) || 'https://culturestone.com').replace(/\/$/, '')
}

export function buildOrganizationSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Culture Stone',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/favicon-192.png`,
      width: 192,
      height: 192,
    },
    description:
      'Bespoke marble and sintered stone slabs and architectural surfaces for architects and interior designers.',
    email: 'inquiries@culturestone.eu',
    telephone: '+8615196266588',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'inquiries@culturestone.eu',
      telephone: '+8615196266588',
      availableLanguage: ['English', 'German', 'French', 'Spanish', 'Chinese'],
    },
    location: [
      {
        '@type': 'Place',
        name: 'Culture Stone — Chengdu (Headquarters)',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'No. 54-1, South Third Section of Second Ring Road, High-tech Zone',
          addressLocality: 'Chengdu',
          addressRegion: 'Sichuan',
          postalCode: '610066',
          addressCountry: 'CN',
        },
      },
      {
        '@type': 'Place',
        name: 'Culture Stone — EU Representative (Synertrade FR SAS)',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '9 rue du Bat d\'Argent',
          addressLocality: 'Lyon',
          postalCode: '69001',
          addressCountry: 'FR',
        },
      },
    ],
  }
}

export function buildWebSiteSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Culture Stone',
    url: siteUrl,
    description:
      'Bespoke marble and sintered stone slabs for architects and interior designers.',
    inLanguage: ['en', 'de', 'fr', 'es'],
  }
}

export function buildBreadcrumbSchema(
  siteUrl: string,
  items: { name: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  }
}

export function buildProductSchema(siteUrl: string, stone: StrapiStone) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: stone.name,
    description: stone.description,
    ...(stone.image ? { image: pickMediaUrl(stone.image, 'large') } : {}),
    url: `${siteUrl}/catalog/${stone.slug}`,
    brand: {
      '@type': 'Brand',
      name: 'Culture Stone',
    },
    ...(stone.origin
      ? {
          additionalProperty: {
            '@type': 'PropertyValue',
            name: 'Origin',
            value: stone.origin,
          },
        }
      : {}),
    ...(stone.finish
      ? {
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'Finish',
              value: stone.finish,
            },
            ...(stone.thickness
              ? [
                  {
                    '@type': 'PropertyValue',
                    name: 'Thickness',
                    value: stone.thickness,
                  },
                ]
              : []),
          ],
        }
      : {}),
    material: 'Natural stone',
    ...(stone.priceFrom != null
      ? {
          offers: {
            '@type': 'AggregateOffer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'EUR',
            lowPrice: stone.priceFrom,
            highPrice: stone.priceTo ?? stone.priceFrom,
            seller: {
              '@type': 'Organization',
              name: 'Culture Stone',
              url: siteUrl,
            },
          },
        }
      : {}),
  }
}
