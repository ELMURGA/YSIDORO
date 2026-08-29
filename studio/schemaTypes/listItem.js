// Fase 3: línea de una lista de material escolar. Objeto embebido dentro de `schoolList`.
export default {
  name: 'listItem',
  title: 'Línea de material',
  type: 'object',
  fields: [
    {
      name: 'need',
      title: 'Necesidad genérica',
      type: 'string',
      description: 'Ej. "Goma de borrar". Se muestra como etiqueta de la línea.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'suggestedProduct',
      title: 'Producto sugerido',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'Producto que aparece marcado con ★ y preseleccionado por defecto.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'quantity',
      title: 'Cantidad',
      type: 'number',
      initialValue: 1,
    },
  ],
  preview: {
    select: { title: 'need', subtitle: 'suggestedProduct.title' },
  },
};
