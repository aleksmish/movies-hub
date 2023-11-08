import "./input.css";
import { Routes, Route } from 'react-router-dom';
import Navigation from "./routes/navigation/Navigation";
import Home from "./routes/home/Home";
import GenresPage from './routes/genres/GenresPage';
import configureValidations from './validations';
import CreateGenrePage from "./routes/genres/create/CreateGenrePage";
import ActorsPage from './routes/actors/ActorsPage';
import CreateActorPage from './routes/actors/create/CreateActorPage';
import EditActorPage from './routes/actors/edit/EditActorPage';
import MovieTheatersPage from "./routes/movieTheaters/MovieTheatersPage";
import CreateMovieTheaterPage from "./routes/movieTheaters/create/CreateMoviesPage";
import EditMovieTheaterPage from "./routes/movieTheaters/edit/EditMovieTheaterPage";
import MoviesPage from "./routes/movies/MoviesPage";
import CreateMoviePage from "./routes/movies/create/CreateMoviePage";
import EditMoviePage from "./routes/movies/edit/EditMoviePage";
import EditGenrePage from "./routes/genres/edit/EditGenrePage";
import { ConfigProvider } from "antd";

configureValidations();

function App() {
  return (
    <ConfigProvider>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='genres'>
            <Route index element={<GenresPage />} />
            <Route path='create' element={<CreateGenrePage />} />
            <Route path='edit/:id' element={<EditGenrePage />} />
          </Route>
          <Route path='actors'>
            <Route index element={<ActorsPage />} />
            <Route path='create' element={<CreateActorPage />} />
            <Route path='edit/:id' element={<EditActorPage />} />
          </Route>
          <Route path='movie-theaters'>
            <Route index element={<MovieTheatersPage />} />
            <Route path='create' element={<CreateMovieTheaterPage />} />
            <Route path='edit' element={<EditMovieTheaterPage />} />
            <Route path='edit/:id' element={<EditMovieTheaterPage />} />
          </Route>
          <Route path='movies'>
            <Route index element={<MoviesPage />} />
            <Route path='create' element={<CreateMoviePage />} />
            <Route path='edit' element={<EditMoviePage />} />
          </Route>
          <Route path='*' element={<div>The page is not found</div>} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
