import { Message } from "../../application/message";

export type MessagePublisher = {
  publier: (message: Message) => void;
};
