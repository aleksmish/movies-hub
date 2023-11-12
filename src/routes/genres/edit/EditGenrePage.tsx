import EditEntity from "../../../components/EditEntity";
import { genresURL } from "../../../endpoints";
import { Genre, GenreCreation } from "../../../types/genres";
import GenreForm from "../components/GenreForm";

const EditGenrePage = () => {
  return (
    <EditEntity<GenreCreation, Genre>
      url={genresURL}
      entityName="Genres"
      indexURL="/genres"
    >
      {(entity, handleEditEntity) => (
        <GenreForm
          genreCreation={entity}
          onSubmit={async (values) => {
            await handleEditEntity(values);
          }}
        />
      )}
    </EditEntity>
  );
};

export default EditGenrePage;
