import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

// Rellena estas variables en studio/.env (SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET)
// una vez creado el proyecto en sanity.io/manage. Mientras tanto quedan como
// placeholders para no romper el arranque del Studio.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'REPLACE_WITH_PROJECT_ID';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'isidoro-papeleria',
  title: 'Isidoro Papelería · Catálogo',

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
