'use server'

import { revalidatePath } from 'next/cache';

const GITHUB_OWNER = process.env.GITHUB_OWNER || '';
const GITHUB_REPO = process.env.GITHUB_REPO || '';
const GITHUB_PAT = process.env.GITHUB_PAT || '';

async function getHeaders() {
  return {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `Bearer ${GITHUB_PAT}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'Vanguard-Portfolio-App'
  };
}

async function getOrCreateIssue(slug: string) {
  if (!GITHUB_OWNER || !GITHUB_REPO || !GITHUB_PAT) return null;
  
  try {
    // 1. Search for existing issue
    const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues?labels=article-comments&state=open`, {
      headers: await getHeaders(),
    });
    
    if (!res.ok) return null;
    const issues = await res.json();
    const issue = issues.find((i: any) => i.title === slug);
    if (issue) return issue.number;

    // 2. Create new issue mapping
    const createRes = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify({
        title: slug,
        body: `Auto-generated database thread for article: ${slug}`,
        labels: ['article-comments']
      })
    });
    
    if (!createRes.ok) return null;
    const newIssue = await createRes.json();
    return newIssue.number;
  } catch(e) {
    return null;
  }
}

export async function getCommentsAction(slug: string) {
  if (!GITHUB_OWNER || !GITHUB_REPO || !GITHUB_PAT) return { error: 'Missing GitHub Configuration', comments: [] };
  
  const issueNumber = await getOrCreateIssue(slug);
  if (!issueNumber) return { error: 'Failed to resolve issue database', comments: [] };

  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${issueNumber}/comments`, {
      headers: await getHeaders(),
      cache: 'no-store'
    });
    
    if (!res.ok) return { error: 'Failed to fetch comments', comments: [] };
    const rawComments = await res.json();
    
    const comments = rawComments.map((c: any) => {
      let rawBody = c.body || '';
      let commenterName = 'Anonymous Reader';
      let text = rawBody;
      
      if (rawBody.startsWith('Author: ')) {
        const parts = rawBody.split('\n---\n');
        if (parts.length > 1) {
          commenterName = parts[0].replace('Author: ', '').trim();
          text = parts.slice(1).join('\n---\n').trim();
        }
      }
      
      return {
        id: c.id,
        author: commenterName,
        text: text,
        date: new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
    });

    return { comments };
  } catch(e) {
    return { error: 'Network failiure', comments: [] };
  }
}

export async function submitCommentAction(slug: string, name: string, message: string) {
  if (!GITHUB_OWNER || !GITHUB_REPO || !GITHUB_PAT) return { success: false, error: 'Missing GitHub configuration' };
  
  const issueNumber = await getOrCreateIssue(slug);
  if (!issueNumber) return { success: false, error: 'Failed to locate article database' };

  const finalName = name.trim() || 'Anonymous Reader';
  const bodyPayload = `Author: ${finalName}\n---\n${message.trim()}`;

  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${issueNumber}/comments`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify({ body: bodyPayload })
    });

    if (!res.ok) {
       return { success: false, error: 'Failed to post comment to server' };
    }
    
    revalidatePath(`/insights/${slug}`);
    return { success: true };
  } catch (e) {
    return { success: false, error: 'Network failure' };
  }
}
