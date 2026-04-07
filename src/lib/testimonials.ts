export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
}

export const HOMEPAGE_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'ByBops captured our wedding day in a way we never expected — every frame felt like a movie still.',
    author: 'Priya & James',
    role: 'Wedding clients',
  },
  {
    id: '2',
    quote: 'The car shoot was insane. I\'ve never seen my vehicle look that cinematic.',
    author: 'Marcus T.',
    role: 'Automotive client',
  },
  {
    id: '3',
    quote: 'Sahib has a genuine eye for storytelling. The nature gallery from our shoot is breathtaking.',
    author: 'Leila O.',
    role: 'Nature & portrait client',
  },
]
