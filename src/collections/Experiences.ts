import type { CollectionConfig } from 'payload'
import { revalidatePaths } from '../lib/revalidate'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'role', 'startDate', 'endDate', 'isActive'],
    description: 'Manage professional experiences displayed in the Experience section.',
  },
  access: {
    read: () => true, // Publicly readable
  },
  hooks: {
    afterChange: [revalidatePaths(['/', '/experience'])],
  },
  fields: [
    {
      name: 'company',
      type: 'text',
      required: true,
      label: 'Company or Organization Name',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Your Title / Role',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'text',
          required: true,
          label: 'Start Date (e.g., "2020", "Jan 2020")',
          admin: { width: '50%' }
        },
        {
          name: 'endDate',
          type: 'text',
          required: true,
          label: 'End Date (e.g., "Present", "2021")',
          admin: { width: '50%' }
        },
      ]
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Current Position?',
      defaultValue: false,
    },
    {
      name: 'scope',
      type: 'textarea',
      label: 'Scope / Context (e.g., Led a team of X, Architecture for Y)',
    },
    {
      name: 'impactAndOutcomes',
      type: 'richText',
      label: 'Impact & Outcomes (Bullet points highly recommended)',
    },
    {
      name: 'skills',
      type: 'array',
      label: 'Skills & Tech Stack',
      fields: [
        {
          name: 'skill',
          type: 'text',
        }
      ]
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      label: 'Display Order (1 is first)',
      defaultValue: 1,
    }
  ],
}
