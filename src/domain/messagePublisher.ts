import { Message } from "./message";

export type MessagePublisher = {
  publier: (message: Message) => void;
};
