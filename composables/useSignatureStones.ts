export type GalleryStone = {
  name: string
  src: string
  aspect: string
}

const SIGNATURE_STONES: GalleryStone[] = [
  {
    name: 'Carrara Fantastico',
    src: '/img/CarraraFantastico.jpg',
    aspect: 'aspect-[3/4]',
  },
  {
    name: 'Nero Antico',
    src: '/img/NeroAntico.jpg',
    aspect: 'aspect-[5/4]',
  },
  {
    name: 'Calacatta Oro',
    src: '/img/CalacattaOro.jpg',
    aspect: 'aspect-[4/5]',
  },
  {
    name: 'Statuario Imperial',
    src: '/img/StatuarioImperial.jpg',
    aspect: 'aspect-square',
  },
  {
    name: 'Arabescato Vagli',
    src: '/img/ArabescatoVagli.jpg',
    aspect: 'aspect-[2/3]',
  },
  {
    name: 'Pietra Grey',
    src: '/img/PietraGrey.webp',
    aspect: 'aspect-[5/6]',
  },
  {
    name: 'Bianco Lasa',
    src: '/img/BiancoLasa.jpg',
    aspect: 'aspect-[4/3]',
  },
  {
    name: 'Emperador Dark',
    src: '/img/EmperadorDark.jpg',
    aspect: 'aspect-[3/5]',
  },
  {
    name: 'Volakas White',
    src: '/img/VolakasWhite.jpg',
    aspect: 'aspect-[5/4]',
  },
  {
    name: 'Sivec Premium',
    src: '/img/SivecPremium.jpg',
    aspect: 'aspect-[3/4]',
  },
  {
    name: 'Portoro Extra',
    src: '/img/PortoroExtra.jpg',
    aspect: 'aspect-[4/5]',
  },
  {
    name: 'Amazonite Gold',
    src: '/img/AmazoniteGold.webp',
    aspect: 'aspect-[5/3]',
  },
  {
    name: 'Thassos Snow',
    src: '/img/ThassosSnow.webp',
    aspect: 'aspect-square',
  },
  {
    name: 'Verde Alpi',
    src: '/img/VerdeAlpi.jpeg',
    aspect: 'aspect-[3/4]',
  },
  {
    name: 'Travertino Romano',
    src: '/img/TravertinoRomano.jpeg',
    aspect: 'aspect-[4/3]',
  },
  {
    name: 'Onice Fantastico',
    src: '/img/OniceFantastico.jpg',
    aspect: 'aspect-[2/3]',
  },
  {
    name: 'Azul Macaubas',
    src: '/img/AzulMacaubas.jpg',
    aspect: 'aspect-[5/4]',
  },
  {
    name: 'Rosso Lepanto',
    src: '/img/RossoLepanto.jpg',
    aspect: 'aspect-[3/5]',
  },
  {
    name: 'Calacatta Viola',
    src: '/img/CalacattaViola.jpg',
    aspect: 'aspect-[4/5]',
  },
  {
    name: 'Macchia Vecchia',
    src: '/img/MacchiaVecchia.jpg',
    aspect: 'aspect-[5/6]',
  },
]

export function useSignatureStones(): readonly GalleryStone[] {
  return SIGNATURE_STONES
}
