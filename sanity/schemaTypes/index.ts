import type { SchemaTypeDefinition } from 'sanity'

// Objects
import { portfolioImage } from './objects/portfolioImage'
import { gearItem } from './objects/gearItem'
import { gearCategoryGroup } from './objects/gearCategoryGroup'

// Documents
import { workProject } from './documents/workProject'
import { galleryImage } from './documents/galleryImage'

// Singletons
import { featuredWorkSection } from './singletons/featuredWorkSection'
import { masonryGallery } from './singletons/masonryGallery'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  portfolioImage,
  gearItem,
  gearCategoryGroup,
  // Documents
  workProject,
  galleryImage,
  // Singletons
  featuredWorkSection,
  masonryGallery,
]
