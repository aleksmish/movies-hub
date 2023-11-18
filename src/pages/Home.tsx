import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import FilterMovies from "../components/home/FilterMovies";
import MoviesList from "../components/home/MoviesList";
import { moviesURL } from "../endpoints";
import AlertContext from "../store/AlertContext";
import { LandingPage } from "../types/movies";
import Authorized from "./Authorized";

const Home = () => {
  const [movies, setMovies] = useState<LandingPage | null>(null);

  const getLandingPageData = () => {
    axios.get(moviesURL).then((response: AxiosResponse<LandingPage>) => {
      setMovies(response.data);
    });
  };

  useEffect(() => {
    getLandingPageData();
  }, []);

  return (
    <AlertContext.Provider
      value={() => {
        getLandingPageData();
      }}
    >
      <div className="flex flex-col content-center max-w-[1200px] w-full m-auto p-5">
        <h3 className="font-semibold text-xl mb-5 leading-6">In Theaters</h3>
        <MoviesList movies={movies?.inTheaters || null} />
        <h3 className="mt-5 font-semibold text-xl mb-5">Upcoming Releases</h3>
        <MoviesList movies={movies?.upcomingReleases || null} />
      </div>
    </AlertContext.Provider>
  );
};

export default Home;
