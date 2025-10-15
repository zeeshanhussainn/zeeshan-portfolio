import { Icons } from '@/components/icons';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import { Badge } from '@/components/ui/badge';
import { mySkills } from '@/constants';

const SkillsToolsPage = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Skills & Tools</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          Learned by coding all night and debugging all day!
        </PageHeaderHeading>
        <PageHeaderDescription>
  As a Full-Stack Software Developer, I specialize in building scalable and user-centric web and mobile applications using technologies such as React.js, React Native, Node.js, Express.js, and MongoDB. I am also expanding my expertise into cloud deployment, backend optimization, and API integrations to deliver efficient, maintainable, and robust digital solutions.
        </PageHeaderDescription>
      </PageHeader>

      {/* skills and tools badges */}
      <div
        id="badges"
        className="flex flex-wrap items-center justify-center gap-2 my-4"
      >
        {mySkills.map((item) => (
          <Badge
            key={item.title}
            className="p-4 py-2 border border-secondary bg-secondary-foreground text-secondary"
          >
            {Icons[item.icon as keyof typeof Icons]?.({
              className: 'mr-2 size-4',
            })}
            {item.title}
          </Badge>
        ))}
      </div>

      <Pager
        prevHref="/projects"
        nextHref="/experience"
        prevTitle="Projects"
        nextTitle="Experience"
      />
    </>
  );
};
export default SkillsToolsPage;
