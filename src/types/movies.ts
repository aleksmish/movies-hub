export type Movie = {
  id: number;
  title: string;
  poster: string;
}

export type MovieCreation = {
  title: string;
  inTheaters: boolean;
  trailer: string;
  releaseDate?: Date;
  poster?: File,
  posterURL?: string;
}

export type LandingPage = {
  inTheaters: Movie[];
  upcomingReleases: Movie;
}