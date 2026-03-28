import { defineType, defineField, defineArrayMember } from 'sanity'

export const featuredWorkSection = defineType({
  name: 'featuredWorkSection',
  title: 'Featured Work Section',
  type: 'document',
  // Singleton — prevent creating or deleting additional documents
  // @ts-expect-error -- __experimental_actions removed from v3 types but still works at runtime
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'workProject' }],
        }),
      ],
    }),
  ],
})
