import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import TimelineViewer from '@/components/timeline-viewer';
import { experiences } from '@/constants/experience';

const ExperiencePage = () => {
  return (
    <>
      <PageHeader className="mb-10">
        <PageHeaderHeading>Experience</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          You need it to get the job, but the job’s what gives it!
        </PageHeaderHeading>
        <PageHeaderDescription>
Throughout my journey as a Software Developer at Zen4Tech Solution, I have gained hands-on experience with modern web and mobile technologies, including React.js, React Native, Node.js, Express.js, MongoDB, and Supabase. From developing dynamic applications like Apna Poster and Stump Talk to integrating payment systems and APIs, I have honed my skills in writing clean, maintainable code, solving complex problems, and delivering robust solutions. Each project has strengthened my ability to collaborate effectively, handle backend and frontend challenges, and ensure seamless deployment and performance.
        </PageHeaderDescription>
      </PageHeader>

      <TimelineViewer data={experiences} />

      <Pager
        prevHref="/skills-tools"
        nextHref="/education"
        prevTitle="Skills & Tools"
        nextTitle="Education"
      />
    </>
  );
};
export default ExperiencePage;
