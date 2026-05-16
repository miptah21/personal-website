'use client'

import { useRef, useCallback, useEffect } from 'react'
import Icon from '@/components/Icon'
import styles from './RichTextEditor.module.css'

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
    if (editorRef.current && hiddenInputRef.current) {
      const html = editorRef.current.innerHTML
      hiddenInputRef.current.value = html
      if (onChange) {
        onChange(html)
      }
    }
  }, [onChange])

  // Attach a force-sync listener so the parent form can trigger sync before submit
  useEffect(() => {
    const editor = editorRef.current
    if (!editor) return
    const handleForceSync = () => syncToHiddenInput()
    editor.addEventListener('forcesync', handleForceSync)
    return () => editor.removeEventListener('forcesync', handleForceSync)
  }, [syncToHiddenInput])

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
          <Icon name="format_list_bulleted" size={16} />
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
          <Icon name="format_list_numbered" size={16} />
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
          <Icon name="format_quote" size={16} />
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
          <Icon name="format_clear" size={16} />
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
        onKeyUp={syncToHiddenInput}
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
