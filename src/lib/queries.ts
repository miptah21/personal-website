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
  scope?: string | null
  impactAndOutcomes?: unknown
  skills?: { skill: string; id?: string }[] | null
  order: number
}

// Map the generated Project schema over to our application type
export type ProjectDoc = {
  id: string
  title: string
  description: string
  category: string
  year: string
  coverGradient: string
  tags: { tag: string; id?: string }[]
  liveUrl?: string | null
  githubUrl?: string | null
  featured?: boolean | null
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

/** Fetch all featured projects for the homepage */
export async function getFeaturedProjects(limit = 3) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    where: { featured: { equals: true } },
    sort: 'order',
    limit,
  })
  return docs as unknown as ProjectDoc[]
}

/** Fetch all projects for the library page */
export async function getAllProjects(limit = 50) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    sort: 'order',
    limit,
  })
  return docs as unknown as ProjectDoc[]
}

export type AwardDoc = {
  id: string
  title: string
  issuer: string
  year: string
  category: 'award' | 'certification' | 'honor'
  description?: string | null
  certificate?: {
    url?: string | null
    alt?: string | null
  } | number | null
  icon?: string | null
  order: number
}

/** Fetch all awards & certifications */
export async function getAwards(limit = 20) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'awards',
    sort: 'order',
    limit,
  })
  return docs as unknown as AwardDoc[]
}

export type EducationDoc = {
  id: string
  university: string
  location: string
  degree: string
  concentration?: string | null
  gpa?: string | null
  gpaScale?: string | null
  graduationDate: string
  isExpected?: boolean | null
  thesisTitle?: string | null
  thesisSummary?: string | null
  courseworkGroups?: {
    groupLabel: string
    courses?: { course: string; id?: string }[] | null
    id?: string
  }[] | null
  icon?: string | null
  order: number
}

/** Fetch all education entries */
export async function getEducation(limit = 10) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'education',
    sort: 'order',
    limit,
  })
  return docs as unknown as EducationDoc[]
}
