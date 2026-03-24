import { View, Text } from '@react-pdf/renderer';
import { SkillCategory } from '../../types/cv';
import { PDFStyles } from '../../lib/useCVStyles';
import { PDFSectionTitle } from './shared';

interface TechnicalSkillsProps {
  technicalSkills: SkillCategory[];
  label: string;
  s: PDFStyles;
}

export function TechnicalSkills({ technicalSkills, label, s }: TechnicalSkillsProps) {
  const categories = technicalSkills.filter((cat) => cat.items.length > 0);
  if (categories.length === 0) return null;

  return (
    <View style={s.section}>
      <PDFSectionTitle title={label} s={s} />
      {categories.map((cat) => (
        <View key={cat.id} wrap={false} style={s.skillCat}>
          <Text style={s.skillCatName}>{cat.name}</Text>
          <View style={s.skillBadgesRow}>
            {cat.items.map((item, i) => (
              <View key={i} style={s.skillBadge}>
                <Text style={s.skillBadgeText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
