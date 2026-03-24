import { View, Text } from '@react-pdf/renderer';
import { PDFStyles } from '../../lib/useCVStyles';
import { PersonalInfoItem } from './shared';

interface ContactInfoProps {
  items: string[];
  accentColor: string;
  s: PDFStyles;
}

export function ContactInfo({ items, accentColor, s }: ContactInfoProps) {
  return (
    <View style={s.contactCol}>
      {items.map((contact, index) => (
        <View key={index} style={s.contactColItem}>
          <Text>{'•'}</Text>
          <PersonalInfoItem item={contact} accentColor={accentColor} />
        </View>
      ))}
    </View>
  );
}
