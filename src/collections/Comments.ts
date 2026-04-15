import type { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    useAsTitle: 'author',
  },
  access: {
    read: () => true,
    create: () => true, // Allowed for public submission via Server Actions
    update: ({ req }) => !!req.user, // Only authenticated admin can update (likes go through Server Actions with Payload Local API)
    delete: ({ req }) => !!req.user, // Only authenticated admin can delete
  },
  fields: [
    {
      name: 'insight',
      type: 'relationship',
      relationTo: 'insights',
      required: true,
      hasMany: false,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      defaultValue: 'Anonymous Reader',
    },
    {
      name: 'text',
      type: 'textarea',
      required: true,
    },
    {
      name: 'likes',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'replyTo',
      type: 'relationship',
      relationTo: 'comments',
      hasMany: false,
      admin: {
        position: 'sidebar',
      }
    }
  ],
}
