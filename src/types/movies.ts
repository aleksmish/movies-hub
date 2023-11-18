import { Dayjs } from "dayjs";
import { Actor, MovieActor } from "./actors";
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
  movieTheaters: MovieTheater[];
  actors: MovieActor[];
  userVote: number;
  averageVote: number;
}

export type MovieCreation = {
  title: string;
  inTheaters: boolean;
  trailer: string;
  releaseDate?: Date | Dayjs;
  poster?: File,
  summary?: string;
  posterURL?: string;
  genresIds?: (string | number)[];
  movieTheatersIds?: (string | number)[];
  actors?: MovieActor[];
}

export type LandingPage = {
  inTheaters: Movie[];
  upcomingReleases: Movie[];
}

export type MoviesPostGet = {
  genres: Genre[];
  movieTheaters: MovieTheater[];
}

export type MoviePutGet = {
  movie: Movie;
  selectedGenres: Genre[];
  genres: Genre[];
  selectedMovieTheaters: MovieTheater[];
  movieTheaters: MovieTheater[];
  actors: Actor[];
}