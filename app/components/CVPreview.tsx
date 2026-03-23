'use client';

import { useCV } from '../context/CVContext';
import { useLanguage } from '../context/LanguageContext';

const TEXT_DARK = '#1a2e3b';
const TEXT_MID = '#374151';
const TEXT_LIGHT = '#6b7280';
const BORDER_LIGHT = '#e5e7eb';

function SectionTitle({ title, accent }: { title: string; accent: string }) {
  const accentLight = accent + '33'; // ~20% opacity hex
  return (
    <div style={{ marginBottom: 8 }}>
      <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: accent, margin: 0 }}>
        {title}
      </h3>
      <div style={{ marginTop: 3, height: 1, backgroundColor: accentLight }} />
    </div>
  );
}

export default function CVPreview() {
  const { cv } = useCV();
  const { t } = useLanguage();
  const { personalInfo, profile, experience, education, technicalSkills, hobbies, style } = cv;

  const accent = style.accentColor;
  const accentLight = accent + '22';
  const sp = style.sectionSpacing;

  return (
    <div
      id="cv-preview"
      style={{
        width: '210mm',
        minHeight: '297mm',
        backgroundColor: '#ffffff',
        color: TEXT_DARK,
        fontFamily: style.fontFamily,
        fontSize: `${style.baseFontSize}px`,
        lineHeight: style.lineHeight,
        margin: '0 auto',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          padding: `${style.headerPadding}px ${style.contentPadding}px`,
          borderBottom: `3px solid ${accentLight}`,
        }}
      >
        {/* Photo */}
        <div
          style={{
            flexShrink: 0,
            width: 100,
            height: 100,
            borderRadius: '50%',
            overflow: 'hidden',
            border: `3px solid ${accentLight}`,
            backgroundColor: '#e5e7eb',
          }}
        >
          {personalInfo.photo ? (
            <img
              src={personalInfo.photo}
              alt="profile"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
                color: '#9ca3af',
              }}
            >
              👤
            </div>
          )}
        </div>

        {/* Name + contact */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: style.baseFontSize * 2.6, fontWeight: 700, color: TEXT_DARK, margin: 0 }}>
            {personalInfo.name || 'Your Name'}
          </h1>
          <p
            style={{
              fontSize: style.baseFontSize,
              letterSpacing: '0.15em',
              color: accent,
              fontWeight: 600,
              marginTop: 2,
              marginBottom: 10,
              textTransform: 'uppercase',
            }}
          >
            {personalInfo.title || 'Your Title'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px', fontSize: style.baseFontSize * 0.9 }}>
            {personalInfo.phone && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: TEXT_MID }}>
                <span style={{ color: accent }}>📞</span> {personalInfo.phone}
              </span>
            )}
            {personalInfo.email && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: TEXT_MID }}>
                <span style={{ color: accent }}>✉</span> {personalInfo.email}
              </span>
            )}
            {personalInfo.address && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: TEXT_MID }}>
                <span style={{ color: accent }}>📍</span> {personalInfo.address}
              </span>
            )}
            {personalInfo.website && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: TEXT_MID }}>
                <span style={{ color: accent }}>🌐</span> {personalInfo.website}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body — two columns */}
      <div style={{ display: 'flex', padding: '24px 0' }}>
        {/* Left column — 58% */}
        <div style={{ flex: '0 0 58%', paddingLeft: style.contentPadding, paddingRight: style.contentPadding * 0.5 }}>
          {/* Profile */}
          {profile && (
            <div style={{ marginBottom: sp }}>
              <SectionTitle title={t('cvProfile')} accent={accent} />
              <p style={{ fontSize: style.baseFontSize * 0.95, color: TEXT_MID, lineHeight: style.lineHeight, margin: 0 }}>
                {profile}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: sp }}>
              <SectionTitle title={t('cvExperience')} accent={accent} />
              {experience.map((exp, i) => (
                <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? sp * 0.75 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, fontSize: style.baseFontSize, color: TEXT_DARK }}>{exp.position}</span>
                    <span style={{ fontSize: style.baseFontSize * 0.9, color: TEXT_LIGHT }}>
                      {exp.startYear}{exp.startYear && exp.endYear ? ' – ' : ''}{exp.endYear}
                    </span>
                  </div>
                  <div style={{ color: accent, fontSize: style.baseFontSize * 0.9, marginBottom: 4 }}>{exp.company}</div>
                  {exp.bullets.map((b, j) => (
                    <div key={j} style={{ display: 'flex', gap: 6, marginBottom: 2 }}>
                      <span style={{ color: accent, flexShrink: 0, marginTop: 1 }}>•</span>
                      <span style={{ fontSize: style.baseFontSize * 0.9, color: TEXT_MID, lineHeight: style.lineHeight }}>{b}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Education (left) */}
          {education.length > 0 && (
            <div>
              <SectionTitle title={t('cvEducation')} accent={accent} />
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: sp * 0.55 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, fontSize: style.baseFontSize, color: TEXT_DARK }}>{edu.degree}</span>
                    <span style={{ fontSize: style.baseFontSize * 0.9, color: TEXT_LIGHT }}>
                      {edu.startYear}{edu.startYear && edu.endYear ? ' – ' : ''}{edu.endYear}
                    </span>
                  </div>
                  <div style={{ fontSize: style.baseFontSize * 0.9, color: TEXT_LIGHT }}>{edu.institution}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column — 42% */}
        <div
          style={{
            flex: '0 0 42%',
            paddingLeft: style.contentPadding * 0.5,
            paddingRight: style.contentPadding,
            borderLeft: `1px solid ${BORDER_LIGHT}`,
          }}
        >
          {/* Technical Skills */}
          {technicalSkills.length > 0 && (
            <div style={{ marginBottom: sp }}>
              <SectionTitle title={t('cvTechnicalSkills')} accent={accent} />
              {technicalSkills.filter((cat) => cat.items.length > 0).map((cat) => (
                <div key={cat.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: style.baseFontSize * 0.85, fontWeight: 700, color: TEXT_DARK, marginBottom: 4 }}>
                    {cat.name}
                  </div>
                  <div>
                    {cat.items.map((item, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: style.baseFontSize * 0.8,
                          color: accent,
                          backgroundColor: accentLight,
                          border: `1px solid ${accent}44`,
                          borderRadius: 3,
                          padding: '2px 6px',
                          marginRight: 4,
                          marginBottom: 4,
                          display: 'inline-block',
                          verticalAlign: 'middle',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Hobbies */}
          {hobbies.length > 0 && (
            <div style={{ marginBottom: sp }}>
              <SectionTitle title={t('cvHobbies')} accent={accent} />
              <div>
                {hobbies.map((hobby) => (
                  <div
                    key={hobby.id}
                    style={{ display: 'inline-block', textAlign: 'center', marginRight: 12, marginBottom: 8, verticalAlign: 'top', width: 48 }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: accentLight,
                        margin: '0 auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 18,
                      }}
                    >
                      {hobby.icon}
                    </div>
                    <div style={{ fontSize: style.baseFontSize * 0.85, color: TEXT_MID, marginTop: 4 }}>{hobby.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
