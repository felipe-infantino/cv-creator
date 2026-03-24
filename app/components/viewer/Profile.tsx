import { View, Text } from '@react-pdf/renderer';
import { PDFStyles } from '../../lib/useCVStyles';
import { PDFSectionTitle } from './shared';

interface ProfileProps {
  profile: string;
  label: string;
  s: PDFStyles;
}

export function Profile({ profile, label, s }: ProfileProps) {
  if (!profile) return null;

  return (
    <View style={s.section}>
      <PDFSectionTitle title={label} s={s} />
      <Text style={s.profileText}>{profile}</Text>
    </View>
  );
}
