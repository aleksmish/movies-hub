import { Dayjs } from "dayjs";

export type Actor = {
  id: number;
  name: string;
  biography: string;
  dateOfBirth: Dayjs | Date | string,
  picture: string;
}

export type ActorCreation = {
  name: string;
  dateOfBirth?: Dayjs | Date | string;
  picture?: File;
  pictureURL?: string;
  biography?: string;
}

export type MovieActor = {
  id: number;
  name: string;
  character: string;
  picture: string;
}