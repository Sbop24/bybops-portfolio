import { defineType, defineField, defineArrayMember } from 'sanity'

export const gearCategoryGroup = defineType({
  name: 'gearCategoryGroup',
  title: 'Gear Category Group',
  type: 'object',
  fields: [
    defineField({
      name: 'categoryTitle',
      title: 'Category Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Category title is required'),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [defineArrayMember({ type: 'gearItem' })],
    }),
  ],
})
