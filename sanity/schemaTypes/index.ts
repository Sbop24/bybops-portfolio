import type { SchemaTypeDefinition } from 'sanity'

// Objects
import { portfolioImage } from './objects/portfolioImage'
import { gearItem } from './objects/gearItem'
import { gearCategoryGroup } from './objects/gearCategoryGroup'

// Documents
import { photo } from './documents/photo'
import { shopItem } from './documents/shopItem'

// Singletons
import { featuredWorkSection } from './singletons/featuredWorkSection'
import { about } from './singletons/about'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  portfolioImage,
  gearItem,
  gearCategoryGroup,
  // Documents
  photo,
  shopItem,
  // Singletons
  featuredWorkSection,
  about,
]
