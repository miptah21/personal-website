'use client';
import { useState, useEffect, useRef } from 'react';
import type { CommentNode } from '@/lib/queries';
import { getCommentsAction, submitCommentAction, likeCommentAction } from '@/lib/commentsServer';
import RichTextEditor from '@/components/RichTextEditor';

export default function NativeComments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<CommentNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [replyingTo, setReplyingTo] = useState<{id: number | string, author: string} | null>(null);
  const [likedLocal, setLikedLocal] = useState<(number | string)[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fetchComments = () => {
    getCommentsAction(slug).then(res => {
      if (res.comments) setComments(res.comments);
      if (res.error) setErrorMsg(res.error);
      setLoading(false);
    });
  };

  useEffect(() => {
    // Memuat jejak likes audiens dari memori browser mereka
    const savedLikesString = localStorage.getItem('vanguard_liked_comments');
    if (savedLikesString) {
      try {
        setLikedLocal(JSON.parse(savedLikesString));
      } catch {
        // ignore
      }
    }

    fetchComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSubmitting(true);
    
    const res = await submitCommentAction(slug, name, message, replyingTo?.id ? Number(replyingTo.id) : undefined);
    if (res.success) {
      setMessage('');
      setReplyingTo(null);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      // Panggil ulang dari server untuk merakit tree UI kembali (Konsisten)
      fetchComments(); 
    } else {
      alert("Error: " + (res.error || "Gagal memproses komentar."));
    }
    setIsSubmitting(false);
  };

  const handleLike = async (commentId: number | string) => {
    const isLiking = !likedLocal.includes(commentId);
    
    // Optimistic Update Traverse Function
    const updateLikes = (list: CommentNode[]): CommentNode[] => {
      return list.map(c => {
        if (c.id === commentId) return { ...c, likes: isLiking ? c.likes + 1 : c.likes - 1 };
        if (c.replies?.length > 0) return { ...c, replies: updateLikes(c.replies) };
        return c;
      });
    };
    setComments(updateLikes(comments));

    // Persist to Client memory
    let newLikedLocal;
    if (isLiking) {
       newLikedLocal = [...likedLocal, commentId];
    } else {
       newLikedLocal = likedLocal.filter(id => id !== commentId);
    }
    setLikedLocal(newLikedLocal);
    localStorage.setItem('vanguard_liked_comments', JSON.stringify(newLikedLocal));

    // Patch to Github API Issue metadata modifier
    await likeCommentAction(slug, commentId, isLiking);
  };

  const renderCommentThread = (c: CommentNode, depth = 0) => {
    return (
      <div key={c.id} style={{ 
        paddingLeft: depth > 0 ? '1.5rem' : '0', 
        marginLeft: depth > 0 ? '1.5rem' : '0',
        borderLeft: depth > 0 ? '1px solid var(--surface-container-high)' : 'none',
        paddingBottom: depth === 0 ? '2.5rem' : '1.5rem', 
        borderBottom: depth === 0 ? '1px solid var(--surface-container-high)' : 'none',
        marginTop: depth > 0 ? '1.5rem' : '0'
      }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
           <strong style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--on-surface)' }}>{c.author}</strong>
           <span className="label-sm" style={{ color: 'var(--secondary)' }}>{c.date}</span>
         </div>
         <div 
           style={{ fontFamily: 'var(--font-serif)', color: 'var(--on-surface-variant)', lineHeight: '1.75', fontSize: depth > 0 ? '1.1rem' : '1.25rem', marginBottom: '1rem' }} 
           className="markdown-comment"
           dangerouslySetInnerHTML={{ __html: c.text }}
         />
         
         <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
           <button onClick={() => handleLike(c.id)} style={{ background: 'none', border: 'none', color: likedLocal.includes(c.id) ? 'var(--on-surface)' : 'var(--secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0, fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: likedLocal.includes(c.id) ? "'FILL' 1" : "'FILL' 0" }}>thumb_up</span>
              {c.likes > 0 ? c.likes : 'Like'}
           </button>
           <button onClick={() => setReplyingTo({ id: c.id, author: c.author })} style={{ background: 'none', border: 'none', color: 'var(--secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0, fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>reply</span>
              Reply
           </button>
         </div>

         {/* Children recursion */}
         {c.replies && c.replies.length > 0 && (
           <div style={{ marginTop: '1.5rem' }}>
             {c.replies.map((reply: CommentNode) => renderCommentThread(reply, depth + 1))}
           </div>
         )}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '800px', width: '100%', borderTop: '1px solid var(--surface-container-high)', paddingTop: '4rem', marginTop: '6rem' }}>
      <h3 className="label-sm" style={{ marginBottom: '2rem', color: 'var(--secondary)' }}>Participant Discussion</h3>
      
      {errorMsg && errorMsg.includes('Missing GitHub') ? (
        <div style={{ padding: '2rem', backgroundColor: 'var(--surface-container)', color: 'var(--on-surface-variant)', fontStyle: 'italic', fontSize: '0.875rem', margin: '0 0 2rem 0' }}>
          <strong>Background Database Pending:</strong> Configure GITHUB_OWNER, GITHUB_REPO, and GITHUB_PAT parameters in .env file.
        </div>
      ) : null}

      {/* Form Area */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '4rem', backgroundColor: 'var(--surface-container-low)', padding: '2rem' }}>
        {replyingTo && (
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--surface)', padding: '0.5rem 1rem', borderLeft: '3px solid var(--black)' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)' }}>Replying to <strong>{replyingTo.author}</strong></span>
              <button type="button" onClick={() => setReplyingTo(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--secondary)' }} aria-label="Cancel reply"><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span></button>
           </div>
        )}
        <input 
          type="text" 
          placeholder="Your Name (Optional)" 
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--surface)', border: '1px solid var(--surface-container-highest)', color: 'var(--on-surface)', fontFamily: 'var(--font-sans)' }}
        />
        <div style={{
          '--editor-border': 'var(--surface-container-highest)',
          '--editor-border-focus': 'var(--on-surface)',
          '--editor-bg': 'var(--surface)',
          '--editor-icon': 'var(--secondary)',
          '--editor-icon-hover': 'var(--on-surface)',
          '--editor-icon-hover-bg': 'var(--surface-container)',
          '--editor-text': 'var(--on-surface)',
          '--editor-placeholder': 'var(--secondary)',
          '--editor-divider': 'var(--surface-container-highest)',
          '--editor-scroll': 'var(--surface-container-highest)'
        } as React.CSSProperties}>
          <RichTextEditor 
            id="comment-message"
            name="message"
            placeholder={replyingTo ? "Your reply regarding this perspective..." : "Contribute your unique insight to this discussion..."}
            value={message}
            onChange={setMessage}
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting || message.trim().length === 0}
          style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--black)', color: 'var(--white)', border: 'none', cursor: 'pointer', alignSelf: 'flex-start', fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.05em', transition: 'opacity 0.2s', opacity: (isSubmitting || message.trim().length === 0) ? 0.5 : 1 }}
        >
          {isSubmitting ? 'Submitting...' : (replyingTo ? 'Post Reply' : 'Post Comment')}
        </button>
      </form>

      {/* List Area */}
      {loading ? (
        <p className="label-sm" style={{ color: 'var(--secondary)' }}>Loading discussion index...</p>
      ) : comments.length === 0 ? (
        <p className="label-sm" style={{ color: 'var(--secondary)', fontStyle: 'italic' }}>No insights recorded yet. Be the pioneer of this conversation.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {comments.map((rootComment) => renderCommentThread(rootComment))}
        </div>
      )}
    </div>
  );
}
