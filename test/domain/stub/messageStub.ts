import { Message, Params } from "../../../src/domain/message";
import { MessagePublisher } from "../../../src/domain/messagePublisher";
import { MessageRepository } from "../../../src/domain/messageRepository";
import {
  DateService,
  createMessageService,
} from "../../../src/domain/messageService";

export const stubMessageParams: Params = {
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

export const messageRepositoryStub: MessageRepository = {
  persister: (message: Message) => console.log(message),
  getById: (id: number) => ({ ...stubMessage, id: id }),
};

export const dateServiceStub: DateService = { now: () => 5 };

export const messagePublisherStub: MessagePublisher = {
  publier: (message: Message) => console.log(message.titre, "Publié"),
};

export const messageServiceStub = createMessageService({
  dateService: dateServiceStub,
  messageRepository: messageRepositoryStub,
  messagePublisher: messagePublisherStub,
});
