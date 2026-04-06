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
            S.listItem().title('Home Page').child(S.document().schemaType('featuredWorkSection').documentId('featuredWorkSection')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !['about', 'featuredWorkSection'].includes(item.getId() ?? '')
            ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
})
