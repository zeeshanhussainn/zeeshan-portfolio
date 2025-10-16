export const dynamic = "force-dynamic";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
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

// Dummy placeholder functions
async function getViewsServerAction() {
  return { success: true, message: 324 }; 
}

async function getLoveCountServerAction() {
  return { success: true, count: 567 }; 
}

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
        {/* Total Views Card */}
        <div className="relative flex flex-col p-8 overflow-hidden transition-all duration-300 border shadow-sm group bg-card/50 backdrop-blur-sm text-card-foreground rounded-xl border-border/40 hover:border-border/80 hover:shadow-md">
          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:opacity-100"></div>
          <div className="relative z-10 space-y-2">
            <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
              Total Views
            </h3>
            <div className="h-[1px] w-full bg-muted/60"></div>
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center flex-1 py-6">
            <p className="text-5xl font-bold text-primary">{views.message}</p>
            <p className="text-sm text-muted-foreground text-center mt-4 max-w-[80%]">
              Unique page visits
            </p>
          </div>
        </div>

        {/* Appreciation / Love Count Card */}
        <div className="relative flex flex-col p-8 overflow-hidden transition-all duration-300 border shadow-sm group bg-card/50 backdrop-blur-sm text-card-foreground rounded-xl border-border/40 hover:border-border/80 hover:shadow-md">
          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-rose-500/5 to-transparent group-hover:opacity-100"></div>
          <div className="relative z-10 space-y-2">
            <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
              Appreciation Count
            </h3>
            <div className="h-[1px] w-full bg-muted/60"></div>
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center flex-1 py-4">
            <p className="py-6 text-5xl font-bold text-rose-500">{loveCount.count}</p>
            <LoveButtonComponent />
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
