import { Message } from "../../../src/domain/message/application/message";
import { MessageRepository } from "../../../src/domain/message/port/serverside";
import { stubMessage } from "./messageStub";

const cacheMessage: Message[] = [stubMessage];
export const messageRepositoryStub: MessageRepository = {
  persister: (message: Message) => {
    const index = cacheMessage.findIndex((msg) => msg.id === message.id);
    index === -1 ? cacheMessage.push(message) : (cacheMessage[index] = message);
  },
  getById: (id: number) =>
    cacheMessage.find((msg) => msg.id === id) ?? stubMessage,
};
