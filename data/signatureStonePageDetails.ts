export type SignatureStonePageDetail = {
  origin: string
  subhead: string
  description: string
  specs: {
    finish: string
    thickness: string
    applications: string
  }
}

export const SIGNATURE_STONE_PAGE_DETAILS: Record<string, SignatureStonePageDetail> = {
  'carrara-fantastico': {
    origin: 'Apuan Alps, Tuscany',
    subhead: 'Bespoke Italian Marble',
    description:
      'A dramatic Carrara selection defined by graphite veining across a luminous white field. Suited to statement surfaces where contrast and rhythm matter as much as light.',
    specs: {
      finish: 'Honed or polished',
      thickness: '2 cm and 3 cm',
      applications: 'Flooring, cladding, vanity tops',
    },
  },
  'nero-antico': {
    origin: 'Levanto, Liguria',
    subhead: 'Deep Italian Marble',
    description:
      'Rich jet-black ground traced by delicate hairline white veining in frost-like patterns. Quiet and disciplined from afar, crystalline under close inspection.',
    specs: {
      finish: 'Leathered, honed, or high polish',
      thickness: '2 cm and 3 cm',
      applications: 'Feature walls, hearths, wet bars',
    },
  },
  'calacatta-oro': {
    origin: 'Carrara basin, Tuscany',
    subhead: 'Bespoke Italian Marble',
    description:
      'Bold rivers of honey and amber veining flow across a warm ivory body, accented with fine graphite hairlines. A Calacatta expression in a noticeably warmer register than Statuario.',
    specs: {
      finish: 'Polished or honed',
      thickness: '2 cm and 3 cm',
      applications: 'Kitchen islands, bathrooms, lobbies',
    },
  },
  'statuario-imperial': {
    origin: 'Carrara basin, Tuscany',
    subhead: 'Bespoke Italian Marble',
    description:
      'Bold grey veining with occasional fine graphite lines on a bright white ground. The architectural choice when veining should read as structure.',
    specs: {
      finish: 'Polished (classic) or honed',
      thickness: '2 cm and 3 cm',
      applications: 'Monolithic volumes, stair soffits, cladding',
    },
  },
  'arabescato-vagli': {
    origin: 'Vagli, Tuscany',
    subhead: 'Heritage Italian Marble',
    description:
      'Cloud-like arabesques in grey and soft graphite. Ideal for rooms that call for movement without high-contrast striation.',
    specs: {
      finish: 'Honed or polished',
      thickness: '2 cm and 3 cm',
      applications: 'Bath surrounds, flooring, furniture insets',
    },
  },
  'grigio-carnico': {
    origin: 'Carnia, Friuli',
    subhead: 'Italian Dark Marble',
    description:
      'A deep charcoal ground crossed by a dense web of pale crystalline veining. Dramatic yet disciplined; pairs cleanly with blackened steel and dark timber.',
    specs: {
      finish: 'Honed, brushed, or polished',
      thickness: '2 cm and 3 cm',
      applications: 'Feature walls, flooring, vanity tops',
    },
  },
  'bianco-lasa': {
    origin: 'Lasa, South Tyrol',
    subhead: 'Alpine White Marble',
    description:
      'Remarkably uniform white with minimal veining. When the brief calls for light without pattern competition.',
    specs: {
      finish: 'Polished or honed',
      thickness: '2 cm and 3 cm',
      applications: 'Sculptural stairs, monolithic sinks, cladding',
    },
  },
  'emperador-dark': {
    origin: 'Badarán, Spain',
    subhead: 'Spanish Brecciated Marble',
    description:
      'Chocolate ground with fine calcite veining. Warm, enveloping, and excellent under low evening light.',
    specs: {
      finish: 'Polished or honed',
      thickness: '2 cm and 3 cm',
      applications: 'Bars, powder rooms, residential lobbies',
    },
  },
  'volakas-white': {
    origin: 'Drama, Greece',
    subhead: 'Greek White Marble',
    description:
      'Feathery grey veining on a soft white field. A gentle alternative to high-contrast Italian whites.',
    specs: {
      finish: 'Honed or polished',
      thickness: '2 cm and 3 cm',
      applications: 'Kitchen runs, bathrooms, flooring',
    },
  },
  'sivec-premium': {
    origin: 'Sivec quarry, North Macedonia',
    subhead: 'Crystalline White Marble',
    description:
      'Dense crystalline structure with a faint cool cast. Reads as near-solid light in large panels.',
    specs: {
      finish: 'Polished or honed',
      thickness: '2 cm and 3 cm',
      applications: 'Feature walls, reception desks, cladding',
    },
  },
  'portoro-extra': {
    origin: 'Porto Venere, Liguria',
    subhead: 'Italian Black and Gold Marble',
    description:
      'Jet black ground with molten gold veining. A jewel stone for moments of maximum drama.',
    specs: {
      finish: 'High polish or honed',
      thickness: '2 cm (bookmatch recommended)',
      applications: 'Inlays, portals, accent walls',
    },
  },
  'giallo-imperiale': {
    origin: 'Brazil',
    subhead: 'Semi-Precious Quartzite',
    description:
      'Translucent amber and caramel body shot through with deep ochre and bronze veining. Best reserved for focal planes where backlighting can reveal its luminosity.',
    specs: {
      finish: 'Polished',
      thickness: '2 cm',
      applications: 'Backlit panels, inset tables, art walls',
    },
  },
  'thassos-snow': {
    origin: 'Thassos Island, Greece',
    subhead: 'Pure White Marble',
    description:
      'Among the brightest Greek whites. Minimal veining; exceptional for crisp junctions with glass and metal.',
    specs: {
      finish: 'Polished or honed',
      thickness: '2 cm and 3 cm',
      applications: 'Bathrooms, flooring, thresholds',
    },
  },
  'verde-alpi': {
    origin: 'Aosta Valley',
    subhead: 'Italian Serpentine Marble',
    description:
      'Deep forest green with white calcite veining. A sculptural color for contrast palettes.',
    specs: {
      finish: 'Honed or polished',
      thickness: '2 cm and 3 cm',
      applications: 'Vanities, bars, fireplace surrounds',
    },
  },
  'travertino-romano': {
    origin: 'Tivoli basin, Lazio',
    subhead: 'Classic Roman Travertine',
    description:
      'Open cell structure and warm ivory tone. Filled or unfilled depending on tactile intent.',
    specs: {
      finish: 'Honed, brushed, or filled and polished',
      thickness: '2 cm and 3 cm',
      applications: 'Flooring, facades, stair threads',
    },
  },
  'onice-fantastico': {
    origin: 'Iran',
    subhead: 'Translucent Blue Onyx',
    description:
      'Layered bands of sapphire, teal, and pearl-white run through a naturally translucent body. Demands thoughtful lighting design to reveal its glacial depth.',
    specs: {
      finish: 'Polished',
      thickness: '2 cm',
      applications: 'Backlit walls, bars, feature niches',
    },
  },
  'azul-macaubas': {
    origin: 'Macaúbas, Bahia',
    subhead: 'Brazilian Quartzite',
    description:
      'Linear blue-grey movement with quartz durability. A performance stone with couture presence.',
    specs: {
      finish: 'Leathered, honed, or polished',
      thickness: '2 cm and 3 cm',
      applications: 'Kitchen islands, flooring, wet areas',
    },
  },
  'rosso-lepanto': {
    origin: 'Levanto, Liguria',
    subhead: 'Italian Red Marble',
    description:
      'Wine-red ground traced by bold, rivering white veining. Romantic and assertive in equal measure.',
    specs: {
      finish: 'Polished or honed',
      thickness: '2 cm and 3 cm',
      applications: 'Powder rooms, insets, furniture tops',
    },
  },
  'calacatta-viola': {
    origin: 'Tuscany',
    subhead: 'Bespoke Italian Marble',
    description:
      'Bold violet and plum veining flows across a warm ivory body, accented with charcoal hairlines. A contemporary Calacatta expression with unmistakable character.',
    specs: {
      finish: 'Honed or polished',
      thickness: '2 cm and 3 cm',
      applications: 'Islands, bathrooms, architectural reveals',
    },
  },
  'macchia-vecchia': {
    origin: 'Breccia quarries, Apennines',
    subhead: 'Heritage Italian Marble',
    description:
      'Painterly patches of cream, umber, and grey. Each slab reads as a singular composition.',
    specs: {
      finish: 'Honed (recommended) or polished',
      thickness: '2 cm and 3 cm',
      applications: 'Statement walls, flooring, bespoke furniture',
    },
  },
}


