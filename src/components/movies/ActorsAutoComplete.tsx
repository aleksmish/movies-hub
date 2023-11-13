import { useFormikContext } from "formik";
import { MovieActor } from "../../types/actors";
import { Fragment, useEffect, useState } from "react";
import { actorsURL } from "../../endpoints";
import axios, { AxiosResponse } from "axios";
import SelectField, { Option } from "../forms/SelectField";
import { Image, Input } from "antd";

type ActorOptionLabelProps = {
  picture: string;
  name: string;
};

const ActorOptionLabel = ({ picture, name }: ActorOptionLabelProps) => {
  const { values, setFieldValue } = useFormikContext<any>();
  return (
    <div className="w-full h-[100px] flex flex-row content-center">
      <div className="w-[35%] h-auto">
        <Image
          className="rounded-[10px] aspect-square"
          preview={false}
          src={picture}
        />
      </div>
      <div className="font-semibold w-full flex justify-center content-center align-middle">
        <p className="self-center">{name}</p>
      </div>
    </div>
  );
};

const ActorsAutoComplete = () => {
  const [actors, setActors] = useState<MovieActor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { values, setFieldValue } = useFormikContext<any>();

  const actorsOptions: Option[] = actors.map((actor) => ({
    value: JSON.stringify(actor),
    label: actor.name,
    picture: actor.picture,
  }));

  const handleSearch = (query: string) => {
    if (!query) return;

    setIsLoading(true);
    axios
      .get(`${actorsURL}/searchByName/${query}`)
      .then((response: AxiosResponse<MovieActor[]>) => {
        setActors(response.data);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <SelectField
        loading={isLoading}
        displayName="Actors"
        options={actorsOptions}
        selectedOptions={[]}
        onSearch={handleSearch}
        optionRender={option => <ActorOptionLabel picture={option.data.picture} name={option.data.label} />}
        onSelect={value => {
          setFieldValue("actors", [...values.actors, JSON.parse(value)])
        }}
        onDeselect={value => {
          const actor = JSON.parse(value)
          const index = values?.actors.findIndex((val: any) => val.id === actor.id)
          values.actors.splice(index, 1)
          setFieldValue("actors", values.actors)
        }}
      />
      <label className="mb-2">Characters</label>
      <div className="flex flex-col gap-5 content-center mt-2">
        {values?.actors.map((actor: any) => (
          <div key={actor.id} className="w-full  flex flex-row content-center align-middle items-center">
            <div className="h-auto">
              <Image
                className="rounded-[10px] max-h-[100px] aspect-square"
                preview={false}
                src={actor.picture}
            />
            </div>
            <div className="w-[15%] flex justify-center content-center align-middle">
              <p className="self-center">{actor.name} / </p>
            </div>
            <Input
              placeholder="Character"
              onChange={value => {
                const index = values.actors.findIndex((val: any) => val.id === actor.id)
                values.actors[index].character = value.target.value
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorsAutoComplete;
