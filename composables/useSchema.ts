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
      'Bespoke marble, limestone, and granite slabs and architectural surfaces for architects and interior designers.',
    // TODO: replace with production email once placeholder is resolved
    email: 'studio@culturestone.com',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'studio@culturestone.com',
      availableLanguage: ['English', 'German', 'French', 'Spanish'],
    },
    // TODO: add sameAs array with social profile URLs once accounts are live
    location: [
      {
        '@type': 'Place',
        name: 'Culture Stone New York',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'New York',
          addressRegion: 'NY',
          addressCountry: 'US',
        },
      },
      {
        '@type': 'Place',
        name: 'Culture Stone London',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'London',
          addressCountry: 'GB',
        },
      },
      {
        '@type': 'Place',
        name: 'Culture Stone Milan',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Milan',
          addressCountry: 'IT',
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
      'Bespoke marble, limestone, and granite slabs for architects and interior designers.',
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
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      seller: {
        '@type': 'Organization',
        name: 'Culture Stone',
        url: siteUrl,
      },
    },
  }
}
