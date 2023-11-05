export type Actor = {
  id: number;
  name: string;
  biography: string;
  dateOfBirth: Date,
  picture: string;
}

export type ActorCreation = {
  name: string;
  dateOfBirth?: Date;
  image?: File;
  imageURL?: string;
  biography?: string;
}

export type MovieActor = {
  id: number;
  name: string;
  character: string;
  picture: string;
}