// Fase 1: catálogo de categorías (árbol de 3 niveles vía auto-referencia `parent`).
export default {
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'parent',
      title: 'Categoría padre',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Déjalo vacío si es una categoría de nivel superior (ej. Papelería).',
    },
    {
      name: 'order',
      title: 'Orden dentro del menú',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'icon',
      title: 'Icono (clase Font Awesome, opcional)',
      type: 'string',
    },
  ],
  preview: {
    select: { title: 'title', parentTitle: 'parent.title' },
    prepare({ title, parentTitle }) {
      return { title, subtitle: parentTitle ? `↳ ${parentTitle}` : 'Categoría raíz' };
    },
  },
};
