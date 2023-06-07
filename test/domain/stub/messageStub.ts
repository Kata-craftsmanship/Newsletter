import {
  Message,
  CreateMessageParams,
} from "../../../src/domain/message/application/message";

export const stubMessageParams: CreateMessageParams = {
  titre: "Mon titre",
  description: "ma description",
  tag: ["tag1", "tag2"],
};

export const stubMessage: Message = {
  ...stubMessageParams,
  id: 1,
  etat: "Brouillon",
  tag: ["tag1", "tag2"],
  dateCreation: 12,
};
