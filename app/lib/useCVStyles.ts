import { useMemo } from 'react';
import { StyleSheet } from '@react-pdf/renderer';
import { CVStyle } from '../types/cv';

const TEXT_DARK = '#1a2e3b';
const TEXT_MID = '#374151';
const TEXT_LIGHT = '#6b7280';



const SECTION_SPACING = 18;
const CONTENT_PADDING = 0;
const HEADER_PADDING = 16;
const PAGE_PADDING = 10;

export function useStyles(style: CVStyle) {
  const { accentColor, baseFontSize, lineHeight, fontFamily } = style;

  return useMemo(() => {
    const accent = accentColor;
    const fs = baseFontSize;
    const lh = lineHeight;
    const sp = SECTION_SPACING;

    return {
      // Expose raw values needed for dynamic per-item margins
      sp,

      styles: StyleSheet.create({
        // ── Page ────────────────────────────────────────────────
        page: {
          fontFamily,
          padding: PAGE_PADDING,
          fontSize: fs,
          lineHeight: lh,
          color: TEXT_DARK,
          backgroundColor: '#ffffff',
        },
        accentColor: {
          color: accentColor,
        },

        // ── Header ──────────────────────────────────────────────
        header: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: 10,
        },
        photo: {
          width: 100,
          height: 100,
          overflow: 'hidden',
        },
        photoImg: {
          width:100,
          height: 100,
          objectFit: 'cover',
        },
        nameBlock: {
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'flex-start',
         gap: 5,
        },
        name: {
          fontSize: fs * 2.2,
          fontWeight: 700,
          color: TEXT_DARK,
          padding: 5,
        },
        jobTitle: {
          fontSize: fs * 1.2,
          color: accent,
          fontWeight: 600,
          padding: 5,
        },
        contactRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
        },
        contactItem: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          marginBottom: 2,
        },
        contactBullet: {
          fontSize: fs * 0.9,
          color: accent,
          fontWeight: 700,
        },
        contactText: {
          fontSize: fs * 0.9,
          color: TEXT_MID,
        },

        // ── Body layout ─────────────────────────────────────────
        body: {
          flexDirection: 'row',
          paddingTop: 5,
        },
        leftCol: {
          width: '58%',
          paddingLeft: CONTENT_PADDING,
          paddingRight: CONTENT_PADDING * 0.5,
        },
        rightCol: {
          width: '42%',
          paddingLeft: CONTENT_PADDING * 0.5,
          paddingRight: CONTENT_PADDING,
          borderLeftWidth: 1,
          borderLeftColor: accentColor,
          borderLeftStyle: 'solid',
        },

        // ── Section title ────────────────────────────────────────
        section: {
          paddingHorizontal: 10,
          paddingVertical: 4,
        },
        sectionTitle: {
          marginBottom: 8,
        },
        sectionTitleText: {
          fontSize: 10,
          fontWeight: 700,
          color: accent,
          letterSpacing: 1.2,
        },
        sectionTitleLine: {
          marginTop: 3,
          height: 1,
          backgroundColor: accentColor,
        },

        // ── Profile ──────────────────────────────────────────────
        profileText: {
          fontSize: fs * 0.95,
          color: TEXT_MID,
          lineHeight: lh,
        },

        // ── Experience ───────────────────────────────────────────
        expHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        expPosition: {
          fontWeight: 700,
          fontSize: fs,
          color: TEXT_DARK,
        },
        expYear: {
          fontSize: fs * 0.9,
          color: TEXT_LIGHT,
        },
        expCompany: {
          color: accent,
          fontSize: fs * 0.9,
          marginBottom: 4,
        },
        bulletRow: {
          flexDirection: 'row',
          gap: 6,
          marginBottom: 2,
        },
        bulletDot: {
          color: accent,
          flexShrink: 0,
          fontSize: fs * 0.9,
        },
        bulletText: {
          fontSize: fs * 0.9,
          color: TEXT_MID,
          lineHeight: lh,
          flex: 1,
        },

        // ── Education ────────────────────────────────────────────
        eduHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        eduDegree: {
          fontWeight: 700,
          fontSize: fs,
          color: TEXT_DARK,
        },
        eduYear: {
          fontSize: fs * 0.9,
          color: TEXT_LIGHT,
        },
        eduInstitution: {
          fontSize: fs * 0.9,
          color: TEXT_LIGHT,
        },

        // ── Technical Skills ─────────────────────────────────────
        skillCat: {
          marginBottom: 4,
          lineHeight: 0.725,
          // backgroundColor: 'red',
        },
        skillCatName: {
          fontSize: fs * 0.8,
          fontWeight: 700,
          color: TEXT_DARK,
        },
        skillBadgesRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        skillBadge: {
          // borderWidth: 1,
          // borderColor: accentColor,
          borderStyle: 'solid',
          // borderRadius: 3,
          backgroundColor: accentColor,
          padding: 4,
          marginRight: 4,
          marginBottom: 4,
        },
        skillBadgeText: {
          fontSize: fs * 0.7,
          color: "#ffffff",
          lineHeight: 1,
        },
      }),
    };
  }, [accentColor, baseFontSize, lineHeight, fontFamily]);
}
