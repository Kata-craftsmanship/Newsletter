export type Params = {
  titre: string;
  description: string;
  tag: string[];
};

export type MessageEtat = "Brouillon" | "Publier";

export type Message = Params & {
  id: number;
  etat: MessageEtat;
  dateCreation: number;
};
