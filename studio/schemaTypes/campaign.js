// Fase 1: campaña/banner promocional. Placeholder ampliable (sin lógica de descuento todavía).
export default {
  name: 'campaign',
  title: 'Campaña',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'link',
      title: 'Enlace destino',
      type: 'string',
      description: 'Ruta interna (ej. /catalogo?categoria=papeleria) o URL externa.',
    },
    {
      name: 'dateStart',
      title: 'Fecha de inicio',
      type: 'datetime',
    },
    {
      name: 'dateEnd',
      title: 'Fecha de fin',
      type: 'datetime',
    },
    {
      name: 'active',
      title: 'Activa',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: { title: 'title', media: 'image', active: 'active' },
    prepare({ title, media, active }) {
      return { title, subtitle: active ? 'Activa' : 'Inactiva', media };
    },
  },
};
