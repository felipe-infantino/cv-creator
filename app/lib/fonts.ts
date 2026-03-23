export interface FontOption {
  label: string;
  value: string;         // CSS font-family value
  googleFamily?: string; // Google Fonts family name (omit for system fonts)
}

export const FONT_OPTIONS: FontOption[] = [
  { label: 'Georgia',          value: 'Georgia, serif' },
  { label: 'Playfair Display', value: "'Playfair Display', serif",  googleFamily: 'Playfair+Display' },
  { label: 'Merriweather',     value: "'Merriweather', serif",      googleFamily: 'Merriweather' },
  { label: 'Lato',             value: "'Lato', sans-serif",         googleFamily: 'Lato' },
  { label: 'Roboto',           value: "'Roboto', sans-serif",       googleFamily: 'Roboto' },
  { label: 'Open Sans',        value: "'Open Sans', sans-serif",    googleFamily: 'Open+Sans' },
  { label: 'Raleway',          value: "'Raleway', sans-serif",      googleFamily: 'Raleway' },
  { label: 'Montserrat',       value: "'Montserrat', sans-serif",   googleFamily: 'Montserrat' },
  { label: 'Nunito',           value: "'Nunito', sans-serif",       googleFamily: 'Nunito' },
  { label: 'Source Sans 3',    value: "'Source Sans 3', sans-serif",googleFamily: 'Source+Sans+3' },
];

export function loadGoogleFont(googleFamily: string) {
  const id = `gfont-${googleFamily}`;
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${googleFamily}:wght@400;600;700&display=swap`;
  document.head.appendChild(link);
}
