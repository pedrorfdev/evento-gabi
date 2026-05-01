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
    mapsEmbed: '',
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

export const gifts: Gift[] = []
export const photos: GalleryPhoto[] = []
