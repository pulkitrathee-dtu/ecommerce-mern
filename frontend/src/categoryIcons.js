// Small hand-drawn icon set + color per product category.
// Kept as simple geometric SVGs (no icon library) so cards have real
// visual variety tied to what's actually being sold, not stock art.

export const CATEGORY_STYLES = {
  audio: { color: '#7c3aed', tint: '#f2ecfe' },
  peripherals: { color: '#2563eb', tint: '#e9f0fe' },
  accessories: { color: '#0f9d8f', tint: '#e6f6f4' },
  bags: { color: '#b45309', tint: '#fbf0e2' },
  'home-office': { color: '#be123c', tint: '#fbe9ed' },
  electronics: { color: '#4338ca', tint: '#ecebfb' },
  wearables: { color: '#c2410c', tint: '#fcece2' },
  storage: { color: '#0369a1', tint: '#e5f1fa' },
  networking: { color: '#15803d', tint: '#e7f4ec' },
  general: { color: '#475569', tint: '#eaedf1' },
};

export function styleFor(category) {
  return CATEGORY_STYLES[category] || CATEGORY_STYLES.general;
}

// Each icon is a plain 24x24 stroke-only SVG path set, colored via currentColor.
export function CategoryIcon({ category }) {
  switch (category) {
    case 'audio':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 13a8 8 0 0 1 16 0" strokeLinecap="round" />
          <rect x="3" y="13" width="4" height="6" rx="1.2" />
          <rect x="17" y="13" width="4" height="6" rx="1.2" />
        </svg>
      );
    case 'peripherals':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="7" width="18" height="11" rx="1.5" />
          <path d="M6.5 11h.01M10 11h.01M13.5 11h.01M17 11h.01M8 14.5h8" strokeLinecap="round" />
        </svg>
      );
    case 'accessories':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path
            d="M7 15l-2.5 2.5a2.1 2.1 0 1 0 3 3L10 18M17 9l2.5-2.5a2.1 2.1 0 1 0-3-3L14 6M9 15l6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'bags':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M8 8V6a4 4 0 0 1 8 0v2" strokeLinecap="round" />
          <rect x="4" y="8" width="16" height="12" rx="1.5" />
        </svg>
      );
    case 'home-office':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M9 4h6l3 7H6l3-7z" strokeLinejoin="round" />
          <path d="M12 11v7M8.5 21h7" strokeLinecap="round" />
        </svg>
      );
    case 'electronics':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="4" width="18" height="12" rx="1.3" />
          <path d="M9 20h6M12 16v4" strokeLinecap="round" />
        </svg>
      );
    case 'wearables':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="7" y="7" width="10" height="10" rx="2.2" />
          <path d="M9.5 3.5h5M9.5 20.5h5" strokeLinecap="round" />
        </svg>
      );
    case 'storage':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="6" width="18" height="12" rx="1.5" />
          <circle cx="16.5" cy="12" r="1.6" />
          <path d="M6.5 9.5h5M6.5 14.5h3" strokeLinecap="round" />
        </svg>
      );
    case 'networking':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4.5 9a11 11 0 0 1 15 0M7.5 12.5a6.8 6.8 0 0 1 9 0" strokeLinecap="round" />
          <circle cx="12" cy="17" r="1.4" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="4" y="4" width="16" height="16" rx="1.5" />
          <path d="M4 9h16M9 9v11" strokeLinecap="round" />
        </svg>
      );
  }
}
