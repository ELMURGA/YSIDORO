// Fase 1: ficha de producto del catálogo.
export default {
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
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
      name: 'ref',
      title: 'Referencia / SKU',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'price',
      title: 'Precio (IVA incluido)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    },
    {
      name: 'vatRate',
      title: 'Tipo de IVA (%)',
      type: 'number',
      initialValue: 21,
    },
    {
      name: 'priceWithoutVat',
      title: 'Precio base (sin IVA)',
      type: 'number',
      readOnly: true,
      description: 'Calculado automáticamente a partir del precio y el tipo de IVA al guardar.',
    },
    {
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.min(1),
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'brand',
      title: 'Marca',
      type: 'string',
    },
    {
      name: 'stock',
      title: 'Disponibilidad',
      type: 'string',
      options: {
        list: [
          { title: 'En stock', value: 'in-stock' },
          { title: 'Stock bajo', value: 'low-stock' },
          { title: 'Sin stock / bajo pedido', value: 'out-of-stock' },
        ],
        layout: 'radio',
      },
      initialValue: 'in-stock',
    },
    {
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          { title: 'Borrador', value: 'draft' },
          { title: 'Publicado', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    },
    {
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
  ],
  preview: {
    select: { title: 'title', media: 'images.0', subtitle: 'ref' },
  },
};
