export type CreateMessageParams = {
  titre: string;
  description: string;
  tag: string[];
};

export type MessageEtat = "Brouillon" | "Publier";

export type Message = CreateMessageParams & {
  id: number;
  etat: MessageEtat;
  dateCreation: number;
};
