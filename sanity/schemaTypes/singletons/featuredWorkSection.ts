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
    defineField({
      name: 'parallaxStrips',
      title: 'Parallax Strips',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'altText',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'variant',
              title: 'Variant',
              type: 'string',
              options: {
                list: [
                  { title: 'Slide Right', value: 'slide-right' },
                  { title: 'Slide Left', value: 'slide-left' },
                  { title: 'Vertical', value: 'vertical' },
                ],
              },
              initialValue: 'slide-right',
            }),
            defineField({
              name: 'heightClass',
              title: 'Height Class',
              type: 'string',
              initialValue: 'h-[40vh] md:h-[50vh]',
            }),
          ],
        }),
      ],
    }),
  ],
})
