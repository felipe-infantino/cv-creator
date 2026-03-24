import { View, Text, Link } from '@react-pdf/renderer';
import { PDFStyles } from '../../lib/useCVStyles';

export function isURL(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function PersonalInfoItem({ item, accentColor }: { item: string; accentColor: string }) {
  if (isURL(item)) {
    const display = item.replace(/^https?:\/\//, '').replace(/\/$/, '');
    return (
      <Link src={item} style={{ textDecoration: 'none', color: accentColor }}>
        {display}
      </Link>
    );
  }
  if (item.includes('@')) {
    return (
      <Link src={`mailto:${item}`} style={{ textDecoration: 'none', color: accentColor }}>
        {item}
      </Link>
    );
  }
  return <Text>{item}</Text>;
}

export function PDFSectionTitle({ title, s }: { title: string; s: PDFStyles }) {
  return (
    <View style={s.sectionTitle}>
      <Text style={s.sectionTitleText}>{title.toUpperCase()}</Text>
      <View style={s.sectionTitleLine} />
    </View>
  );
}
