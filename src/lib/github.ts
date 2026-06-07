import { FEATURED_REPO_SLUGS } from "../content/projects";

export interface GithubRepo {
  name:              string;
  description:       string | null;
  html_url:          string;
  homepage:          string | null;
  language:          string | null;
  stargazers_count:  number;
  forks_count:       number;
  topics:            string[];
  pushed_at:         string;
  fork:              boolean;
}

// Module-level cache so all 3 project pages share one API call per build
let cache: GithubRepo[] | null = null;

export async function fetchPortfolioRepos(): Promise<GithubRepo[]> {
  if (cache) return cache;

  try {
    const res = await fetch(
      "https://api.github.com/users/Fransuelton/repos?per_page=100&sort=pushed&type=public",
      { headers: { Accept: "application/vnd.github.v3+json" } }
    );
    if (!res.ok) return (cache = []);

    const all: GithubRepo[] = await res.json();
    cache = all
      .filter((r) => !r.fork && !FEATURED_REPO_SLUGS.includes(r.name))
      .sort(
        (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      );
    return cache;
  } catch {
    return (cache = []);
  }
}
