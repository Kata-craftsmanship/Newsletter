export type CreateMessageParams = {
  id: number;
  titre: string;
  description: string;
  tag: string[];
};

export type MessageEtat = "Brouillon" | "Publier";

export type Message = CreateMessageParams & {
  etat: MessageEtat;
  dateCreation: number;
};
