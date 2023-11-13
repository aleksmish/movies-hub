import EditEntity from "../components/shared/EditEntity";
import { actorsURL } from "../endpoints";
import { Actor, ActorCreation } from "../types/actors";
import { convertActorToFormData } from "../utils/formData";
import ActorForm from "../components/actors/ActorForm";
import dayjs from "dayjs";

const EditActorPage = () => {
  const transform = (actor: Actor): ActorCreation => {
    return {
      name: actor.name,
      pictureURL: actor.picture,
      biography: actor.biography,
      dateOfBirth: dayjs(actor.dateOfBirth),
    };
  };

  return (
    <EditEntity<ActorCreation, Actor>
      url={actorsURL}
      indexURL="/actors"
      entityName="Actor"
      transformFormData={convertActorToFormData}
      transform={transform}
    >
      {(entity, handleEditEntity) => (
        <ActorForm
          actorCreation={entity}
          onSubmit={async (values) => await handleEditEntity(values)}
        />
      )}
    </EditEntity>
  );
};

export default EditActorPage;
