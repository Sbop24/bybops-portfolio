import { defineType, defineField, defineArrayMember } from 'sanity'

export const masonryGallery = defineType({
  name: 'masonryGallery',
  title: 'Masonry Gallery',
  type: 'document',
  // Singleton — prevent creating or deleting additional documents
  // @ts-expect-error -- __experimental_actions removed from v3 types but still works at runtime
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'galleryImage' }],
        }),
      ],
    }),
  ],
})
