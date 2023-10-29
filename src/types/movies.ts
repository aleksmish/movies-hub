export type Movie = {
  id: number;
  title: string;
  poster: string;
}

export type LandingPage = {
  inTheaters: Movie[];
  upcomingReleases: Movie;
}