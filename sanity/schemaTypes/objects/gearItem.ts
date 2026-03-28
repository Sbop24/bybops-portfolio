import { defineType, defineField } from 'sanity'

export const gearItem = defineType({
  name: 'gearItem',
  title: 'Gear Item',
  type: 'object',
  fields: [
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      validation: (Rule) => Rule.required().error('Brand is required'),
    }),
    defineField({
      name: 'model',
      title: 'Model',
      type: 'string',
      validation: (Rule) => Rule.required().error('Model is required'),
    }),
    defineField({
      name: 'itemType',
      title: 'Item Type',
      type: 'string',
    }),
  ],
})
