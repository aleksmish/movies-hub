import { MovieActor } from "./actors";
import { Genre } from "./genres";
import { MovieTheater } from "./movieTheater";

export type Movie = {
  id: number;
  title: string;
  poster: string;
  inTheaters: boolean;
  trailer: string;
  summary?: string;
  releaseDate: Date;
  genres: Genre[];
  movieTheaters: MovieTheater[];
  actors: MovieActor[];
  userVote: number;
  averageVote: number;
}

export type MovieCreation = {
  title: string;
  inTheaters: boolean;
  trailer: string;
  releaseDate?: Date;
  poster?: File,
  posterURL?: string;
  genresIds?: (string | number)[];
  movieTheatersIds?: (string | number)[];
}

export type LandingPage = {
  inTheaters: Movie[];
  upcomingReleases: Movie;
}