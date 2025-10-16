import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { ExternalLink, Mail } from 'lucide-react';
import Link from 'next/link';

const IntroductionPage = async () => {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Zeeshan Hussain</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          A coder by day, problem-solver by night!
        </PageHeaderHeading>

        <PageHeaderDescription>
          I am a Software Developer at Zen4Tech Solution, specializing in Full
          Stack Web and Mobile Development. I design and deliver scalable,
          robust, and user-centric digital solutions leveraging technologies
          such as React.js, React Native, Node.js, Express.js, and MongoDB.
          <br />
          <br />
          At Zen4Tech, I have contributed to end-to-end projects, ranging from
          corporate websites to complex commercial platforms handling frontend
          and backend development, payment gateway integrations, API design,
          and deployment pipelines.
          <br />
          <br />
          I am passionate about creating high-performance applications that
          combine clean, maintainable code, responsive design, and solid
          backend architecture, ensuring both functionality and an exceptional
          user experience.
        </PageHeaderDescription>

        <PageActions>
          {/* Resume Button */}
<Button asChild size="sm" className="rounded-md">
  <Link
    href="/Zeeshan_Hussain_Resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Open resume (PDF)"
  >
    Get Resume
    <ExternalLink size={16} className="ml-2 inline-block" strokeWidth={2} />
  </Link>
</Button>

          {/* Email Button */}
          <Button asChild size="sm" variant="ghost" className="rounded-md">
            <Link href={siteConfig.links.email}>
              <Mail size={16} className="mr-2 inline-block" />
              Send Mail
            </Link>
          </Button>
        </PageActions>
      </PageHeader>

      <Pager
        prevHref="/"
        nextHref="/about"
        prevTitle="Previous"
        nextTitle="About Me"
      />
    </>
  );
};

export default IntroductionPage;

