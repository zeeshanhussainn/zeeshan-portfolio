export const dynamic = "force-dynamic";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { getViewsServerAction } from "../actions/getAndSetViewsServerAction";
import { getLoveCountServerAction } from "../actions/getAndSetLoveCountServerAction";
import LoveButtonComponent from "./LoveButtonComponent";
import { getGitHubStatsServerAction } from "../actions/getGitHubStatsServerAction";
import GitHubGraphs from "./GitHubGraphs";
import Pager from "@/components/pager";

const StatCard = ({
  title,
  value,
  className = "",
}: {
  title: string;
  value: string | number;
  className?: string;
}) => (
  <div
    className={`card border border-border/40 rounded-xl p-4 w-full h-full transition-transform duration-200 hover:scale-105 ${className}`}
  >
    <div className="card-content">
      <h3 className="text-lg font-semibold tracking-tight card-title text-muted-foreground">
        {title}
      </h3>
      <span className="text-5xl font-bold leading-tight tracking-tight card-value">
        {value}
      </span>
    </div>
  </div>
);

const Stats = async () => {
  const views = await getViewsServerAction();
  const loveCount = await getLoveCountServerAction();
  const githubStats = await getGitHubStatsServerAction();

  const githubStatCards = [
    {
      title: "Hireable",
      value: githubStats.hireable && "Yes",
      className: githubStats.hireable && "bg-green-500/20",
    },
    {
      title: "Total Public Repositories",
      value: githubStats.public_repos,
    },
    {
      title: "Followers",
      value: githubStats.followers,
    },
    {
      title: "Following",
      value: githubStats.following,
    },
    {
      title: "Current Company",
      value: githubStats.company,
    },
    {
      title: "Location",
      value: githubStats.location,
    },
  ];

  return (
    <>
      {/* About this portfolio */}
      <PageHeader>
        <PageHeaderHeading>About this portfolio</PageHeaderHeading>
        <PageHeaderDescription>
          Insights and metrics about this portfolio website
        </PageHeaderDescription>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
        <div className="relative flex flex-col p-8 overflow-hidden transition-all duration-300 border shadow-sm group bg-card/50 backdrop-blur-sm text-card-foreground rounded-xl border-border/40 hover:border-border/80 hover:shadow-md">
          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:opacity-100"></div>

          <div className="relative z-10 space-y-2">
            <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary/70"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              &nbsp;Total Views
            </h3>
            <div className="h-[1px] w-full bg-muted/60"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center flex-1 py-6">
            {views.success === true ? (
              <p className="text-5xl font-bold text-primary">{views.message}</p>
            ) : (
              <p className="text-xl font-bold text-destructive">
                Failed to fetch views
              </p>
            )}
            {views.success && (
              <p className="text-sm text-muted-foreground text-center mt-4 max-w-[80%]">
                Unique page visits since April 2025
              </p>
            )}
          </div>
        </div>

        <div className="relative flex flex-col p-8 overflow-hidden transition-all duration-300 border shadow-sm group bg-card/50 backdrop-blur-sm text-card-foreground rounded-xl border-border/40 hover:border-border/80 hover:shadow-md">
          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-rose-500/5 to-transparent group-hover:opacity-100"></div>

          <div className="relative z-10 space-y-2">
            <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-rose-500/70"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              &nbsp;Appreciation Count
            </h3>
            <div className="h-[1px] w-full bg-muted/60"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center flex-1 py-4">
            {loveCount.success === true ? (
              <>
                <p
                  className="py-6 text-5xl font-bold text-rose-500"
                  id="love-count"
                >
                  {loveCount.count}
                </p>
                <LoveButtonComponent />
              </>
            ) : (
              <p className="text-xl font-bold text-destructive">
                Failed to fetch appreciation count
              </p>
            )}
          </div>
        </div>
      </div>

      {/* About GitHub Stats */}
      <PageHeader className="mt-8 mb-4">
        <PageHeaderHeading>GitHub Stats</PageHeaderHeading>
        <PageHeaderDescription>
          Insights and metrics about my GitHub profile
        </PageHeaderDescription>
      </PageHeader>

      {/* GitHub Graphs */}
      <div className="flex items-center justify-center w-full p-4 mb-8 border border-border/40 rounded-xl">
        <GitHubGraphs />
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-1 gap-4 card-container md:grid-cols-3">
          {githubStatCards.map((card, index) => (
            <StatCard
              key={index}
              title={card.title}
              value={card.value || "Limit Reached"}
              className={card.className}
            />
          ))}
        </div>
      </div>

      <Pager
        prevHref="/contact"
        nextHref="/"
        prevTitle="Contact"
        nextTitle="Home"
      />
    </>
  );
};

export default Stats;
