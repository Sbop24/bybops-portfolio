import { defineType, defineField, defineArrayMember } from 'sanity'

export const featuredWorkSection = defineType({
  name: 'featuredWorkSection',
  title: 'Home Page',
  type: 'document',
  // Singleton — prevent creating or deleting additional documents
  // @ts-expect-error -- __experimental_actions removed from v3 types but still works at runtime
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroAltText',
      title: 'Hero Alt Text',
      type: 'string',
      initialValue: 'Hero background - car photography',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const heroImage = (context.document as { heroImage?: unknown } | undefined)?.heroImage

          if (heroImage && !value) {
            return 'Hero alt text is required when a hero image is set.'
          }

          return true
        }),
    }),
    defineField({
      name: 'heroLabel',
      title: 'Hero Label',
      type: 'string',
      initialValue: 'Photography by Sahib Boparai',
    }),
    defineField({
      name: 'heroHeadingLineOne',
      title: 'Hero Heading Line One',
      type: 'string',
      initialValue: 'Moments',
    }),
    defineField({
      name: 'heroHeadingLineTwo',
      title: 'Hero Heading Line Two',
      type: 'string',
      initialValue: 'Worth Keeping',
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
    defineField({
      name: 'bookingHeadingLineOne',
      title: 'Booking Heading Line One',
      type: 'string',
      initialValue: "Let's create something",
    }),
    defineField({
      name: 'bookingHeadingLineTwo',
      title: 'Booking Heading Line Two',
      type: 'string',
      initialValue: 'worth remembering',
    }),
    defineField({
      name: 'bookingButtonLabel',
      title: 'Booking Button Label',
      type: 'string',
      initialValue: 'Book a Session',
    }),
  ],
})
