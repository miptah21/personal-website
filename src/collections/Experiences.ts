import type { CollectionConfig } from 'payload'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'role', 'startDate', 'endDate'],
  },
  access: {
    read: () => true, // Publicly readable
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
      name: 'description',
      type: 'textarea',
      label: 'Brief Description (Optional)',
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
