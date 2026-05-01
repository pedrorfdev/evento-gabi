import heroImage from '../assets/hero.png'

export const event = {
  name: 'Gabriela Peiche',
  title: 'Gabriela',
  subtitle: 'está completando 15 anos',
  hashtag: '#Gabi15',

  meta: {
    title: '15 anos de Gabriela Peiche',
    description: 'Uma noite especial para celebrar os 15 anos de Gabriela. Venha comemorar este momento único.',
    ogImage: '/og-image.jpg',
  },

  date: {
    iso: '2027-02-15T20:00:00',
    display: '15 de fevereiro de 2027',
    time: '20h00',
    timezone: 'America/Sao_Paulo',
  },

  venue: {
    name: 'Clube Comercial',
    address: '',
    mapsUrl: 'https://maps.google.com/?q=Clube+Comercial',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x9503cb5d8ea1b0ab%3A0x6b49c716f9a008c2!2sClube%20Comercial!5e0!3m2!1spt-BR!2sbr!4v1714578120000!5m2!1spt-BR!2sbr',
  },

  dressCode: {
    title: 'Social fino',
    description: 'Vista-se elegantemente para celebrar essa noite especial.',
    note: 'Evite branco.',
  },

  rsvp: {
    deadline: '15 de janeiro de 2027',
    formUrl: '',
    phone: '',
  },

  social: {
    instagram: '',
    whatsapp: '',
  },

  details: {
    image: heroImage,
    eyebrow: 'os detalhes da noite',
    title: 'Tudo pensado para celebrar a Gabi',
    cards: [
      {
        key: 'date',
        label: 'Data',
        title: '15 de fevereiro',
        description: 'Segunda-feira, as 20h00',
      },
      {
        key: 'venue',
        label: 'Local',
        title: 'Clube Comercial',
        description: 'Recepcao especial para familia e amigos',
      },
      {
        key: 'dress',
        label: 'Dress code',
        title: 'Social fino',
        description: 'Elegancia para uma noite inesquecivel',
      },
      {
        key: 'rsvp',
        label: 'Confirmacao',
        title: 'RSVP',
        description: 'Confirme sua presenca ate 15 de janeiro',
      },
    ],
  },

  giftsSection: {
    eyebrow: 'lista de presentes',
    title: 'Carinho em forma de presente',
    buttonLabel: 'Ver presente',
    emptyText: 'A lista de presentes sera atualizada em breve.',
  },

  gallerySection: {
    eyebrow: 'galeria',
    title: 'Momentos da Gabriela',
    emptyText: 'As fotos da galeria serao adicionadas em breve.',
  },

  rsvpSection: {
    eyebrow: 'confirme sua presenca',
    title: 'Vai ser lindo ter voce nessa noite',
    description: 'Responda ao formulario para confirmar presenca. Para qualquer duvida, chame pelo WhatsApp.',
    primaryLabel: 'Confirmar presenca',
    secondaryLabel: 'Tirar duvida',
    formUnavailable: 'Formulario em breve',
    whatsappMessage: 'Oi! Tenho uma duvida sobre os 15 anos da Gabriela.',
  },
}

export type Gift = {
  name: string
  price?: string
  image: string
  url: string
}

export type GalleryPhoto = {
  src: string
  width: number
  height: number
  alt?: string
}

export const gifts: Gift[] = [
  {
    name: 'Cota de Viagem',
    price: 'R$ 100,00',
    image: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=800&q=80',
    url: '#',
  },
  {
    name: 'Dia de Spa',
    price: 'R$ 350,00',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    url: '#',
  },
  {
    name: 'Kit Perfumaria',
    price: 'R$ 250,00',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    url: '#',
  },
  {
    name: 'Fone Bluetooth',
    price: 'R$ 400,00',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    url: '#',
  },
  {
    name: 'Bolsa de Couro',
    price: 'R$ 320,00',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    url: '#',
  },
  {
    name: 'Sessão de Fotos',
    price: 'R$ 500,00',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    url: '#',
  },
  {
    name: 'Relógio',
    price: 'R$ 280,00',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
    url: '#',
  },
  {
    name: 'Kit Skincare',
    price: 'R$ 180,00',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80',
    url: '#',
  },
  {
    name: 'Vale Presente',
    price: 'R$ 200,00',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238f37e?auto=format&fit=crop&w=800&q=80',
    url: '#',
  },
]

export const photos: GalleryPhoto[] = [
  // Festa / decoração / celebração
  { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80', width: 800, height: 1200, alt: 'Balões de festa' },
  { src: 'https://images.unsplash.com/photo-1496843916299-590492c751f4?auto=format&fit=crop&w=1200&q=80', width: 1200, height: 800, alt: 'Luzes de festa' },
  { src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80', width: 800, height: 1000, alt: 'Confete' },
  { src: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1000&q=80', width: 1000, height: 800, alt: 'Pista de dança' },
  { src: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80', width: 800, height: 800, alt: 'Decoração mesa' },
  { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80', width: 800, height: 1200, alt: 'Celebração' },
  { src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80', width: 1200, height: 800, alt: 'DJ e luzes' },
  { src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80', width: 800, height: 1000, alt: 'Show de luzes' },
]
