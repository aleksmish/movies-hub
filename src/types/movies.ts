import { MovieActor } from "./actors";
import { Genre } from "./genres";
import { MovieTheater } from "./movieTheater";

export type Movie = {
  id: number;
  title: string;
  poster: string;
  inTheaters: boolean;
  trailer: string;
  releaseDate: Date;
  summary?: string;
  genres: Genre[];
  movieTheaters: (string | number)[];
  actors: MovieActor[];
}

export type MovieCreation = {
  title: string;
  inTheaters: boolean;
  trailer: string;
  releaseDate?: Date;
  poster?: File,
  summary?: string;
  posterURL?: string;
  genresIds?: (string | number)[];
  movieTheatersIds?: (string | number)[];
  actors?: MovieActor[];
}

export type LandingPage = {
  inTheaters: Movie[];
  upcomingReleases: Movie;
}

export type MoviesPostGetDTO = {
  genres: Genre[];
  movieTheaters: MovieTheater[];
}