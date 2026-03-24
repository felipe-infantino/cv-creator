import { View, Text } from '@react-pdf/renderer';
import { Education as EducationType } from '../../types/cv';
import { PDFStyles } from '../../lib/useCVStyles';
import { PDFSectionTitle } from './shared';

interface EducationProps {
  education: EducationType[];
  label: string;
  s: PDFStyles;
  sp: number;
}

export function Education({ education, label, s, sp }: EducationProps) {
  if (education.length === 0) return null;

  return (
    <View style={s.section}>
      <PDFSectionTitle title={label} s={s} />
      {education.map((edu) => (
        <View key={edu.id} wrap={false} style={{ marginBottom: sp * 0.55 }}>
          <View style={s.eduHeader}>
            <Text style={s.eduDegree}>{edu.degree}</Text>
            <Text style={s.eduYear}>
              {edu.startYear}{edu.startYear && edu.endYear ? ' – ' : ''}{edu.endYear}
            </Text>
          </View>
          <Text style={s.eduInstitution}>{edu.institution}</Text>
        </View>
      ))}
    </View>
  );
}
