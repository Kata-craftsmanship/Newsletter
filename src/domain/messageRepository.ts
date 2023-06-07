import { Message } from "./message";

export type MessageRepository = {
  persister: (message: Message) => void;
  getById: (id: number) => Message;
};
