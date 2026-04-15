'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import styles from '@/app/(frontend)/contact/contact.module.css'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  id: string
  name: string
  options: Option[]
  defaultValue?: string
  disabled?: boolean
  hasError?: boolean
  ariaDescribedBy?: string
}

export default function CustomSelect({
  id,
  name,
  options,
  defaultValue = '',
  disabled = false,
  hasError = false,
  ariaDescribedBy,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(
    () => options.find((o) => o.value === defaultValue) ?? options[0],
  )
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (isOpen && focusedIndex >= 0) {
            setSelected(options[focusedIndex])
            setIsOpen(false)
          } else {
            setIsOpen((prev) => !prev)
            setFocusedIndex(options.findIndex((o) => o.value === selected.value))
          }
          break
        case 'ArrowDown':
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            setFocusedIndex(options.findIndex((o) => o.value === selected.value))
          } else {
            setFocusedIndex((prev) => Math.min(prev + 1, options.length - 1))
          }
          break
        case 'ArrowUp':
          e.preventDefault()
          if (isOpen) {
            setFocusedIndex((prev) => Math.max(prev - 1, 0))
          }
          break
        case 'Escape':
          setIsOpen(false)
          break
      }
    },
    [isOpen, focusedIndex, options, selected, disabled],
  )

  // Scroll focused item into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const items = listRef.current.children
      if (items[focusedIndex]) {
        (items[focusedIndex] as HTMLElement).scrollIntoView({ block: 'nearest' })
      }
    }
  }, [focusedIndex, isOpen])

  return (
    <div
      ref={containerRef}
      className={`${styles.customSelect} ${hasError ? styles.customSelectError : ''} ${disabled ? styles.customSelectDisabled : ''}`}
    >
      {/* Hidden native input for form submission */}
      <input type="hidden" name={name} value={selected.value} />

      {/* Trigger */}
      <button
        type="button"
        id={id}
        className={`${styles.selectTrigger} ${isOpen ? styles.selectTriggerOpen : ''}`}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        aria-describedby={ariaDescribedBy}
        disabled={disabled}
      >
        <span>{selected.label}</span>
        <span
          className={`material-symbols-outlined ${styles.selectArrow}`}
          style={{ fontSize: 18 }}
          aria-hidden="true"
        >
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul
          ref={listRef}
          id={`${id}-listbox`}
          className={styles.selectDropdown}
          role="listbox"
          aria-activedescendant={focusedIndex >= 0 ? `${id}-opt-${focusedIndex}` : undefined}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-opt-${index}`}
              role="option"
              aria-selected={option.value === selected.value}
              className={`${styles.selectOption} ${
                option.value === selected.value ? styles.selectOptionActive : ''
              } ${index === focusedIndex ? styles.selectOptionFocused : ''}`}
              onClick={() => {
                setSelected(option)
                setIsOpen(false)
              }}
              onMouseEnter={() => setFocusedIndex(index)}
            >
              <span>{option.label}</span>
              {option.value === selected.value && (
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 16 }}
                  aria-hidden="true"
                >
                  check
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
