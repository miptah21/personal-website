import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export type InsightDoc = {
  id: number
  title: string
  slug: string
  category?: string | null
  coverImage?: {
    url?: string | null
    alt?: string | null
  } | number | null
  publishedAt?: string | null
  createdAt: string
  updatedAt: string
  content?: unknown
}

export type ToolDoc = {
  id: string
  title: string
  description: string
  icon: string
  style: 'default' | 'dark' | 'variant'
  columnSpan: '1' | '2'
}

export type CommentNode = {
  id: number | string
  author: string
  text: string
  date: string
  likes: number
  replyToId: number | string | null
  replies: CommentNode[]
}

export type ExperienceDoc = {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  isActive?: boolean | null
  description?: string | null
  order: number
}

/** Shared Payload instance getter */
export async function getPayloadClient() {
  return getPayload({ config: configPromise })
}

/** Fetch latest insights with optional limit */
export async function getInsights(limit = 50) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'insights',
    sort: '-publishedAt',
    limit,
  })
  return docs as unknown as InsightDoc[]
}

/** Fetch a single insight by slug */
export async function getInsightBySlug(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'insights',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  if (docs.length === 0) return null
  return docs[0] as unknown as InsightDoc
}

/** Fetch all tools */
export async function getTools(limit = 50) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'tools',
    limit,
  })
  return docs as unknown as ToolDoc[]
}

/** Fetch all insight slugs (for generateStaticParams) */
export async function getAllInsightSlugs() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'insights',
    limit: 1000,
    depth: 0,
  })
  return docs.map((doc) => ({ slug: doc.slug as string }))
}

/** Fetch all experiences */
export async function getExperiences(limit = 20) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'experiences',
    sort: 'order',
    limit,
  })
  return docs as unknown as ExperienceDoc[]
}
