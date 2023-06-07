import {
  Message,
  CreateMessageParams,
} from "../../../src/domain/message/application/message";

export const stubMessageParams: CreateMessageParams = {
  id: 1,
  titre: "Mon titre",
  description: "ma description",
  tag: ["tag1", "tag2"],
};

export const stubMessage: Message = {
  ...stubMessageParams,
  etat: "Brouillon",
  dateCreation: 12,
};
