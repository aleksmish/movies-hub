import { Button, Image, notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import Map from "../components/shared/Map";
import Ratings from "../components/shared/Ratings";
import Spin from "../components/shared/Spin";
import { moviesURL, ratingsURL } from "../endpoints";
import { Coordinates } from "../types/coordinates";
import { Movie as MovieType } from "../types/movies";

const Movie = () => {
  const { id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const [movie, setMovie] = useState<MovieType>();

  const openNotification = (placement: NotificationPlacement) => {
    api.success({
      message: `Success`,
      description: `Rating has been published`,
      placement,
    });
  };

  const generateEmbeddedVideoURL = (trailer: string) => {
    if (!trailer) return "";

    let videoId = trailer.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");

    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }

    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleRate = (rate: number) => {
    axios
      .post(ratingsURL, {
        rating: rate,
        movieId: id,
      })
      .then(() => openNotification("top")).catch(err => console.log(err));
  };

  const transformCoordinates = (): Coordinates[] => {
    if (movie?.movieTheaters) {
      const coordinates = movie.movieTheaters.map((movieTheater) => {
        return {
          lat: movieTheater.latitude,
          lng: movieTheater.longtitude,
          name: movieTheater.name,
        } as Coordinates;
      });
      return coordinates;
    }
    return [];
  };

  useEffect(() => {
    axios
      .get(`${moviesURL}/${id}`)
      .then((response: AxiosResponse<MovieType>) => {
        response.data.releaseDate = new Date(response.data.releaseDate);
        setMovie(response.data);
      });
  }, [id]);

  return (
    <div className="flex flex-col content-center max-w-[1200px] min-h-[350px] w-full m-auto p-5">
      {contextHolder}
      {movie ? (
        <>
          <h1 className="mt-5 font-semibold text-2xl leading-6">
            {movie.title} ({movie.releaseDate.getFullYear()})
          </h1>
          <Ratings maxValue={5} averageVote={movie.averageVote} selectedValue={movie.userVote} onChange={handleRate} />
          <div className="flex flex-row gap-2">
            {movie.genres.map((genre) => (
              <Button
                key={genre.id}
                type="primary"
                className="bg-[#1677ff] w-fit"
                href={`/movies/filter?genreId=${genre.id}`}
              >
                {genre.name}
              </Button>
            ))}
          </div>
          <div className="flex flex-row mt-5">
            <span className="inline-block mr-5">
              <Image
                className="rounded-[10px]"
                src={movie.poster}
                width={225}
                height={315}
                alt="poster"
              />
            </span>
            {movie.trailer ? (
              <div>
                <iframe
                  className="rounded-[10px]"
                  title="youtube-trailer"
                  width={560}
                  height={315}
                  src={generateEmbeddedVideoURL(movie.trailer)}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : null}
          </div>
          {movie.summary ? (
            <div className="mt-5">
              <h3 className="mb-2 font-semibold text-xl">Summary</h3>
              <div>
                <Markdown>{movie.summary}</Markdown>
              </div>
            </div>
          ) : null}
          {movie.actors && movie.actors.length > 0 ? (
            <div className="mt-5">
              <h2 className="mb-2 font-semibold text-xl">Actors</h2>
              <div className="flex flex-col">
                {movie.actors.map((actor) => (
                  <div key={actor.id} className="mb-3 flex items-center">
                    <Image
                      src={actor.picture}
                      className="rounded-[10px]"
                      width={100}
                      preview={false}
                      alt={actor.name}
                    />
                    <span className="ml-4 text-lg font-medium">
                      {actor.name}
                    </span>
                    <span className="ml-4 text-lg font-medium">/</span>
                    <span className="ml-4 text-lg font-medium">
                      {actor.character}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {movie.movieTheaters && movie.movieTheaters.length > 0 ? (
            <div>
              <h2 className="mb-2 font-semibold text-xl">Showing on</h2>
              <Map coordinates={transformCoordinates()} readOnly={true} />
            </div>
          ) : null}
        </>
      ) : (
        <Spin/>
      )}
    </div>
  );
};

export default Movie;
