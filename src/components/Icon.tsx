/**
 * Inline SVG Icon component — replaces Material Symbols Outlined to eliminate
 * the render-blocking external font request from Google Fonts.
 *
 * All SVGs sourced from Material Symbols (Apache 2.0 License).
 */

import React from 'react';

export type IconName =
  | 'arrow_back'
  | 'arrow_forward'
  | 'north_east'
  | 'menu'
  | 'close'
  | 'schedule'
  | 'error'
  | 'chevron_left'
  | 'chevron_right'
  | 'expand_more'
  | 'expand_less'
  | 'check'
  | 'refresh'
  | 'verified'
  | 'description'
  | 'menu_book'
  | 'format_list_bulleted'
  | 'format_list_numbered'
  | 'format_quote'
  | 'format_clear'
  | 'school'
  | 'emoji_events'
  | 'work_history';

interface IconProps {
  name: IconName | string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const PATHS: Record<string, string> = {
  arrow_back:
    'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
  arrow_forward:
    'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z',
  north_east:
    'M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z',
  menu:
    'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  close:
    'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  schedule:
    'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
  error:
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  chevron_left:
    'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z',
  chevron_right:
    'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  expand_more:
    'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z',
  expand_less:
    'M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z',
  check:
    'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  refresh:
    'M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z',
  verified:
    'M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5 12 21.04l3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.8 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.34z',
  description:
    'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
  menu_book:
    'M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z',
  format_list_bulleted:
    'M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z',
  format_list_numbered:
    'M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z',
  format_quote:
    'M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z',
  format_clear:
    'M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21 18 19.73 3.55 5.27 3.27 5zM6 5v.18L8.82 8h2.4l-.72 1.68 2.1 2.1L14.21 8H20V5H6z',
  school:
    'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z',
  emoji_events:
    'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z',
  work_history:
    'M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.58-3.47-6.33-3.87zM15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 010 7.52c.42.14.86.24 1.33.24zM9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM9 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z',
  thumb_up:
    'M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 2 7.59 8.59C7.22 8.95 7 9.45 7 10v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z',
};

/**
 * Renders an inline SVG icon. For known icons, uses an optimized SVG path.
 * For unknown/dynamic CMS icons, renders the name as text with a fallback
 * font-family that degrades gracefully.
 */
export default function Icon({ name, size = 24, className, style }: IconProps) {
  const path = PATHS[name];

  if (path) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width={size}
        height={size}
        className={className}
        style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    );
  }

  // Fallback for dynamic CMS icons — renders as text using system symbol fonts
  return (
    <span
      className={className}
      style={{
        fontFamily: "'Material Symbols Outlined', 'Material Icons', sans-serif",
        fontSize: size,
        display: 'inline-block',
        lineHeight: 1,
        verticalAlign: 'middle',
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        textTransform: 'none',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
        direction: 'ltr',
        WebkitFontSmoothing: 'antialiased',
        ...style,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
