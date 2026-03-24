import { Document, Page, View } from '@react-pdf/renderer';
import { CVData } from '../types/cv';
import { useStyles } from '../lib/useCVStyles';
import { Header } from './viewer/Header';
import { Photo } from './viewer/Photo';
import { ContactInfo } from './viewer/ContactInfo';
import { Experience } from './viewer/Experience';
import { Profile } from './viewer/Profile';
import { TechnicalSkills } from './viewer/TechnicalSkills';
import { Education } from './viewer/Education';

interface CVDocumentProps {
  cv: CVData;
  labels: {
    profile: string;
    experience: string;
    education: string;
    technicalSkills: string;
  };
}

export function CVDocument({ cv, labels }: CVDocumentProps) {
  const { personalInfo, profile, experience, education, technicalSkills, style } = cv;
  const { styles: s, sp } = useStyles(style);

  const contactItems = [
    personalInfo.email,
    personalInfo.website,
    personalInfo.linkedin,
    personalInfo.github,
    personalInfo.phone,
    personalInfo.address,
  ].filter(Boolean) as string[];

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.body}>
          <View style={s.leftCol}>
            <Header name={personalInfo.name} title={personalInfo.title} s={s} />
            <View style={s.photoRow}>
              <Photo photo={personalInfo.photo} s={s} />
              <ContactInfo items={contactItems} accentColor={s.accentColor.color} s={s} />
            </View>
            <Experience experience={experience} label={labels.experience} s={s} sp={sp} />
          </View>

          <View style={s.rightCol}>
            <Profile profile={profile} label={labels.profile} s={s} />
            <TechnicalSkills technicalSkills={technicalSkills} label={labels.technicalSkills} s={s} />
            <Education education={education} label={labels.education} s={s} sp={sp} />
          </View>
        </View>
      </Page>
    </Document>
  );
}
