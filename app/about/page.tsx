import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';

const AboutMePage = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>About Zeeshan</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          More than just a title let’s dive deeper!
        </PageHeaderHeading>
        <PageHeaderDescription>
         I am a passionate Software Developer with expertise in building full-stack web and mobile applications using modern technologies such as React.js, React Native, Node.js, Express.js, and MongoDB. My journey in tech began with a curiosity for solving real-world problems through innovative solutions, which has grown into a passion for delivering scalable, user-centric digital experiences across web and mobile platforms.
        </PageHeaderDescription>

        <PageHeaderDescription>
With a strong foundation in JavaScript and modern frameworks, I specialize in creating scalable, efficient, and user-friendly web and mobile applications. I have been focusing on backend development with Node.js, Express.js, and MongoDB, integrating secure APIs, payment gateways, and real-time functionalities to deliver robust server-side solutions.
        </PageHeaderDescription>

        <PageHeaderDescription>
          Beyond coding, I thrive in collaborative environments and enjoy
          tackling challenging problems with creative solutions. I aim to
          contribute to impactful projects that make a difference in users'
          lives.
        </PageHeaderDescription>
      </PageHeader>

      <Pager
        prevHref="/"
        nextHref="/projects"
        prevTitle="Introduction"
        nextTitle="Projects"
      />
    </>
  );
};
export default AboutMePage;
