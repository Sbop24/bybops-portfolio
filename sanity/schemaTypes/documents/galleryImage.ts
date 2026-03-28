import { defineType, defineField, defineArrayMember } from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'portfolioImage',
      validation: (Rule) => Rule.required().error('Photo is required'),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'isVisible',
      title: 'Visible',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
