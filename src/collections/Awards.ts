import type { CollectionConfig } from 'payload'
import { revalidatePaths } from '../lib/revalidate'

export const Awards: CollectionConfig = {
  slug: 'awards',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'issuer', 'year', 'order'],
    description: 'Manage awards and certifications displayed on the homepage.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidatePaths(['/'])],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Award Title',
      admin: {
        description: 'e.g. "Best Capstone Project", "1st Winner Mini Hackathon"',
      },
    },
    {
      name: 'issuer',
      type: 'text',
      required: true,
      label: 'Issuing Organization',
      admin: {
        description: 'e.g. "PukulEnam", "KOMATIK UGM"',
      },
    },
    {
      name: 'year',
      type: 'text',
      required: true,
      label: 'Year',
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'award',
      required: true,
      options: [
        { label: 'Award', value: 'award' },
        { label: 'Certification', value: 'certification' },
        { label: 'Honor', value: 'honor' },
      ],
      admin: {
        description: 'Determines the label shown on the frontend.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Short Description (optional)',
      admin: {
        description: 'Brief context about the award or certification.',
      },
    },
    {
      name: 'certificate',
      type: 'upload',
      relationTo: 'media',
      label: 'Certificate Image',
      admin: {
        description: 'Upload the certificate or award image for recruiters to view.',
      },
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Google Material Symbol name',
      defaultValue: 'emoji_events',
      admin: {
        description: 'e.g. "emoji_events", "workspace_premium", "military_tech", "verified"',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      label: 'Display Order (1 is first)',
      defaultValue: 1,
    },
  ],
}
