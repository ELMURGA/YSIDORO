// Fase 3: lista de material de un colegio/curso concreto.
// Las alternativas por línea NO se guardan aquí: se calculan en la app por
// coincidencia exacta de categoría con `suggestedProduct.category` (ver
// src/data/products.js -> getAlternativesFor).
export default {
  name: 'schoolList',
  title: 'Lista de material escolar',
  type: 'document',
  fields: [
    {
      name: 'town',
      title: 'Municipio',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'school',
      title: 'Colegio',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'course',
      title: 'Curso escolar',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'items',
      title: 'Líneas de material',
      type: 'array',
      of: [{ type: 'listItem' }],
      validation: (Rule) => Rule.min(1),
    },
  ],
  preview: {
    select: { school: 'school', course: 'course', town: 'town' },
    prepare({ school, course, town }) {
      return { title: `${school} — ${course}`, subtitle: town };
    },
  },
};
