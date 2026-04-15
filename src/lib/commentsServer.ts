'use server'

import { revalidatePath } from 'next/cache';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';

async function getInsightId(slug: string) {
  const payload = await getPayload({ config: configPromise });
  const { docs } = await payload.find({
    collection: 'insights',
    where: { slug: { equals: slug } },
    depth: 0,
  });
  if (docs.length === 0) return null;
  return { id: docs[0].id, payload };
}

export async function getCommentsAction(slug: string) {
  try {
    const payloadInfo = await getInsightId(slug);
    if (!payloadInfo) return { error: 'Insight not found', comments: [] };
    const { id: insightId, payload } = payloadInfo;

    const { docs: comments } = await payload.find({
      collection: 'comments',
      where: { insight: { equals: insightId as any } },
      depth: 1, // Allows populated relationships
      limit: 100, // Reduced from 1000 for realistic loads
      sort: 'createdAt',
    });

    const commentsMap = new Map<number | string, any>();
    const rootComments: any[] = [];

    // Phase 1: Parse Data Properties
    comments.forEach((c: any) => {
      const node = {
        id: c.id,
        author: c.author || 'Anonymous Reader',
        text: c.text,
        date: new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        likes: c.likes || 0,
        replyToId: c.replyTo ? (typeof c.replyTo === 'object' ? c.replyTo.id : c.replyTo) : null,
        replies: []
      };
      commentsMap.set(c.id, node);
    });

    // Phase 2: Tree Assembly
    commentsMap.forEach((node) => {
      if (node.replyToId && commentsMap.has(node.replyToId)) {
        commentsMap.get(node.replyToId).replies.push(node);
      } else {
        rootComments.push(node);
      }
    });

    return { comments: rootComments };
  } catch (error) {
    console.error(error);
    return { error: 'Database failure', comments: [] };
  }
}

// Simple in-memory rate limiting map
// Store IP/identifier or just block huge spikes system-wide
const submissionTimestamps: number[] = [];
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_SUBMISSIONS_PER_WINDOW = 30; // Max 30 comments per minute system-wide

export async function submitCommentAction(slug: string, name: string, message: string, replyToId?: number | null) {
  try {
    // 1. Input Validation
    if (!message || message.trim().length === 0) return { success: false, error: 'Message is required' };
    if (message.length > 3000) return { success: false, error: 'Message exceeds maximum length of 3000 characters' };
    if (name && name.length > 100) return { success: false, error: 'Name exceeds maximum length' };

    // 2. High-Level Rate Limiting
    const now = Date.now();
    // Clean old timestamps
    while (submissionTimestamps.length > 0 && submissionTimestamps[0] < now - RATE_LIMIT_WINDOW_MS) {
      submissionTimestamps.shift();
    }
    
    if (submissionTimestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) {
      return { success: false, error: 'System is currently processing too many submissions. Please wait a moment.' };
    }
    submissionTimestamps.push(now);

    const payloadInfo = await getInsightId(slug);
    if (!payloadInfo) return { success: false, error: 'Insight not found' };
    const { id: insightId, payload } = payloadInfo;

    await payload.create({
      collection: 'comments',
      data: {
        insight: insightId,
        author: name.trim() || 'Anonymous Reader',
        text: message.trim(),
        likes: 0,
        replyTo: replyToId || null,
      } as any,
    });

    revalidatePath(`/insights/${slug}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to post comment to database' };
  }
}

export async function likeCommentAction(slug: string, commentId: number | string, isLiking: boolean) {
  try {
    const payloadInfo = await getInsightId(slug);
    if (!payloadInfo) return { success: false, error: 'Insight not found' };
    const { payload } = payloadInfo;

    const comment = await payload.findByID({
      collection: 'comments',
      id: commentId,
    });
    
    let currentLikes = (comment.likes as number) || 0;
    currentLikes = isLiking ? currentLikes + 1 : currentLikes - 1;
    if (currentLikes < 0) currentLikes = 0;

    await payload.update({
      collection: 'comments',
      id: commentId,
      data: {
        likes: currentLikes,
      },
    });

    revalidatePath(`/insights/${slug}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Database mutation failed' };
  }
}
