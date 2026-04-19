import type { CollectionConfig } from 'payload'
import { revalidatePaths } from '../lib/revalidate'

export const Education: CollectionConfig = {
  slug: 'education',
  admin: {
    useAsTitle: 'university',
    defaultColumns: ['university', 'degree', 'concentration', 'graduationDate', 'order'],
    description: 'Manage education entries displayed on the homepage.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidatePaths(['/'])],
  },
  fields: [
    {
      name: 'university',
      type: 'text',
      required: true,
      label: 'University / Institution Name',
      admin: {
        description: 'e.g. "Gadjah Mada University"',
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'Location',
      admin: {
        description: 'e.g. "Sleman, D.I Yogyakarta"',
      },
    },
    {
      name: 'degree',
      type: 'text',
      required: true,
      label: 'Degree Title',
      admin: {
        description: 'e.g. "Bachelor of Applied Science in Management"',
      },
    },
    {
      name: 'concentration',
      type: 'text',
      label: 'Concentration / Major',
      admin: {
        description: 'e.g. "Computational Finance"',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'gpa',
          type: 'text',
          label: 'GPA',
          admin: {
            description: 'e.g. "3.56"',
            width: '25%',
          },
        },
        {
          name: 'gpaScale',
          type: 'text',
          label: 'GPA Scale',
          defaultValue: '4.00',
          admin: {
            description: 'e.g. "4.00"',
            width: '25%',
          },
        },
        {
          name: 'graduationDate',
          type: 'text',
          required: true,
          label: 'Graduation Date',
          admin: {
            description: 'e.g. "May 2026", "2024"',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'isExpected',
      type: 'checkbox',
      label: 'Expected (not yet graduated)?',
      defaultValue: true,
    },
    {
      name: 'thesisTitle',
      type: 'textarea',
      label: 'Thesis Title',
      admin: {
        description: 'Full title of your thesis or final project.',
      },
    },
    {
      name: 'thesisSummary',
      type: 'textarea',
      label: 'Thesis Summary (English)',
      admin: {
        description: 'Brief English summary of the thesis topic.',
      },
    },
    {
      name: 'courseworkGroups',
      type: 'array',
      label: 'Coursework Groups',
      admin: {
        description: 'Group relevant courses by category for better presentation.',
      },
      fields: [
        {
          name: 'groupLabel',
          type: 'text',
          required: true,
          label: 'Group Label',
          admin: {
            description: 'e.g. "Quantitative & Technical", "Finance & Business"',
          },
        },
        {
          name: 'courses',
          type: 'array',
          label: 'Courses',
          fields: [
            {
              name: 'course',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Google Material Symbol name',
      defaultValue: 'school',
      admin: {
        description: 'e.g. "school", "account_balance", "architecture"',
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
