import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'bybops-portfolio',
  title: 'Bybops Portfolio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('About').child(S.document().schemaType('about').documentId('about')),
            S.listItem().title('Featured Work').child(S.document().schemaType('featuredWorkSection').documentId('featuredWorkSection')),
            S.listItem().title('Gallery').child(S.document().schemaType('masonryGallery').documentId('masonryGallery')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !['about', 'featuredWorkSection', 'masonryGallery'].includes(item.getId() ?? '')
            ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
})
