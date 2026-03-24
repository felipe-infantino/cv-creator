import { View, Text } from '@react-pdf/renderer';
import { PDFStyles } from '../../lib/useCVStyles';

interface HeaderProps {
  name: string;
  title: string;
  s: PDFStyles;
}

export function Header({ name, title, s }: HeaderProps) {
  return (
    <View style={s.nameBlock}>
      <Text style={s.name}>{name || 'Your Name'}</Text>
      <Text style={s.jobTitle}>{(title || 'Your Title').toUpperCase()}</Text>
    </View>
  );
}
