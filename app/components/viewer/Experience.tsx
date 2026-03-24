import { View, Text } from '@react-pdf/renderer';
import { Experience as ExperienceType } from '../../types/cv';
import { PDFStyles } from '../../lib/useCVStyles';
import { PDFSectionTitle } from './shared';

interface ExperienceProps {
  experience: ExperienceType[];
  label: string;
  s: PDFStyles;
  sp: number;
}

export function Experience({ experience, label, s, sp }: ExperienceProps) {
  if (experience.length === 0) return null;

  return (
    <View style={s.section}>
      <PDFSectionTitle title={label} s={s} />
      {experience.map((exp, i) => (
        <View
          key={exp.id}
          wrap={false}
          style={{ marginBottom: i < experience.length - 1 ? sp * 0.75 : 0 }}
        >
          <View style={s.expHeader}>
            <Text style={s.expPosition}>{exp.position}</Text>
            <Text style={s.expYear}>
              {exp.startYear}{exp.startYear && exp.endYear ? ' – ' : ''}{exp.endYear}
            </Text>
          </View>
          <Text style={s.expCompany}>{exp.company}</Text>
          {exp.bullets.map((b, j) => (
            <View key={j} style={s.bulletRow}>
              <Text style={s.bulletDot}>{'•'}</Text>
              <Text style={s.bulletText}>{b}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
