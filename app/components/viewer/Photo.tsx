import { View, Image } from '@react-pdf/renderer';
import { PDFStyles } from '../../lib/useCVStyles';

interface PhotoProps {
  photo: string | null;
  s: PDFStyles;
}

export function Photo({ photo, s }: PhotoProps) {
  return (
    <View style={s.photo}>
      {photo ? <Image src={photo} style={s.photoImg} /> : null}
    </View>
  );
}
