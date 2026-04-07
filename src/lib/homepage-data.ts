export const CATEGORY_ORDER = ['Cars', 'Nature', 'Couples', 'Event'] as const

export type CategoryKey = typeof CATEGORY_ORDER[number]

export const CATEGORY_COPY: Record<CategoryKey, { label: string; tagline: string }> = {
  Cars: { label: 'Cars', tagline: 'Speed captured in stillness.' },
  Nature: { label: 'Nature', tagline: 'The earth in its unscripted moments.' },
  Couples: { label: 'Couples', tagline: 'Two stories told in one frame.' },
  Event: { label: 'Event', tagline: 'Energy that outlasts the night.' },
}

export const HERO_COPY = {
  headline: 'More Than a Still Frame',
  subheadline: 'A cinematic photography experience designed to move with you.',
  cta: 'Explore the Motion',
} as const

export const BOOKING_COPY = {
  heading: 'Bring the Vision Into Frame',
  button: 'Book a Session',
  href: '/booking',
} as const

export const SCROLL_STAGES = {
  monitor: '200%',
  zoom: '100%',
  categoryEach: '150%',
  testimonialEach: '100%',
} as const
