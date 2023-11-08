import EditEntity from "../../../components/EditEntity";
import { genresURL } from "../../../endpoints";
import { Genre, GenreCreation } from "../../../types/genres";
import GenreForm from "../components/GenreForm";

const EditGenrePage = () => {
  return (
    <div className="h-[70px] flex flex-col content-center max-w-[1200px] w-full m-auto p-5">
      <EditEntity<GenreCreation, Genre>
        url={genresURL}
        entityName="Genres"
        indexURL="/genres"
      >
        {(entity, handleEditEntity) => (
          <GenreForm
            genreCreation={entity}
            onSubmit={async (value) => {
              await handleEditEntity(value);
            }}
          />
        )}
      </EditEntity>
    </div>
  );
};

export default EditGenrePage;
