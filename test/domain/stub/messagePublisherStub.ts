import { Message } from "../../../src/domain/message/application/message";
import { MessagePublisher } from "../../../src/domain/message/port/serverside";

export const messagePublisherStub: MessagePublisher = {
  publier: (message: Message) => console.log(message.id),
};
