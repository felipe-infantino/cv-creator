import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import { CVData } from '../types/cv';
import { useStyles } from '../lib/useCVStyles';

interface CVDocumentProps {
  cv: CVData;
  labels: {
    profile: string;
    experience: string;
    education: string;
    technicalSkills: string;
    hobbies: string;
  };
  hobbyImages: Record<string, string>;
}

type Styles = ReturnType<typeof useStyles>['styles'];

function PDFSectionTitle({ title, s }: { title: string; s: Styles }) {
  return (
    <View style={s.sectionTitle}>
      <Text style={s.sectionTitleText}>{title.toUpperCase()}</Text>
      <View style={s.sectionTitleLine} />
    </View>
  );
}

export function CVDocument({ cv, labels, hobbyImages }: CVDocumentProps) {
  const { personalInfo, profile, experience, education, technicalSkills, hobbies, style } = cv;
  const { styles: s, sp } = useStyles(style);


  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.linkedin,
    personalInfo.github,
    personalInfo.website,
    personalInfo.address,
  ].filter(Boolean) as string[];

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* Header */}
        <View style={s.body}>
          <View style={s.leftCol}>
            <View style={s.nameBlock}>
              <Text style={s.name}>{personalInfo.name || 'Your Name'}</Text>
              <Text style={s.jobTitle}>
                {(personalInfo.title || 'Your Title').toUpperCase()}
              </Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <View style={s.photo}>
                {personalInfo.photo ? (
                  <Image src={personalInfo.photo} style={s.photoImg} />
                ) : null}
              </View>

              <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 10, fontSize: 10 }}>
                {contactItems.map((contact, index) => (
                  <View key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Text >{'•'}</Text>
                    <Text >{contact}</Text>
                  </View>
                ))}
              </View>
            </View>

            {experience.length > 0 ? (
              <View style={s.section}>
                <PDFSectionTitle title={labels.experience} s={s} />
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
            ) : null}

            {/* Education */}



          </View>

          <View style={s.rightCol}>
            {profile ? (
              <View style={s.section}>
                <PDFSectionTitle title={labels.profile} s={s} />
                <Text style={s.profileText}>{profile}</Text>
              </View>
            ) : null}


            {technicalSkills.length > 0 ? (
              <View style={s.section}>
                <PDFSectionTitle title={labels.technicalSkills} s={s} />
                {technicalSkills.filter((cat) => cat.items.length > 0).map((cat) => (
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
            ) : null}

            {education.length > 0 ? (
              <View style={s.section}>
                <PDFSectionTitle title={labels.education} s={s} />
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
            ) : null}
          </View>
        </View>


      </Page>
    </Document>
  );
}
