import { defineType, defineField, defineArrayMember } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  // @ts-expect-error -- singleton pattern
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Eye for the quiet moment',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'profileImageAlt',
      title: 'Profile Image Alt Text',
      type: 'string',
      initialValue: 'Sahib Boparai - photographer',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
