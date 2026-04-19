import { CollectionConfig } from 'payload';
import { revalidatePaths } from '../lib/revalidate';

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'featured'],
    description: 'Manage the high-impact projects displayed in The Laboratory section.',
  },
  hooks: {
    afterChange: [
      revalidatePaths(['/', '/projects'])
    ]
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description (Problem → Impact format)',
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      label: 'Category (e.g., Machine Learning, Distributed Systems)',
    },
    {
      name: 'year',
      type: 'text',
      required: true,
      label: 'Year (e.g., 2025)',
    },
    {
      name: 'coverGradient',
      type: 'text',
      required: true,
      label: 'Cover CSS Gradient',
      defaultValue: 'linear-gradient(135deg, #0a1628 0%, #1a3a2a 40%, #2d5016 100%)',
      admin: {
        description: 'Provide an absolute CSS gradient. e.g., linear-gradient(135deg, #0a1628 0%, #1a3a2a 100%)',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Technology Stack Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'liveUrl',
      type: 'text',
      label: 'Live Demo URL (optional)',
      admin: {
        description: 'Leave blank to hide the Live Demo button.',
      },
    },
    {
      name: 'githubUrl',
      type: 'text',
      label: 'GitHub / Source URL (optional)',
      admin: {
        description: 'Leave blank to hide the Source Code button.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured on Homepage',
      admin: {
        description: 'If checked, this project will appear in the 3-card homepage showcase.',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Projects will be sorted ascending (0 comes first).',
        position: 'sidebar',
      },
    },
  ],
};
