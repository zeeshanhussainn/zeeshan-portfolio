import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import TimelineViewer from '@/components/timeline-viewer';
import { education } from '@/constants/education';

const EducationPage = () => {
  return (
    <>
      <PageHeader className="mb-10">
        <PageHeaderHeading>Education</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          I learned a lot, but the real learning happens in the code editor!
        </PageHeaderHeading>
        <PageHeaderDescription>
Education has always been a cornerstone of my journey in technology. I completed my Bachelor of Engineering in Computer Science from Malnad College of Engineering, Hassan, Karnataka, which provided me with a strong foundation in computer science principles, software development, and problem-solving skills.
        </PageHeaderDescription>

        <PageHeaderDescription>
          My academic journey has been complemented by hands-on projects and
          coursework, enabling me to build practical skills and a deep
          understanding of modern technological solutions.
        </PageHeaderDescription>
      </PageHeader>

      <TimelineViewer data={education} />

      <Pager
        prevHref="/experience"
        nextHref="/contact"
        prevTitle="Experience"
        nextTitle="Contact"
      />
    </>
  );
};
export default EducationPage;
