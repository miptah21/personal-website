import { CollectionConfig } from 'payload';

export const Tools: CollectionConfig = {
  slug: 'tools',
  admin: {
    useAsTitle: 'title',
    description: 'Manage the cards shown in The Technical Toolkit section on the homepage.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tool / Skill Name',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Short Description',
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
      label: 'Google Material Symbol name',
      admin: {
        description: 'e.g. "terminal", "monitoring", "database", "scatter_plot"',
      },
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'default',
      required: true,
      options: [
        { label: 'Default Light', value: 'default' },
        { label: 'Dark Mode (Primary Color)', value: 'dark' },
        { label: 'Variant Beige', value: 'variant' },
      ],
      admin: {
        description: 'Determines the visual background card style on the frontend.',
      },
    },
    {
      name: 'columnSpan',
      type: 'select',
      defaultValue: '1',
      required: true,
      options: [
        { label: 'Normal (1 Column)', value: '1' },
        { label: 'Wide (2 Columns)', value: '2' },
      ],
      admin: {
        description: 'Determines how wide the card is in the grid (e.g. use Wide for primary skills).',
      },
    },
  ],
};
