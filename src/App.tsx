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

configureValidations();

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='genres'>
          <Route index element={<GenresPage />} />
          <Route path='create' element={<CreateGenrePage />} />
        </Route>
        <Route path='actors'>
          <Route index element={<ActorsPage />} />
          <Route path='create' element={<CreateActorPage />} />
          <Route path='edit' element={<EditActorPage />} />
        </Route>
        <Route path='*' element={<div>The page is not found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
