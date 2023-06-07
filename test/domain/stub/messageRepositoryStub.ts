import { Message } from "../../../src/domain/message/application/message";
import { MessageRepository } from "../../../src/domain/message/port/serverside";
import { stubMessage } from "./messageStub";

export const messageRepositoryStub: MessageRepository = {
  persister: (message: Message) => console.log(message),
  getById: (id: number) => ({ ...stubMessage, id: id }),
};
