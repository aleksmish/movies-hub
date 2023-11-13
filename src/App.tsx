import "./input.css";
import { Routes, Route } from 'react-router-dom';
import Navigation from "./pages/Navigation";
import Home from "./pages/Home";
import GenresPage from './pages/Genres';
import configureValidations from './validations';
import CreateGenrePage from "./pages/CreateGenre";
import ActorsPage from './pages/Actors';
import CreateActorPage from './pages/CreateActor';
import EditActorPage from './pages/EditActor';
import MovieTheatersPage from "./pages/MovieTheaters";
import CreateMovieTheaterPage from "./pages/CreateMovies";
import EditMovieTheaterPage from "./pages\/EditMovieTheater";
import MoviesPage from "./pages/Movies";
import CreateMoviePage from "./pages/CreateMovie";
import EditMoviePage from "./pages/EditMovie";
import EditGenrePage from "./pages/EditGenre";
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
