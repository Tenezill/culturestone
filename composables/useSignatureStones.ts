import {
  SIGNATURE_STONE_PAGE_DETAILS,
  type SignatureStonePageDetail,
} from '~/data/signatureStonePageDetails'

export type GalleryStone = {
  name: string
  src: string
  aspect: string
}

export type { SignatureStonePageDetail }

// Placeholder imagery is AI-generated (see public/img/LICENSES.md). Each
// active entry below uses a unique placeholder; stones that would have
// repeated an image already in use are commented out until the
// Strapi-managed product photography is connected and can supply a distinct
// photograph per stone.
const PLACEHOLDER_LIGHT = '/img/ai-light-marble.jpg'
const PLACEHOLDER_DARK = '/img/ai-dark-marble.jpg'
const PLACEHOLDER_VEINED = '/img/ai-veined-stone.jpg'
const PLACEHOLDER_CRACKED = '/img/ai-cracked-stone.jpg'
const PLACEHOLDER_ROCK = '/img/ai-rock-formation.jpg'
const PLACEHOLDER_WALL = '/img/ai-stone-wall.jpg'
const PLACEHOLDER_PINK = '/img/ai-pink-marble.jpg'
const PLACEHOLDER_BLUE_CORAL = '/img/ai-blue-coral.jpg'
const PLACEHOLDER_PURPLE = '/img/ai-purple-marble.jpg'
const PLACEHOLDER_BLUE_GREEN = '/img/ai-blue-green.jpg'

const SIGNATURE_STONES: GalleryStone[] = [
  {
    name: 'Carrara Fantastico',
    src: PLACEHOLDER_LIGHT,
    aspect: 'aspect-[3/4]',
  },
  {
    name: 'Nero Antico',
    src: PLACEHOLDER_DARK,
    aspect: 'aspect-[5/4]',
  },
  {
    name: 'Calacatta Oro',
    src: PLACEHOLDER_VEINED,
    aspect: 'aspect-[4/5]',
  },
  /* Statuario Imperial — would duplicate PLACEHOLDER_LIGHT (Carrara Fantastico)
  {
    name: 'Statuario Imperial',
    src: PLACEHOLDER_LIGHT,
    aspect: 'aspect-square',
  },
  */
  /* Arabescato Vagli — would duplicate PLACEHOLDER_VEINED (Calacatta Oro)
  {
    name: 'Arabescato Vagli',
    src: PLACEHOLDER_VEINED,
    aspect: 'aspect-[2/3]',
  },
  */
  {
    name: 'Grigio Carnico',
    src: PLACEHOLDER_ROCK,
    aspect: 'aspect-[5/6]',
  },
  /* Bianco Lasa — would duplicate PLACEHOLDER_LIGHT (Carrara Fantastico)
  {
    name: 'Bianco Lasa',
    src: PLACEHOLDER_LIGHT,
    aspect: 'aspect-[4/3]',
  },
  */
  /* Emperador Dark — would duplicate PLACEHOLDER_DARK (Nero Antico)
  {
    name: 'Emperador Dark',
    src: PLACEHOLDER_DARK,
    aspect: 'aspect-[3/5]',
  },
  */
  /* Volakas White — would duplicate PLACEHOLDER_LIGHT (Carrara Fantastico)
  {
    name: 'Volakas White',
    src: PLACEHOLDER_LIGHT,
    aspect: 'aspect-[5/4]',
  },
  */
  /* Sivec Premium — would duplicate PLACEHOLDER_LIGHT (Carrara Fantastico)
  {
    name: 'Sivec Premium',
    src: PLACEHOLDER_LIGHT,
    aspect: 'aspect-[3/4]',
  },
  */
  /* Portoro Extra — would duplicate PLACEHOLDER_DARK (Nero Antico)
  {
    name: 'Portoro Extra',
    src: PLACEHOLDER_DARK,
    aspect: 'aspect-[4/5]',
  },
  */
  {
    name: 'Giallo Imperiale',
    src: PLACEHOLDER_WALL,
    aspect: 'aspect-[5/3]',
  },
  /* Thassos Snow — would duplicate PLACEHOLDER_LIGHT (Carrara Fantastico)
  {
    name: 'Thassos Snow',
    src: PLACEHOLDER_LIGHT,
    aspect: 'aspect-square',
  },
  */
  {
    name: 'Verde Alpi',
    src: PLACEHOLDER_BLUE_GREEN,
    aspect: 'aspect-[3/4]',
  },
  {
    name: 'Travertino Romano',
    src: PLACEHOLDER_CRACKED,
    aspect: 'aspect-[4/3]',
  },
  {
    name: 'Onice Fantastico',
    src: PLACEHOLDER_BLUE_CORAL,
    aspect: 'aspect-[2/3]',
  },
  /* Azul Macaubas — would duplicate PLACEHOLDER_BLUE_CORAL (Onice Fantastico)
  {
    name: 'Azul Macaubas',
    src: PLACEHOLDER_BLUE_CORAL,
    aspect: 'aspect-[5/4]',
  },
  */
  {
    name: 'Rosso Lepanto',
    src: PLACEHOLDER_PINK,
    aspect: 'aspect-[3/5]',
  },
  {
    name: 'Calacatta Viola',
    src: PLACEHOLDER_PURPLE,
    aspect: 'aspect-[4/5]',
  },
  /* Macchia Vecchia — would duplicate PLACEHOLDER_CRACKED (Travertino Romano)
  {
    name: 'Macchia Vecchia',
    src: PLACEHOLDER_CRACKED,
    aspect: 'aspect-[5/6]',
  },
  */
]

export function signatureStoneSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function defaultPageDetail(stone: GalleryStone): SignatureStonePageDetail {
  return {
    origin: 'Provenance on request',
    subhead: 'Signature Gallery Stone',
    description: `A curated ${stone.name} selection from our Signature Gallery, sourced for tone, structure, and long-term performance. Lot imagery and technical sheets are available for specification.`,
    specs: {
      finish: 'Finish per lot',
      thickness: '2 cm and 3 cm typical',
      applications: 'Flooring, cladding, bespoke surfaces',
    },
  }
}

export function resolveSignatureStonePage(
  stone: GalleryStone,
  slug: string,
): { stone: GalleryStone; detail: SignatureStonePageDetail } {
  const detail = SIGNATURE_STONE_PAGE_DETAILS[slug] ?? defaultPageDetail(stone)
  return { stone, detail }
}

export function findSignatureStonePage(
  slug: string,
): { stone: GalleryStone; detail: SignatureStonePageDetail } | null {
  if (!slug) {
    return null
  }
  const stone = SIGNATURE_STONES.find((s) => signatureStoneSlug(s.name) === slug)
  if (!stone) {
    return null
  }
  return resolveSignatureStonePage(stone, slug)
}

export function useSignatureStones(): readonly GalleryStone[] {
  return SIGNATURE_STONES
}
