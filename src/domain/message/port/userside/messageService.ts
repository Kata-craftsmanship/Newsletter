import { Message, CreateMessageParams } from "../../application/message";
import {
  MessagePublisher,
  MessageRepository,
  DateService,
} from "../serverside";

export type MessageService = {
  creer: (param: CreateMessageParams) => Message;
  valider: (id: number) => Message;
  modifier: (
    id: number,
    modifiedField: Partial<CreateMessageParams>
  ) => Message;
};

export const createMessageService = (params: {
  messageRepository: MessageRepository;
  messagePublisher: MessagePublisher;
  dateService: DateService;
}): MessageService => {
  const {
    dateService = { now: () => Date.now() },
    messageRepository,
    messagePublisher,
  } = params;

  const creer = (params: CreateMessageParams): Message => {
    const message: Message = {
      ...params,
      etat: "Brouillon",
      dateCreation: dateService.now(),
    };
    messageRepository.persister(message);
    return message;
  };

  const valider = (id: number) => {
    const message: Message = {
      ...messageRepository.getById(id),
      etat: "Publier",
    };
    messageRepository.persister(message);
    messagePublisher.publier(message);
    return message;
  };

  return {
    creer,
    valider,
    modifier: (id, modifiedField) => {
      const message = messageRepository.getById(id);
      if (message.etat === "Brouillon") {
        console.log("persisted message", { ...message, ...modifiedField });
        messageRepository.persister({ ...message, ...modifiedField });
        return { ...message, ...modifiedField };
      }
      return message;
    },
  };
};
