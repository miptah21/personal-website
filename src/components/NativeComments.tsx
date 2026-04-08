'use client';
import { useState, useEffect } from 'react';
import { getCommentsAction, submitCommentAction } from '@/lib/commentsServer';

export default function NativeComments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getCommentsAction(slug).then(res => {
      if (res.comments) setComments(res.comments);
      if (res.error) setErrorMsg(res.error);
      setLoading(false);
    });
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSubmitting(true);
    const res = await submitCommentAction(slug, name, message);
    if (res.success) {
      setMessage('');
      setComments([...comments, { id: Date.now(), author: name || 'Anonymous Reader', text: message, date: 'Just now' }]);
    } else {
      alert("Error: " + (res.error || "Gagal memproses komentar."));
    }
    setIsSubmitting(false);
  };

  return (
    <div style={{ maxWidth: '800px', width: '100%', borderTop: '1px solid var(--surface-container-high)', paddingTop: '4rem', marginTop: '6rem' }}>
      <h3 className="label-sm" style={{ marginBottom: '2rem', color: 'var(--secondary)' }}>Participant Discussion</h3>
      
      {errorMsg && errorMsg.includes('Missing GitHub') ? (
        <div style={{ padding: '2rem', backgroundColor: 'var(--surface-container)', color: 'var(--on-surface-variant)', fontStyle: 'italic', fontSize: '0.875rem', marginBottom: '2rem' }}>
          <strong>Sistem Database Tersembunyi Belum Menyala:</strong> Tambahkan <code>GITHUB_OWNER</code>, <code>GITHUB_REPO</code>, dan <code>GITHUB_PAT</code> pada file <code>.env</code> Anda untuk merakit database kustom berbasis GitHub Issues ini.
        </div>
      ) : null}

      {/* Form Area */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '4rem', backgroundColor: 'var(--surface-container-low)', padding: '2rem' }}>
        <input 
          type="text" 
          placeholder="Nama Anda (Boleh Kosong)" 
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--surface)', border: '1px solid var(--surface-container-highest)', color: 'var(--on-surface)', fontFamily: 'var(--font-sans)' }}
        />
        <textarea 
          placeholder="Sumbangkan wawasan unik Anda pada artikel ini..." 
          required
          rows={4}
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--surface)', border: '1px solid var(--surface-container-highest)', color: 'var(--on-surface)', resize: 'vertical', fontFamily: 'var(--font-serif)', fontSize: '1.125rem' }}
        />
        <button 
          type="submit" 
          disabled={isSubmitting || !message.trim()}
          style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--on-surface)', color: 'var(--surface)', border: 'none', cursor: 'pointer', alignSelf: 'flex-start', fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.05em', transition: 'opacity 0.2s', opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? 'Mengirim Data...' : 'Kirim Komentar'}
        </button>
      </form>

      {/* List Area */}
      {loading ? (
        <p className="label-sm" style={{ color: 'var(--secondary)' }}>Memuat indeks diskusi...</p>
      ) : comments.length === 0 ? (
        <p className="label-sm" style={{ color: 'var(--secondary)', fontStyle: 'italic' }}>Belum ada wawasan yang dicatat. Jadilah pelopor perbincangan.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {comments.map((c, i) => (
            <div key={c.id || i} style={{ paddingBottom: '2.5rem', borderBottom: '1px solid var(--surface-container-high)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                 <strong style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--on-surface)' }}>{c.author}</strong>
                 <span className="label-sm" style={{ color: 'var(--secondary)' }}>{c.date}</span>
               </div>
               <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--on-surface-variant)', lineHeight: '1.75', fontSize: '1.25rem' }}>{c.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
