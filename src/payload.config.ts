import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users.ts'
import { Insights } from './collections/Insights.ts'
import { Comments } from './collections/Comments.ts'
import { Media } from './collections/Media.ts'
import { Tools } from './collections/Tools.ts'
import { Experiences } from './collections/Experiences.ts'
import { ContactSubmissions } from './collections/ContactSubmissions.ts'
import { Projects } from './collections/Projects.ts'
import { Awards } from './collections/Awards.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Insights, Comments, Media, Tools, Experiences, ContactSubmissions, Projects, Awards],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => 
      defaultFeatures.filter((feature) => feature.key !== 'horizontalRule')
  }),
  secret: process.env.PAYLOAD_SECRET ?? (() => { throw new Error('PAYLOAD_SECRET environment variable is required') })(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: true,
  }),
})
