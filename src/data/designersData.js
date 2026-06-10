export const designersData = [
  {
    id: 'aria-chen',
    name: 'Aria Chen',
    role: 'Principal Designer & Partner',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    city: 'Bangalore',
    style: 'Japandi Minimalism',
    styleId: 'japandi',
    rating: 4.9,
    reviewsCount: 38,
    experience: '8+ Years',
    startingRate: 15000,
    bio: 'Aria blends Japanese functionality with Scandinavian cozy elements to create restful, modern residential spaces.',
    portfolio: [
      { title: 'The Zen Lounge', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80' },
      { title: 'Oak & Clay Kitchen', image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&q=80' },
      { title: 'Japandi Bedroom Retreat', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80' }
    ],
    packages: [
      { id: 'essential', name: 'Essential Plan', price: 15000, hours: 4, designers: 1, desc: 'Concept layout, 4-hour design consult, material curation, color boards.' },
      { id: 'premium', name: 'Premium Plan', price: 28000, hours: 8, designers: 1, popular: true, desc: 'Essential + photorealistic 3D room renders, lighting schema, purchase spec links.' },
      { id: 'luxury', name: 'Luxury Plan', price: 45000, hours: 12, designers: 2, desc: 'Premium + Italian stone selection, modular kitchen layouts, director supervision.' }
    ]
  },
  {
    id: 'julian-mercer',
    name: 'Julian Mercer',
    role: 'Principal Architect',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    city: 'Mumbai',
    style: 'Modern Luxury',
    styleId: 'modern',
    rating: 5.0,
    reviewsCount: 52,
    experience: '12+ Years',
    startingRate: 25000,
    bio: 'Julian is renowned for creating striking, upscale environments using fine metals, Italian marbles, and integrated smart lighting.',
    portfolio: [
      { title: 'The Marble Penthouse', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80' },
      { title: 'Sleek Executive Office', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
      { title: 'Golden Accents Kitchen', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' }
    ],
    packages: [
      { id: 'essential', name: 'Essential Plan', price: 25000, hours: 6, designers: 1, desc: 'Bespoke layouts, 6-hour space review, material selections, and fixtures consulting.' },
      { id: 'premium', name: 'Premium Plan', price: 45000, hours: 12, designers: 2, popular: true, desc: 'Essential + high-end photorealistic renders, custom cabinetry specs, electrical cads.' },
      { id: 'luxury', name: 'Luxury Plan', price: 75000, hours: 18, designers: 2, desc: 'Premium + direct site construction layouts, automated smart-lighting layouts, director supervision.' }
    ]
  },
  {
    id: 'sophia-vance',
    name: 'Sophia Vance',
    role: 'Senior Curation Specialist',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    city: 'Delhi',
    style: 'Classic Parisian',
    styleId: 'parisian',
    rating: 4.8,
    reviewsCount: 29,
    experience: '6 Years',
    startingRate: 14000,
    bio: 'Sophia blends historical elegance with modern styling, focusing on ornate wall moldings, vintage mirrors, and bold colors.',
    portfolio: [
      { title: 'The Parisian Salon', image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80' },
      { title: 'Ornate Master Suite', image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80' },
      { title: 'Vintage Velvet Dining', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80' }
    ],
    packages: [
      { id: 'essential', name: 'Essential Plan', price: 14000, hours: 4, designers: 1, desc: 'Parisian concept boards, 4-hour molding layouts, colors curation, and vintage reviews.' },
      { id: 'premium', name: 'Premium Plan', price: 26000, hours: 8, designers: 1, popular: true, desc: 'Essential + room molding 3D visuals, ceiling cornice guides, custom drapery specs.' },
      { id: 'luxury', name: 'Luxury Plan', price: 42000, hours: 12, designers: 2, desc: 'Premium + vintage market shopping, customized plaster panel setup, on-site director supervision.' }
    ]
  },
  {
    id: 'marcus-sterling',
    name: 'Marcus Sterling',
    role: 'Senior Architectural Stylist',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    city: 'Bangalore',
    style: 'Mid-Century Organic',
    styleId: 'midcentury',
    rating: 4.7,
    reviewsCount: 41,
    experience: '9+ Years',
    startingRate: 16000,
    bio: 'Marcus focuses on mid-century aesthetics, bringing warm walnut woods, clean biophilic integration, and retro styling to spaces.',
    portfolio: [
      { title: 'The Teak Residence', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80' },
      { title: 'Retro Work Studio', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80' },
      { title: 'Biophilic Lounge', image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80' }
    ],
    packages: [
      { id: 'essential', name: 'Essential Plan', price: 16000, hours: 4, designers: 1, desc: 'Teak wood placement guides, 4-hour biophilic layout plan, indoor botanical selections.' },
      { id: 'premium', name: 'Premium Plan', price: 29000, hours: 8, designers: 1, popular: true, desc: 'Essential + walnut carpentry 3D visualizers, custom cabinet layouts, plant specifications.' },
      { id: 'luxury', name: 'Luxury Plan', price: 48000, hours: 12, designers: 2, desc: 'Premium + carpentry workshop coordination, active nursery selection sourcing, site setups.' }
    ]
  }
];
