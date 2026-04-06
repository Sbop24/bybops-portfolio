import type { SchemaTypeDefinition } from 'sanity'

// Documents
import { photo } from './documents/photo'
import { shopItem } from './documents/shopItem'

// Singletons
import { featuredWorkSection } from './singletons/featuredWorkSection'
import { about } from './singletons/about'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  photo,
  shopItem,
  // Singletons
  featuredWorkSection,
  about,
]
