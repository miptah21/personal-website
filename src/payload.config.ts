import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Insights } from './collections/Insights'
import { Comments } from './collections/Comments'
import { Media } from './collections/Media'
import { Tools } from './collections/Tools'
import { Experiences } from './collections/Experiences'
import { ContactSubmissions } from './collections/ContactSubmissions'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Insights, Comments, Media, Tools, Experiences, ContactSubmissions],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => 
      defaultFeatures.filter((feature) => feature.key !== 'horizontalRule')
  }),
  secret: process.env.PAYLOAD_SECRET ?? (() => { throw new Error('PAYLOAD_SECRET environment variable is required') })(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./payload.db',
    },
    push: true,
  }),
})
