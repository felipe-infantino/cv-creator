import { Font } from '@react-pdf/renderer';

// Maps CSS font-family values (from CVStyle) to the PDF-registered family name
const FONT_MAP: Record<string, string> = {
  'Georgia, serif':                   'Times-Roman',        // PDF built-in
  "'Playfair Display', serif":        'Playfair Display',
  "'Merriweather', serif":            'Merriweather',
  "'Lato', sans-serif":               'Lato',
  "'Roboto', sans-serif":             'Roboto',
  "'Open Sans', sans-serif":          'Open Sans',
  "'Raleway', sans-serif":            'Raleway',
  "'Montserrat', sans-serif":         'Montserrat',
  "'Nunito', sans-serif":             'Nunito',
  "'Source Sans 3', sans-serif":      'Source Sans 3',
};

// PDF built-in fonts — no Font.register() needed
const BUILTIN = new Set(['Times-Roman', 'Helvetica', 'Courier']);

// Fonts to register via @fontsource CDN
const GOOGLE_FONTS: { family: string; slug: string }[] = [
  { family: 'Playfair Display', slug: 'playfair-display' },
  { family: 'Merriweather',     slug: 'merriweather' },
  { family: 'Lato',             slug: 'lato' },
  { family: 'Roboto',           slug: 'roboto' },
  { family: 'Open Sans',        slug: 'open-sans' },
  { family: 'Raleway',          slug: 'raleway' },
  { family: 'Montserrat',       slug: 'montserrat' },
  { family: 'Nunito',           slug: 'nunito' },
  { family: 'Source Sans 3',    slug: 'source-sans-3' },
];

const WEIGHTS: { weight: number }[] = [
  { weight: 400 },
  { weight: 700 },
];

let registered = false;

export function registerPDFFonts() {
  if (registered) return;
  for (const { family, slug } of GOOGLE_FONTS) {
    Font.register({
      family,
      fonts: WEIGHTS.map(({ weight }) => ({
        src: `https://cdn.jsdelivr.net/npm/@fontsource/${slug}/files/${slug}-latin-${weight}-normal.woff`,
        fontWeight: weight,
      })),
    });
  }
  registered = true;
}

export function mapFontFamilyForPDF(cssValue: string): string {
  const mapped = FONT_MAP[cssValue];
  if (!mapped) return 'Helvetica';
  if (BUILTIN.has(mapped)) return mapped;
  return mapped;
}
