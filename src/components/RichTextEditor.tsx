'use client'

import { useRef, useCallback, useEffect } from 'react'
import styles from '@/app/(frontend)/contact/contact.module.css'

interface RichTextEditorProps {
  id: string
  name: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  hasError?: boolean
  ariaDescribedBy?: string
}

export default function RichTextEditor({
  id,
  name,
  placeholder = 'Write your message...',
  value,
  onChange,
  disabled = false,
  hasError = false,
  ariaDescribedBy,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const hiddenInputRef = useRef<HTMLInputElement>(null)


  // Sync contentEditable HTML to hidden input on every change
  const syncToHiddenInput = useCallback(() => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = html
      }
      if (onChange) {
        onChange(html)
      }
    }
  }, [onChange])

  const execCommand = useCallback((command: string, commandValue?: string) => {
    document.execCommand(command, false, commandValue)
    editorRef.current?.focus()
    syncToHiddenInput()
  }, [syncToHiddenInput])

  // Update contentEditable if value changes externally (e.g. form reset)
  useEffect(() => {
    if (editorRef.current && value !== undefined && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const isActive = useCallback((command: string): boolean => {
    return document.queryCommandState(command)
  }, [])

  return (
    <div className={`${styles.richEditor} ${hasError ? styles.richEditorError : ''} ${disabled ? styles.richEditorDisabled : ''}`}>
      {/* Toolbar */}
      <div className={styles.editorToolbar} role="toolbar" aria-label="Text formatting">
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => execCommand('bold')}
          title="Bold (Ctrl+B)"
          tabIndex={-1}
          disabled={disabled}
          aria-label="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => execCommand('italic')}
          title="Italic (Ctrl+I)"
          tabIndex={-1}
          disabled={disabled}
          aria-label="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => execCommand('underline')}
          title="Underline (Ctrl+U)"
          tabIndex={-1}
          disabled={disabled}
          aria-label="Underline"
        >
          <span style={{ textDecoration: 'underline' }}>U</span>
        </button>

        <span className={styles.toolbarDivider} aria-hidden="true" />

        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => execCommand('insertUnorderedList')}
          title="Bullet list"
          tabIndex={-1}
          disabled={disabled}
          aria-label="Bullet list"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>format_list_bulleted</span>
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => execCommand('insertOrderedList')}
          title="Numbered list"
          tabIndex={-1}
          disabled={disabled}
          aria-label="Numbered list"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>format_list_numbered</span>
        </button>

        <span className={styles.toolbarDivider} aria-hidden="true" />

        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => execCommand('formatBlock', 'blockquote')}
          title="Quote"
          tabIndex={-1}
          disabled={disabled}
          aria-label="Quote"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>format_quote</span>
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => execCommand('removeFormat')}
          title="Clear formatting"
          tabIndex={-1}
          disabled={disabled}
          aria-label="Clear formatting"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>format_clear</span>
        </button>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        id={id}
        className={styles.editorContent}
        contentEditable={!disabled}
        role="textbox"
        aria-multiline="true"
        aria-placeholder={placeholder}
        aria-describedby={ariaDescribedBy}
        data-placeholder={placeholder}
        onInput={syncToHiddenInput}
        onBlur={syncToHiddenInput}
        suppressContentEditableWarning
      />

      {/* Hidden input carries the HTML value in FormData */}
      <input
        ref={hiddenInputRef}
        type="hidden"
        name={name}
      />
    </div>
  )
}
