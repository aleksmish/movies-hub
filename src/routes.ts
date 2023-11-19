import RedirectToLandingPage from "./components/shared/RedirectToLandingPage";
import Actors from "./pages/Actors";
import CreateActor from "./pages/CreateActor";
import CreateGenre from "./pages/CreateGenre";
import CreateMovie from "./pages/CreateMovie";
import CreateMovieTheater from "./pages/CreateMovieTheater";
import EditActor from "./pages/EditActor";
import EditGenre from "./pages/EditGenre";
import EditMovie from "./pages/EditMovie";
import EditMovieTheater from "./pages/EditMovieTheater";
import FilterMovies from "./pages/FilterMovies";
import Genres from "./pages/Genres";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import MovieTheaters from "./pages/MovieTheaters";
import Register from "./pages/Register";
import Users from "./pages/Users";

const routes = [
    {path: '/genres', component: Genres, isAdmin: true},
    {path: '/genres/create', component: CreateGenre, isAdmin: true},
    {path: '/genres/edit/:id', component: EditGenre, isAdmin: true},

    {path: '/actors', component: Actors, isAdmin: true},
    {path: '/actors/create', component: CreateActor, isAdmin: true},
    {path: '/actors/edit/:id', component: EditActor, isAdmin: true},

    {path: '/movietheaters', component: MovieTheaters, isAdmin: true},
    {path: '/movietheaters/create', component: CreateMovieTheater, isAdmin: true},
    {path: '/movietheaters/edit/:id', component: EditMovieTheater, isAdmin: true},

    {path: '/movies/create', component: CreateMovie, isAdmin: true},
    {path: '/movies/edit/:id(\\d+)', component: EditMovie, isAdmin: true},
    {path: '/movies/filter', component: FilterMovies},
    {path: '/movies/:id', component: Movie},

    {path: '/register', component: Register},
    {path: '/login', component: Login},
    {path: '/users', component: Users, isAdmin: true},


    {path: '/', component: Home},
    {path: '*', component: RedirectToLandingPage}
];

export default routes;